import lcov from "lcov-parse"

// Parse lcov string into lcov data
export function parse(data) {
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
export function percentage(lcov, options) {
	let hit = 0
	let found = 0
	for (const entry of lcov) {
		if (shouldBeIncluded(entry.file, options)) {
			hit += entry.lines.hit
			found += entry.lines.found
		}
	}

	return (hit / found) * 100
}

function shouldBeIncluded(fileName, options) {
	for (let i in options.excludedFiles) {
		if (fileName.startsWith(options.excludedFiles[i])) {
			return false
		}
	}
	return true
}
