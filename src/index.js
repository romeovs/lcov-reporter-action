import { promises as fs } from "fs"
import core from "@actions/core"
import { GitHub, context } from "@actions/github"

import { parse } from "./lcov"
import { diff } from "./comment"

const MAX_COMMENT_SIZE = 65536
const COVERAGE_HEADER = ":loop: "

async function main() {
	const token = core.getInput("github-token")
	const lcovFile = core.getInput("lcov-file") || "./coverage/lcov.info"
	const baseFile = core.getInput("lcov-base")
	const hideUncoveredLines = !!core.getInput("hide-uncovered-lines")

	const raw = await fs.readFile(lcovFile, "utf-8").catch(err => null)
	if (!raw) {
		console.log(`No coverage report found at '${lcovFile}', exiting...`)
		return
	}

	const baseRaw =
		baseFile && (await fs.readFile(baseFile, "utf-8").catch(err => null))
	if (baseFile && !baseRaw) {
		console.log(`No coverage report found at '${baseFile}', ignoring...`)
	}

	const options = {
		repository: context.payload.repository.full_name,
		prefix: `${process.env.GITHUB_WORKSPACE}/`,
		hideUncoveredLines: hideUncoveredLines,
	}

	if (context.eventName === "pull_request") {
		options.commit = context.payload.pull_request.head.sha
		options.head = context.payload.pull_request.head.ref
		options.base = context.payload.pull_request.base.ref
	} else if (context.eventName === "push") {
		options.commit = context.payload.after
		options.head = context.ref
	}

	const lcov = await parse(raw)
	const baselcov = baseRaw && (await parse(baseRaw))
	const coverageHeader = `${context.workflow}: ${COVERAGE_HEADER}`
	let diffHtml = coverageHeader + diff(lcov, baselcov, options)

	const body =
		diffHtml.length > MAX_COMMENT_SIZE
			? COVERAGE_HEADER + `See action details for coverage`
			: diffHtml

	const ghClient = new GitHub(token)

	if (context.eventName === "pull_request") {
		await deletePreviousComments(ghClient, coverageHeader)
		await ghClient.issues.createComment({
			repo: context.repo.repo,
			owner: context.repo.owner,
			issue_number: context.payload.pull_request.number,
			body: body,
		})
	} else if (context.eventName === "push") {
		await ghClient.repos.createCommitComment({
			repo: context.repo.repo,
			owner: context.repo.owner,
			commit_sha: options.commit,
			body: body,
		})
	}
}

async function deletePreviousComments(ghClient, whatToLookFor) {
	const { data } = await ghClient.issues.listComments({
		...context.repo,
		per_page: 100,
		issue_number: context.payload.pull_request.number,
	})
	return Promise.all(
		data
			.filter(
				c =>
					c.user.login === "github-actions[bot]" &&
					c.body.startsWith(whatToLookFor),
			)
			.map(c =>
				ghClient.issues.deleteComment({ ...context.repo, comment_id: c.id }),
			),
	)
}

main().catch(function(err) {
	console.log(err)
	core.setFailed(err.message)
})
