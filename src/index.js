import { promises as fs } from "fs";
import core from "@actions/core";
import { getOctokit, context } from "@actions/github";

import { parse } from "./lcov";
import { diff } from "./comment";

async function main() {
	const token = core.getInput("github-token");
	const lcovFile = core.getInput("lcov-file") || "./coverage/lcov.info";
	const baseFile = core.getInput("lcov-base");
	const prNumber = core.getInput("pr-number");
	const hide_branch_coverage = core.getInput("hide-branch-coverage") == "true";
	const outputFile = core.getInput("output-file");

	const octokit = getOctokit(token);

	const raw = await fs.readFile(lcovFile, "utf-8").catch((err) => null);
	if (!raw) {
		console.log(`No coverage report found at '${lcovFile}', exiting...`);
		return;
	}

	const baseRaw =
		baseFile && (await fs.readFile(baseFile, "utf-8").catch((err) => null));
	if (baseFile && !baseRaw) {
		console.log(`No coverage report found at '${baseFile}', ignoring...`);
	}

	const { data } = await octokit.pulls.get({
		owner: context.repo.owner,
		repo: context.repo.repo,
		pull_number: prNumber,
	});

	const options = {
		repository: context.payload.repository.full_name,
		prefix: `${process.env.GITHUB_WORKSPACE}/`,
		commit: data.head.sha,
		head: data.head.ref,
		base: data.base.ref,
		hide_branch_coverage: hide_branch_coverage,
	};

	const lcov = await parse(raw);
	const baselcov = baseRaw && (await parse(baseRaw));
	const body = diff(lcov, baselcov, options);

	if (outputFile != null && outputFile != "") {
		await fs.writeFile(outputFile, body);
	} else {
		await new octokit.issues.createComment({
			repo: context.repo.repo,
			owner: context.repo.owner,
			issue_number: prNumber,
			body: body,
		});
	}
}

main().catch(function (err) {
	console.log(err);
	core.setFailed(err.message);
});
