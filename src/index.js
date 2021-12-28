import { promises as fs } from "fs"
import core from "@actions/core"
import { GitHub, context } from "@actions/github"

import { parse } from "./lcov"
import { comment, diff } from "./comment"


async function main() {
	const token = core.getInput("github-token")
	const lcovFile = core.getInput("lcov-file") || "./coverage/lcov.info"
	const baseFile = core.getInput("lcov-base")
        const shouldUpdateExisting = core.getInput("overwrite-existing-comment")

	const raw = await fs.readFile(lcovFile, "utf-8").catch(err => null)
	if (!raw) {
		console.log(`No coverage report found at '${lcovFile}', exiting...`)
		return
	}

	const baseRaw = baseFile && await fs.readFile(baseFile, "utf-8").catch(err => null)
	if (baseFile && !baseRaw) {
		console.log(`No coverage report found at '${baseFile}', ignoring...`)
	}

	const options = {
		repository: context.payload.repository.full_name,
		prefix: `${process.env.GITHUB_WORKSPACE}/`,
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
	const baselcov = baseRaw && await parse(baseRaw)
	const body = diff(lcov, baselcov, options)

	if (context.eventName === "pull_request") {
		const { data: comments } = await new GitHub(token).issues.listComments({
			repo: context.repo.repo,
			owner: context.repo.owner,
			issue_number: context.payload.pull_request.number,
			per_page: 100
		});


		const previousComment = comments.filter(comment => {
			core.info('Found previous comment, updating instead of writing a new one');
			return comment.body.includes('Coverage Report')
		})[0];


		if (shouldUpdateExisting && previousComment) {
			await new GitHub(token).issues.updateComment({
				repo: context.repo.repo,
				owner: context.repo.owner,
				issue_number: context.payload.pull_request.number,
				comment_id: previousComment.id,
				body,
			});
		} else {
			await new GitHub(token).issues.createComment({
				repo: context.repo.repo,
				owner: context.repo.owner,
				issue_number: context.payload.pull_request.number,
				body,
			})
		}

	} else if (context.eventName === "push") {
		await new GitHub(token).repos.createCommitComment({
			repo: context.repo.repo,
			owner: context.repo.owner,
			commit_sha: options.commit,
			body: diff(lcov, baselcov, options),
		})
	}
}

main().catch(function(err) {
	console.log(err)
	core.setFailed(err.message)
})
