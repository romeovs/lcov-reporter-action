import { getChangedFiles } from "./get_changes"
import * as core from "@actions/core"

jest.mock("@actions/core")

describe("getChangedFiles", () => {
	let mockGithubClient

	beforeEach(() => {
		mockGithubClient = {
			repos: {
				compareCommits: jest.fn(),
			},
		}
		core.setFailed = jest.fn()
	})

	it("should fail if commit or baseCommit is missing", async () => {
		const options = { workingDir: "./" }
		const context = {
			eventName: "push",
			repo: { owner: "owner", repo: "repo" },
		}

		mockGithubClient.repos.compareCommits.mockResolvedValue({
			status: 500,
			data: {
        files: [],
      },
		})

		await getChangedFiles(mockGithubClient, options, context)

		expect(core.setFailed).toHaveBeenCalledWith(
			"The base and head commits are missing from the payload for this push event.",
		)
	})

	it("should fail on non-200 response from GitHub API", async () => {
		const options = {
			commit: "headSha",
			baseCommit: "baseSha",
			workingDir: "./",
		}
		const context = {
			eventName: "push",
			repo: { owner: "owner", repo: "repo" },
		}

		mockGithubClient.repos.compareCommits.mockResolvedValue({
			status: 404,
			data: {
        files: [],
      },
		})

		await getChangedFiles(mockGithubClient, options, context)

		expect(core.setFailed).toHaveBeenCalledWith(
			"The GitHub API for comparing the base and head commits for this push event returned 404, expected 200.",
		)
	})

	it("should return a list of modified and added files", async () => {
		const options = {
			commit: "headSha",
			baseCommit: "baseSha",
			workingDir: "./src",
		}
		const context = {
			eventName: "push",
			repo: { owner: "owner", repo: "repo" },
		}

		mockGithubClient.repos.compareCommits.mockResolvedValue({
			status: 200,
			data: {
				files: [
					{ status: "modified", filename: "src/file1.js" },
					{ status: "added", filename: "src/file2.js" },
					{ status: "removed", filename: "src/file3.js" },
				],
			},
		})

		const result = await getChangedFiles(mockGithubClient, options, context)

		expect(result).toEqual(["file1.js", "file2.js"])
	})

	it("should correctly normalize working directory", async () => {
		const options = {
			commit: "headSha",
			baseCommit: "baseSha",
			workingDir: "./",
		}
		const context = {
			eventName: "push",
			repo: { owner: "owner", repo: "repo" },
		}

		mockGithubClient.repos.compareCommits.mockResolvedValue({
			status: 200,
			data: {
				files: [
					{ status: "modified", filename: "/file1.js" },
					{ status: "added", filename: "/file2.js" },
				],
			},
		})

		const result = await getChangedFiles(mockGithubClient, options, context)

		expect(result).toEqual(["file1.js", "file2.js"])
	})
})
