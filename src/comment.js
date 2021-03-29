import { details, summary, b, fragment, table, tbody, tr, th } from "./html"
import { tabulate, percField, diffField } from "./tabulate"
import { combinedReport } from "./report"

export function diff(lcov, before, options) {
	options.withDiff = !!before
	const report = combinedReport(lcov, before)

	const data = [
		options.base
			? `Coverage after merging ${b(options.head)} into ${b(options.base)}`
			: `Coverage for this commit`,
		table(
			tbody(
				tr(
					th(percField(report.total.lines, options)),
					before && th(diffField(report.total.lines, options)),
				),
			),
		),
	]

	if (report.files.length === 0) {
		data.push(`No difference in coverage of files`)
		return fragment(...data)
	}

	data.push(
		"\n\n",
		details(summary("Coverage Report"), tabulate(report, options)),
	)

	return fragment(...data)
}
