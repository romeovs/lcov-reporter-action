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

export function diff(lcov, before, options) {
	if (!before) {
		return comment(lcov, options)
	}

	const pbefore = percentage(before)
	const pafter = percentage(lcov)
	const pdiff = pafter - pbefore
	const plus = pdiff > 0 ? "+" : ""
	const arrow = pdiff === 0 ? "" : pdiff < 0 ? "▾" : "▴"

	// 1. - Total coverage - Coverage of head branch
	// pafter

	// 2. - Diff coverage - Coverage of the diff. diff - files changed between base and head branch

	// 3. - Diff Threshold - Minimum coverage the diff needs to have
	// diff_threshold { action input }

	// 4. - Coverage Change - Difference between total coverage of base branch and head branch
	//  pbefore - pafter

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
			table(
				tbody(
					// tr(th("Diff Coverage"), th(pdiffLcov.toFixed(2), "%")),
					tr(
						th("Threshold"),
						th(options.diffCoverageThreshold.toFixed(2), "%"),
					),
					tr(th("Total Coverage"), th(pafter.toFixed(2), "%")),
					tr(
						th("Coverage Change"),
						th(arrow, " ", plus, pdiff.toFixed(2), "%"),
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
				tabulate(lcov, options),
			),
		),
		pdiff,
	}
}
