import * as core from "@actions/core"

const REQUESTED_COMMENTS_PER_PAGE = 20

export async function deleteOldComments(github, options, context, keepLast) {
	const existingComments = await getExistingComments(github, options, context)
	const commentToUpdate = keepLast ? existingComments.shift() : null;
	for (const comment of existingComments) {
		core.debug(`Deleting comment: ${comment.id}`)
		try {
			await github.issues.deleteComment({
				owner: context.repo.owner,
				repo: context.repo.repo,
				comment_id: comment.id,
			})
		} catch (error) {
			console.error(error)
		}
	}
	return commentToUpdate;
}

export async function getExistingComments(github, options, context) {
	let page = 0
	let results = []
	let response
	do {
		response = await github.issues.listComments({
			issue_number: context.issue.number,
			owner: context.repo.owner,
			repo: context.repo.repo,
			per_page: REQUESTED_COMMENTS_PER_PAGE,
			page: page,
			sort: "updated",
			direction: "desc"
		})
		results = results.concat(response.data)
		page++
	} while (response.data.length === REQUESTED_COMMENTS_PER_PAGE)

	return results.filter(
		comment =>
			!!comment.user &&
			(!options.title || comment.body.includes(options.title)) &&
			comment.body.includes("Coverage Report"),
	)
}
