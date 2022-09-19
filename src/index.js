import { promises as fs } from "fs"
import core from "@actions/core"
import { GitHub, context } from "@actions/github"

import { parse } from "./lcov"
import { diff } from "./comment"
import { getChangedFiles } from "./get_changes"
import { deleteOldComments } from "./delete_old_comments"
import { normalisePath } from "./util"
import { percentage } from "./lcov"

const MAX_COMMENT_CHARS = 65536

async function main() {
	const token = core.getInput("github-token")
	const githubClient = new GitHub(token)
	const lcovFile = core.getInput("lcov-file") || "./coverage/lcov.info"
	const baseFile = core.getInput("lcov-base")
	const shouldFilterChangedFiles =
		core.getInput("filter-changed-files").toLowerCase() === "true"
	const shouldDeleteOldComments =
		core.getInput("delete-old-comments").toLowerCase() === "true"
	const dontPostIfNoChangedFilesInReport =
		core.getInput("dont-post-if-no-changed-files-in-report").toLowerCase() ===
		"true"
	const title = core.getInput("title")
	const maxUncoveredLines = core.getInput("max-uncovered-lines")
	const failDropThreshold = core.getInput("fail-drop-percent-threshold")

	if (maxUncoveredLines && isNaN(parseInt(maxUncoveredLines))) {
		console.log(
			`Invalid parameter for max-uncovered-lines '${maxUncoveredLines}'. Must be an integer. Exiting...`,
		)
		return
	}
	if (failDropThreshold && isNaN(parseFloat(failDropThreshold))) {
		console.log(
			`Invalid parameter for fail-drop-threshold '${failDropThreshold}'. Must be a number. Exiting...`,
		)
		return
	}

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
	}

	if (context.eventName === "pull_request") {
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
	options.dontPostIfNoChangedFilesInReport = dontPostIfNoChangedFilesInReport
	options.title = title
	options.failDropThreshold = failDropThreshold
	if (maxUncoveredLines) {
		options.maxUncoveredLines = parseInt(maxUncoveredLines)
	}

	if (shouldFilterChangedFiles || dontPostIfNoChangedFilesInReport) {
		options.changedFiles = await getChangedFiles(githubClient, options, context)
	}

	const lcov = await parse(raw)
	const baselcov = baseRaw && (await parse(baseRaw))
	let body = diff(lcov, baselcov, options)
	if (!body) {
		console.log(`No changed files in report, exiting...`)
		return
	} else {
		body = body.substring(0, MAX_COMMENT_CHARS)
	}

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

	if (failDropThreshold) {
		if (!baselcov) {
			console.warn(
				"Cannot check coverage drop threshold with no base coverage file. Skipping this step.",
			)
		} else {
			const pbefore = percentage(baselcov)
			const pafter = percentage(lcov)
			const pdiff = pafter - pbefore
			if (pdiff < -failDropThreshold) {
				core.setFailed(
					`Coverage dropped more than ${failDropThreshold}%. Failing coverage check.`,
				)
			}
		}
	}
}

main().catch(function(err) {
	console.log(err)
	core.setFailed(err.message)
})
