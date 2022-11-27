import path from 'path'

export function normalisePath(file) {
	return file.replace(/\\/g, "/")
}

export function createHref(options, file) {
	const relative = file.file.replace(options.prefix, "")
	const parts = relative.split("/")
	const filename = parts[parts.length - 1]
	const url = path.join(options.repository, 'blob', options.commit, options.workingDir || './', relative)
	return {
		href: `https://github.com/${url}`,
		filename
	};
}