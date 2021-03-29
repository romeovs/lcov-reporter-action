import { th, tr, td, table, tbody, a, b, del, fragment } from "./html"

// Tabulate the lcov data in a HTML table.
export function tabulate(report, options) {
	if (report.files.length === 0) return ``
	const combined = report.files

	const columns = [
		th("File"),
		th("% Stmts"),
		th("% Branches"),
		th("% Funcs"),
		th("% Lines"),
	]

	if (options.showUncoveredLines) {
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
				...folders[key].map(file => toRow(file, key !== "", options)),
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

export function diffField(item, { emptyOnZero, showColorEmoji }) {
	const after = item?.after ?? 0
	const before = item?.before ?? 0
	const pdiff = after - before

	if (emptyOnZero && pdiff === 0) {
		return ""
	}

	const plus = pdiff > 0 ? "+" : ""
	const arrow = !showColorEmoji || pdiff === 0 ? "" : pdiff < 0 ? " 🔴" : " 🟢"

	return fragment(`(${plus + formatFloat(pdiff)})`, arrow)
}

function formatFloat(val) {
	return val.toFixed(2).replace(/\.0*$/, "")
}

export function percField(item, { withDiff, showOldValueForFiles }) {
	const after = item?.after
	const before = item?.before
	const na = value => (value !== undefined ? formatFloat(value) : "N/A")
	if (!showOldValueForFiles || !withDiff || after == before) {
		return b(na(after))
	}
	return fragment(del(na(before)), " ", b(na(after)))
}

function addField(item, options) {
	const elements = [percField(item, options)]

	if (options.withDiff && options.showIncreasePerFiles) {
		elements.push(diffField(item, { ...options, emptyOnZero: true }))
	}

	return fragment(...elements)
}

function toRow(file, indent, options) {
	const columns = [
		td(filename(file, indent, options)),
		td(addField(file.stmts, options)),
		td(addField(file.branches, options)),
		td(addField(file.functions, options)),
		td(addField(file.lines, options)),
	]
	if (options.showUncoveredLines) {
		columns.push(
			td(
				file.details.uncoveredLines
					.map(([start, end]) =>
						start === end || end === undefined
							? start
							: `${start}&ndash;${end}`,
					)
					.join(", "),
			),
		)
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
