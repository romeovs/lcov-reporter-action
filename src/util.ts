import { LcovFile } from 'lcov-parse'
import path from 'path'
import { IOptions } from './IOptions'

export function normalisePath(file: string) {
	return file.replace(/\\/g, "/")
}

export function createHref(options: IOptions, file: LcovFile) {
	const relative = file.file.replace(options.prefix, "")
	const parts = relative.split("/")
	const filename = parts[parts.length - 1]
	const url = path.join(options.repository, 'blob', options.commit, options.workingDir || './', relative)
	return {
		href: `https://github.com/${url}`,
		filename
	};
}