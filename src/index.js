import { GitHub, context } from "@actions/github"

import core from "@actions/core"
import { promises as fs } from "fs"
import path from "path"
import { diff } from "./comment"
import { deleteOldComments } from "./delete_old_comments"
import { getChangedFiles } from "./get_changes"
import { parse } from "./lcov"
import { normalisePath } from "./util"

const MAX_COMMENT_CHARS = 65536

async function main() {
	const token = core.getInput("github-token")
	const githubClient = new GitHub(token)
	const workingDir = core.getInput("working-directory") || "./"
	const lcovFile = path.join(
		workingDir,
		core.getInput("lcov-file") || "./coverage/lcov.info",
	)
	const baseFile = core.getInput("lcov-base")
	const shouldFilterChangedFiles =
		core.getInput("filter-changed-files").toLowerCase() === "true"
	const shouldDeleteOldComments =
		core.getInput("delete-old-comments").toLowerCase() === "true"
	const title = core.getInput("title")

	const shouldFailOnCoverageDecrease =
		core.getInput("fail-on-coverage-decrease").toLowerCase() === "true"

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
		prefix: normalisePath(`${process.env.GITHUB_WORKSPACE}/`),
		workingDir,
	}

	if (
		context.eventName === "pull_request" ||
		context.eventName === "pull_request_target"
	) {
		options.commit = context.payload.pull_request.head.sha
		options.baseCommit = context.payload.pull_request.base.sha
		options.head = context.payload.pull_request.head.ref
		options.base = context.payload.pull_request.base.ref
	} else if (context.eventName === "push") {
		options.commit = context.payload.after
		options.baseCommit = context.payload.before
		options.head = context.ref
	}

	options.shouldFilterChangedFiles = shouldFilterChangedFiles
	options.title = title

	if (shouldFilterChangedFiles) {
		options.changedFiles = await getChangedFiles(githubClient, options, context)
	}

	const lcov = await parse(raw)
	const baselcov = baseRaw && (await parse(baseRaw))

	if (baselcov) {
		const { body, coverageDiff } = diff(lcov, baselcov, options).substring(
			0,
			MAX_COMMENT_CHARS,
		)

		if (shouldDeleteOldComments) {
			await deleteOldComments(githubClient, options, context)
		}

		if (context.eventName === "pull_request") {
			await githubClient.issues.createComment({
				repo: context.repo.repo,
				owner: context.repo.owner,
				issue_number: context.payload.pull_request.number,
				body: body,
			})
		} else if (context.eventName === "push") {
			await githubClient.repos.createCommitComment({
				repo: context.repo.repo,
				owner: context.repo.owner,
				commit_sha: options.commit,
				body: body,
			})
		}
		console.log(`shouldFailOnCoverageDecrease`, shouldFailOnCoverageDecrease)
		console.log(`coverageDiff`, coverageDiff)

		if (
			context.eventName === "pull_request" ||
			context.eventName === "pull_request_target"
		) {
			await githubClient.issues.createComment({
				repo: context.repo.repo,
				owner: context.repo.owner,
				issue_number: context.payload.pull_request.number,
				body: comment,
			})
		} else if (context.eventName === "push") {
			await githubClient.repos.createCommitComment({
				repo: context.repo.repo,
				owner: context.repo.owner,
				commit_sha: options.commit,
				body: comment,
			})
		}
		console.log(`shouldFailOnCoverageDecrease`, shouldFailOnCoverageDecrease)
		console.log(`coverageDiff`, coverageDiff)

		console.log(
			"Coverage Diff Action completed.",
			shouldFailOnCoverageDecrease && coverageDiff < 0,
		)

		if (shouldFailOnCoverageDecrease && coverageDiff < 0) {
			core.setFailed(`Coverage decreased by ${-coverageDiff.toFixed(2)}%`)
		}
	} else {
		console.warn("No base coverage found, skipping diff")
	}
}

main().catch(function(err) {
	console.log(err)
	core.setFailed(err.message)
})
