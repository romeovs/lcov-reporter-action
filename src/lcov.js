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
