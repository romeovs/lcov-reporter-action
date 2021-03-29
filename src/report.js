import { isEqual, differenceWith } from "lodash"

function computeTotal(report) {
	const overall = {
		stmts: { hit: 0, found: 0 },
		branches: { hit: 0, found: 0 },
		functions: { hit: 0, found: 0 },
		lines: { hit: 0, found: 0 },
	}
	const add = (from, to) => {
		if (!from) return
		to.hit += from.hit
		to.found += from.found
	}
	for (const file of report) {
		const { stmts, branches, functions, lines } = file.details
		add(stmts, overall.stmts)
		add(branches, overall.branches)
		add(functions, overall.functions)
		add(lines, overall.lines)
	}

	for (const k in overall) {
		overall[k] = percentage(overall[k])
	}
	return overall
}

export function combinedReport(lcov, before) {
	const currentSummary = generateReport(lcov)
	const currentTotal = computeTotal(currentSummary)

	const beforeSummary = before && generateReport(before)
	const beforeTotal = beforeSummary && computeTotal(beforeSummary)

	const currentMap = toObject(currentSummary)
	const beforeMap = beforeSummary && toObject(beforeSummary)

	const toDiffObj = (current, previous, prop) => {
		const before = previous && previous[prop]
		const stats = {
			after: current[prop],
		}
		if (before) {
			stats.before = before
		}

		return stats
	}

	const diff = differenceWith(
		removeDetails(currentSummary),
		(beforeSummary && removeDetails(beforeSummary)) || [],
		isEqual,
	).map(file => {
		const before = beforeMap && beforeMap[file.file]
		return {
			file: file.file,
			stmts: toDiffObj(file, before, "stmts"),
			branches: toDiffObj(file, before, "branches"),
			functions: toDiffObj(file, before, "functions"),
			lines: toDiffObj(file, before, "lines"),
			details: currentMap[file.file].details,
		}
	})

	return {
		total: {
			stmts: toDiffObj(currentTotal, beforeTotal, "stmts"),
			branches: toDiffObj(currentTotal, beforeTotal, "branches"),
			functions: toDiffObj(currentTotal, beforeTotal, "functions"),
			lines: toDiffObj(currentTotal, beforeTotal, "lines"),
		},
		files: diff,
	}
}

function round(val) {
	return parseFloat(val.toFixed(2))
}

function percentage(item) {
	return item
		? item.found === 0
			? 100
			: round((item.hit / item.found) * 100)
		: undefined
}
function generateReport(lcov) {
	const files = lcov.map(report => {
		const stmts = getStatement(report)
		const toDetails = item =>
			item && {
				hit: item.hit,
				found: item.found,
			}
		return {
			file: report.file,
			stmts: percentage(stmts),
			branches: percentage(report.branches),
			functions: percentage(report.functions),
			lines: percentage(report.lines),
			details: {
				stmts: toDetails(stmts),
				branches: toDetails(report.branches),
				functions: toDetails(report.functions),
				lines: toDetails(report.lines),
				uncoveredLines: uncovered(report),
			},
		}
	})

	return files
}
function toObject(report) {
	return report.reduce(
		(acc, key) => ({
			...acc,
			[key.file]: {
				...key,
			},
		}),
		{},
	)
}

function removeDetails(report) {
	return report.map(file => ({
		...file,
		details: undefined,
	}))
}

function getStatement(file) {
	const { branches, functions, lines } = file

	return [branches, functions, lines].reduce(
		function(acc, curr) {
			if (!curr) {
				return acc
			}

			return {
				hit: acc.hit + curr.hit,
				found: acc.found + curr.found,
			}
		},
		{ hit: 0, found: 0 },
	)
}

function uncovered(file, options) {
	const branches = (file.branches ? file.branches.details : [])
		.filter(branch => branch.taken === 0)
		.map(branch => branch.line)

	const lines = (file.lines ? file.lines.details : [])
		.filter(line => line.hit === 0)
		.map(line => line.line)

	return ranges([...branches, ...lines])
}

function ranges(linenos) {
	const res = []

	const asArr = range =>
		range.start === range.end ? [range.start] : [range.start, range.end]

	let last = null
	linenos
		.sort((a, b) => a - b)
		.forEach(function(lineno) {
			if (last === null) {
				last = { start: lineno, end: lineno }
				return
			}

			if (last.end === lineno) {
				return
			}

			if (last.end + 1 === lineno) {
				last.end = lineno
				return
			}

			res.push(asArr(last))
			last = { start: lineno, end: lineno }
		})

	if (last) {
		res.push(asArr(last))
	}

	return res
}
