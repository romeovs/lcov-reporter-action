import {
	details,
	summary,
	b,
	fragment,
	table,
	tbody,
	tr,
	th,
	td,
	h2,
} from "./html"

import { percentage } from "./lcov"
import { tabulate } from "./tabulate"

export function comment(lcov, options) {
	const reportTable = tabulate(lcov, options)
	if (options.dontPostIfNoChangedFilesInReport && !reportTable) {
		return
	}
	return fragment(
		options.title ? h2(options.title) : "",
		options.base
			? `Coverage after merging ${b(options.head)} into ${b(
					options.base,
			  )} will be`
			: `Coverage for this commit`,
		table(tbody(tr(th(percentage(lcov).toFixed(2), "%")))),
		"\n\n",
		reportTable
			? details(
					summary(
						options.shouldFilterChangedFiles
							? "Coverage Report for Changed Files"
							: "Coverage Report",
					),
					reportTable,
			  )
			: "",
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

	const thresholdWarning =
		options.failDropThreshold && pdiff < -options.failDropThreshold
			? `Failing due to coverage dropping more than ${options.failDropThreshold}%!`
			: ""

	const reportTable = tabulate(lcov, options)
	if (options.dontPostIfNoChangedFilesInReport && !reportTable) {
		return
	}

	return fragment(
		options.title ? h2(options.title) : "",
		options.base
			? `Coverage after merging ${b(options.head)} into ${b(
					options.base,
			  )} will be`
			: `Coverage for this commit`,
		table(
			tbody(
				tr(th("Coverage"), th("Diff")),
				tr(
					td(pafter.toFixed(2), "%"),
					td(arrow, " ", plus, pdiff.toFixed(2), "%"),
				),
			),
		),
		thresholdWarning ? b(thresholdWarning) : "",
		"\n\n",
		reportTable
			? details(
					summary(
						options.shouldFilterChangedFiles
							? "Coverage Report for Changed Files"
							: "Coverage Report",
					),
					reportTable,
			  )
			: "",
	)
}
