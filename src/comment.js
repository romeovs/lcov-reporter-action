import {
	details,
	summary,
	b,
	fragment,
	table,
	tbody,
	tr,
	th,
	h2,
	span,
	h4,
	a,
	br,
} from "./html"

import { percentage } from "./lcov"
import { tabulate } from "./tabulate"

export function comment(lcov, options) {
	return fragment(
		options.title ? h2(options.title) : "",
		options.base
			? `Coverage after merging ${b(options.head)} into ${b(
					options.base,
			  )} will be`
			: `Coverage for this commit`,
		table(tbody(tr(th(percentage(lcov).toFixed(2), "%")))),
		"\n\n",
		details(
			summary(
				options.shouldFilterChangedFiles
					? "Coverage Report for Changed Files"
					: "Coverage Report",
			),
			tabulate(lcov, options),
		),
	)
}

export function diff(headLcov, baseLcov, diffLcov, options) {
	if (!baseLcov) {
		return comment(headLcov, options)
	}

	const pbaseLcov = percentage(baseLcov)
	const pheadLcov = percentage(headLcov)
	const pCoverageChange = pheadLcov - pbaseLcov
	const plus = pCoverageChange > 0 ? "+" : ""
	const arrow = pCoverageChange === 0 ? "" : pCoverageChange < 0 ? "▾" : "▴"
	const pdiffLcov = diffLcov ? percentage(diffLcov) : null
	const pdiffCoverageThresholdStr = `${options.diffCoverageThreshold.toFixed(
		2,
	)}%`
	let title = "Error generating lcov for files changed"
	if (diffLcov.length !== 0) {
		if (pdiffLcov > options.diffCoverageThreshold) {
			title = `✅ Branch coverage (${pdiffLcov.toFixed(
				2,
			)}%) meets coverage threshold (${pdiffCoverageThresholdStr})`
		}
		title = `❌ Branch coverage (${pdiffLcov.toFixed(
			2,
		)}%) does not meet coverage threshold (${pdiffCoverageThresholdStr})`
	}
	const coverage_dir_link = a(
		{
			href: `https://github.com/interviewstreet/frontend-core/actions/runs/${options.run_id}`,
		},
		"Coverage directory download page link (💡 Tip: Download coverage_dir_head from this link if comment is clipped)",
	)

	return {
		fragment: fragment(
			options.title ? h4(options.title) : h4(title),
			span(coverage_dir_link),
			br(),
			table(
				tbody(
					pdiffLcov
						? tr(
								th("Diff Coverage"),
								th(pdiffLcov.toFixed(2), "%"),
								th("Threshold "),
								th(pdiffCoverageThresholdStr),
						  )
						: "",
					tr(
						th("Total Coverage"),
						th(pheadLcov.toFixed(2), "% "),
						th("Coverage Change "),
						th(arrow, " ", plus, pCoverageChange.toFixed(2), "%"),
					),
				),
			),
			"\n\n",
			details(
				summary(
					options.shouldFilterChangedFiles
						? "Coverage Report for Changed Files"
						: "Coverage Report",
				),
				tabulate(headLcov, options),
			),
		),
		pdiffLcov: pdiffLcov.toFixed(2),
	}
}
