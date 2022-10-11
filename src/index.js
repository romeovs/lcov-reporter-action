import { promises as fs } from "fs"
import core from "@actions/core"
import { GitHub, context } from "@actions/github"
import path from "path"

import { parse } from "./lcov"
import { diff } from "./comment"
import { getChangedFiles } from "./get_changes"
import { deleteOldComments } from "./delete_old_comments"
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
	const diff_threshold = parseFloat(core.getInput("diff_threshold")) || 0
	const files_changed = core.getInput("files_changed")
	const run_id = parseInt(core.getInput("run_id"), 10) || 0

	const headRaw = await fs.readFile(lcovFile, "utf-8").catch(err => null)
	if (!headRaw) {
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
		shouldFilterChangedFiles,
		title,
		// Exists because API has paging which can be problematic for large PRs
		files_changed,
		diffCoverageThreshold: diff_threshold,
		run_id,
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

	if (shouldFilterChangedFiles) {
		options.changedFiles = await getChangedFiles(githubClient, options, context)
	}

	const headLcov = await parse(headRaw)
	const baseLcov = baseRaw && (await parse(baseRaw))

	// Extract diffLcov from headLcov
	let diffLcov = []
	if (files_changed) {
		diffLcov = headLcov.filter(lcov_json => {
			return files_changed.includes(lcov_json.file)
		})
	} else {
		console.log("No files changed from base branch. Skipping diff coverage")
	}
	console.log(diffLcov)

	// Get message text and percentage_diffLcov
	const message_pdiff = diff(headLcov, baseLcov, diffLcov, options)
	const body = message_pdiff.fragment.substring(0, MAX_COMMENT_CHARS)
	const pdiffLcov = message_pdiff.pdiffLcov
	const pdiffLcovStr = pdiffLcov ? `${pdiffLcov.toString()}%` : ""

	// Delete old comments
	if (shouldDeleteOldComments) {
		await deleteOldComments(githubClient, options, context)
	}

	// Comment on PR
	if (
		context.eventName === "pull_request" ||
		context.eventName === "pull_request_target"
	) {
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

	// Set outputs
	const result = pdiffLcov ? pdiffLcov < diff_threshold : null
	const resultStr = result.toString()
	core.setOutput("diff_coverage", pdiffLcov)
	core.setOutput("result", resultStr)

	// Action result

	// Pass if no files changed i.e. pdiffLcov = null
	if (result === null) {
		core.info(`✅ No files changed.`)
		return "100%"
	}
	// Fail if coverage less than threshold
	if (!result) {
		throw new Error(
			`Branch coverage (${pdiffLcovStr}) does not meet Coverage threshold (${options.diffCoverageThreshold.toFixed(
				2,
			)}%)`,
		)
		return pdiffLcovStr
	} else {
		core.info(
			`Branch coverage (${pdiffLcovStr}) meets Coverage threshold (${options.diffCoverageThreshold.toFixed(
				2,
			)}%)`,
		)
		return pdiffLcovStr
	}
}

main().catch(function(err) {
	console.log(err)
	core.setFailed(err.message)
})
