import { promises as fs } from "fs"
import core from "@actions/core"
import { getOctokit, context } from "@actions/github"

import { parse } from "./lcov"
import { diff } from "./comment"

async function main() {
	const token = core.getInput("github-token")
	const lcovFile = core.getInput("lcov-file") || "./coverage/lcov.info"
	const baseFile = core.getInput("lcov-base")
	const pr_number = core.getInput("pr_number")

	const octokit = getOctokit(token)

	const raw = await fs.readFile(lcovFile, "utf-8").catch((err) => null)
	if (!raw) {
		console.log(`No coverage report found at '${lcovFile}', exiting...`)
		return
	}

	const baseRaw =
		baseFile && (await fs.readFile(baseFile, "utf-8").catch((err) => null))
	if (baseFile && !baseRaw) {
		console.log(`No coverage report found at '${baseFile}', ignoring...`)
	}

	const pull_request = await octokit.pulls.get({
		owner: context.repo.owner,
		repo: context.repo.repo,
		pull_number: pr_number,
	})

	const options = {
		repository: context.payload.repository.full_name,
		prefix: `${process.env.GITHUB_WORKSPACE}/`,
		commit: pull_request.head.sha,
		head: pull_request.head.ref,
		base: pull_request.base.ref,
	}

	const lcov = await parse(raw)
	const baselcov = baseRaw && (await parse(baseRaw))
	const body = diff(lcov, baselcov, options)

	await new octokit.issues.createComment({
		repo: context.repo.repo,
		owner: context.repo.owner,
		issue_number: pr_number,
		body: diff(lcov, baselcov, options),
	})
}

main().catch(function (err) {
	console.log(err)
	core.setFailed(err.message)
})
