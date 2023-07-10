import lcov, { LcovFile } from "lcov-parse"

// Parse lcov string into lcov data
export function parse(data: string): Promise<LcovFile[] | undefined> {
	return new Promise(function(resolve, reject) {
		lcov(data, function(err, res) {
			if (err) {
				reject(err)
				return
			}
			resolve(res)
		})
	})
}

// Get the total coverage percentage from the lcov data.
export function percentage(lcov: LcovFile[]) {
	let hit = 0
	let found = 0
	for (const entry of lcov) {
		hit += entry.lines.hit
		found += entry.lines.found
	}

	return (hit / found) * 100
}
