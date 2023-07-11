import { LcovBranch, LcovFile, LcovLine, LcovPart } from "lcov-parse"
import { IOptions } from "./IOptions"
import { th, tr, td, table, tbody, a, b, span, fragment } from "./html"
import { createHref, normalisePath } from "./util"

// Tabulate the lcov data in a HTML table.
export function tabulate(lcov: LcovFile[], options: IOptions) {
	const head = tr(
		th("File"),
		th("Stmts"),
		th("Branches"),
		th("Funcs"),
		th("Lines"),
		th("Uncovered Lines"),
	)

	const folders: {[key: string]: LcovFile[]} = {}
	for (const file of filterAndNormaliseLcov(lcov, options)) {
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
				toFolder(key),
				...folders[key].map(file => toRow(file, key !== "", options)),
			],
			[] as string[],
		)
	if (rows.length === 0) {
		return ""
	}
	return table(tbody(head, ...rows))
}

function filterAndNormaliseLcov(lcov: LcovFile[], options: IOptions): LcovFile[] {
	return lcov
		.map(file => ({
			...file,
			file: normalisePath(file.file),
		}))
		.filter(file => shouldBeIncluded(file.file, options))
}

function shouldBeIncluded(fileName: string, options: IOptions) {
	if (!options.shouldFilterChangedFiles) {
		return true
	}
	return options.changedFiles.includes(fileName.replace(options.prefix, ""))
}

function toFolder(path: string) {
	if (path === "") {
		return ""
	}

	return tr(td({ colspan: 6 }, b(path)))
}

function getStatement(file: LcovFile): LcovPart<LcovBranch | LcovLine> {
	const { branches, functions, lines } = file

	return [branches, functions, lines].reduce(
		function (acc, curr) {
			if (!curr) {
				return acc
			}

			return {
				hit: acc.hit + curr.hit,
				found: acc.found + curr.found,
				details: [...acc.details, ...curr.details]
			}
		},
		{ hit: 0, found: 0 , details: [] as (LcovBranch | LcovLine)[] },
	)
}

function toRow(file: LcovFile, indent: boolean, options: IOptions) {
	return tr(
		td(filename(file, indent, options)),
		td(percentage(getStatement(file))),
		td(percentage(file.branches)),
		td(percentage(file.functions)),
		td(percentage(file.lines)),
		td(uncovered(file, options)),
	)
}

function filename(file: LcovFile, indent: boolean, options: IOptions) {
	const {href, filename} = createHref(options, file);
	const space = indent ? "&nbsp; &nbsp;" : ""
	return fragment(space, a({ href }, filename))
}

function percentage<T>(item: LcovPart<T>) {
	if (!item) {
		return "N/A"
	}

	const value = item.found === 0 ? 100 : (item.hit / item.found) * 100
	const rounded = value.toFixed(2).replace(/\.0*$/, "")

	const tag = value === 100 ? fragment : b

	return tag(`${rounded}%`)
}

function uncovered(file: LcovFile, options: IOptions) {
	const branches = (file.branches ? file.branches.details : [])
		.filter(branch => branch.taken === 0)
		.map(branch => branch.line)

	const lines = (file.lines ? file.lines.details : [])
		.filter(line => line.hit === 0)
		.map(line => line.line)

	const all = ranges([...branches, ...lines])

	var numNotIncluded = 0
	if (options.maxUncoveredLines) {
		const notIncluded = all.splice(options.maxUncoveredLines)
		numNotIncluded = notIncluded.length
	}

	const result = all
		.map(function(range) {
			const fragment =
				range.start === range.end
					? `L${range.start}`
					: `L${range.start}-L${range.end}`
			const { href } = createHref(options, file)
			const text =
				range.start === range.end
					? range.start
					: `${range.start}&ndash;${range.end}`

			return a({ href: `${href}#${fragment}` }, text)
		})
		.join(", ")

	if (numNotIncluded > 0) {
		return result + ` and ${numNotIncluded} more...`
	} else {
		return result
	}
}

interface Range { start: number; end: number; };

function ranges(linenos: number[]) {
	const res: Range[] = []

	let last: Range | null = null

	linenos.sort().forEach(function (lineno) {
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
