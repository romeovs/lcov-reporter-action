import { th, tr, td, table, tbody, a, b, del, fragment } from "./html"
import { isEqual, differenceWith } from "lodash"

function combinedReport(lcov, before) {
	const removeDetails = report =>
		report.map(file => ({
			...file,
			lines: {
				...file.lines,
				details: undefined,
			},
			functions: {
				...file.functions,
				details: undefined,
			},
			branches: {
				...file.branches,
				details: undefined,
			},
		}))
	lcov = removeDetails(lcov)
	let base
	if (before) {
		before = removeDetails(before)
		const toObject = report =>
			report.reduce(
				(acc, key) => ({
					...acc,
					[key.file]: {
						...key,
					},
				}),
				{},
			)
		base = toObject(before)
	}

	const combined = differenceWith(lcov, before || {}, isEqual).map(file => ({
		file: file.file,
		before: !!base
			? {
					...base[file.file],
			  }
			: undefined,
		after: {
			...file,
		},
	}))
	return combined
}

// Tabulate the lcov data in a HTML table.
export function tabulate(lcov, before, options) {
	const combined = combinedReport(lcov, before)
	if (combined.length === 0) return ``

	const columns = [
		th("File"),
		th("Stmts"),
		th("Branches"),
		th("Funcs"),
		th("Lines"),
	]

	if (!options.hideUncoveredLines) {
		columns.push(th("Uncovered Lines"))
	}
	const head = tr(...columns)

	const folders = {}
	for (const file of combined) {
		const parts = file.file.replace(options.prefix, "").split("/")
		const folder = parts.slice(0, -1).join("/")
		folders[folder] = folders[folder] || []
		folders[folder].push(file)
	}

	const rows = Object.keys(folders)
		.sort()
		.reduce(
			(acc, key) => [
				...acc,
				toFolder(key, options),
				...folders[key].map(file =>
					toRow(file, key !== "", { ...options, noDiff: !before }),
				),
			],
			[],
		)

	return table(tbody(head, ...rows))
}

function toFolder(path) {
	if (path === "") {
		return ""
	}

	return tr(td({ colspan: 6 }, b(path)))
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

function toRow(file, indent, options) {
	const columns = [
		td(filename(file, indent, options)),
		td(
			percentage(
				getStatement(file.after),
				file.before && getStatement(file.before),
				options,
			),
		),
		td(
			percentage(
				file.after.branches,
				file.before && file.before.branches,
				options,
			),
		),
		td(
			percentage(
				file.after.functions,
				file.before && file.before.functions,
				options,
			),
		),
		td(percentage(file.after.lines, file.before && file.before.lines, options)),
	]
	if (!options.hideUncoveredLines) {
		columns.push(td(uncovered(file, options)))
	}

	return tr(...columns)
}

function filename(file, indent, options) {
	const relative = file.file.replace(options.prefix, "")
	const href = `https://github.com/${options.repository}/blob/${options.commit}/${relative}`
	const parts = relative.split("/")
	const last = parts[parts.length - 1]
	const space = indent ? "&nbsp; &nbsp;" : ""
	return fragment(space, a({ href }, last))
}

// function percentage(item) {
// 	if (!item) {
// 		return "N/A"
// 	}

// 	const value = item.found === 0 ? 100 : (item.hit / item.found) * 100
// 	const rounded = value.toFixed(2).replace(/\.0*$/, "")

// 	const tag = value === 100 ? fragment : b

// 	return tag(`${rounded}%`)
// }

function percentage(item, beforeItem, options) {
	const noDiff = options.noDiff
	const round = val => val.toFixed(2).replace(/\.0*$/, "")

	const value = !item
		? "N/A"
		: item.found === 0
		? `100%`
		: `${round((item.hit / item.found) * 100)}%`
	const beforeValue = !beforeItem
		? "N/A"
		: beforeItem.found === 0
		? `100%`
		: `${round((beforeItem.hit / beforeItem.found) * 100)}%`

	if (noDiff) {
		return b(value)
	}

	return fragment(del(beforeValue), " ", b(value))
}

function uncovered(file, options) {
	const branches = (file.branches ? file.branches.details : [])
		.filter(branch => branch.taken === 0)
		.map(branch => branch.line)

	const lines = (file.lines ? file.lines.details : [])
		.filter(line => line.hit === 0)
		.map(line => line.line)

	const all = ranges([...branches, ...lines])

	return all
		.map(function(range) {
			const text =
				range.start === range.end
					? range.start
					: `${range.start}&ndash;${range.end}`
			// Adding the link to each file line range makes the html too big for a github comment;
			// So we return just the text instead
			return text
			// const fragment =
			// 	range.start === range.end
			// 		? `L${range.start}`
			// 		: `L${range.start}-L${range.end}`
			// const relative = file.file.replace(options.prefix, "")
			// const href = `https://github.com/${options.repository}/blob/${options.commit}/${relative}#${fragment}`

			// return a({ href }, text)
		})
		.join(", ")
}

function ranges(linenos) {
	const res = []

	let last = null

	linenos.sort().forEach(function(lineno) {
		if (last === null) {
			last = { start: lineno, end: lineno }
			return
		}

		if (last.end + 1 === lineno) {
			last.end = lineno
			return
		}

		res.push(last)
		last = { start: lineno, end: lineno }
	})

	if (last) {
		res.push(last)
	}

	return res
}
