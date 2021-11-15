import * as core from "@actions/core"

// Get list of changed files
export async function getChangedFiles(githubClient, options, context) {
	if (!options.commit || !options.baseCommit) {
		core.setFailed(
			`The base and head commits are missing from the payload for this ${context.eventName} event.`,
		)
	}

	// Use GitHub's compare two commits API.
	// https://developer.github.com/v3/repos/commits/#compare-two-commits
	const response = await githubClient.repos.compareCommits({
		base: options.baseCommit,
		head: options.commit,
		owner: context.repo.owner,
		repo: context.repo.repo,
	})

	if (response.status !== 200) {
		core.setFailed(
			`The GitHub API for comparing the base and head commits for this ${context.eventName} event returned ${response.status}, expected 200.`,
		)
	}

	return response.data.files
		.filter(file => file.status == "modified" || file.status == "added")
		.map(file => file.filename)
}
