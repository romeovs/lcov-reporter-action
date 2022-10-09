import { details, summary, b, fragment, table, tbody, tr, th, h2 } from "./html"

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

	// 1. - Total coverage - Coverage of head branch
	// pheadLcov

	// 2. - Diff coverage - Coverage of the diff. diff - files changed between base and head branch
	// pdiffLcov

	// 3. - Diff Threshold - Minimum coverage the diff needs to have
	// diff_threshold { action input }

	// 4. - Coverage Change - Difference between total coverage of base branch and head branch
	//  pCoverageChange

	// Output format

	// Diff Coverage | Threshold
	// Total Coverage | Coverage Change

	return {
		fragment: fragment(
			options.title ? h2(options.title) : "",
			options.base
				? `Coverage after merging ${b(options.head)} into ${b(
						options.base,
				  )} will be`
				: `Coverage for this commit`,
			// Link to download if message exceeds charcs
			table(
				tbody(
					pdiffLcov
						? tr(th("Diff Coverage"), th(pdiffLcov.toFixed(2), "%"))
						: "",
					tr(
						th("Threshold"),
						th(options.diffCoverageThreshold.toFixed(2), "%"),
					),
					tr(th("Total Coverage"), th(pheadLcov.toFixed(2), "%")),
					tr(
						th("Coverage Change"),
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
		pdiffLcov,
	}
}
