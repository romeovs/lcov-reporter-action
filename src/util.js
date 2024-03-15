import path from 'path'

export function normalisePath(file) {
	return file.replace(/\\/g, "/")
}

export function createHref(options, file) {
	const relative = file.file.replace(options.prefix, "");
	const parts = relative.split("/");
	const filename = parts[parts.length - 1];
	const repository = options.repository || 'default_repository';
	const commit = options.commit || 'default_commit';
	const workingDir = options.workingDir || './';
	const url = path.join(repository, 'blob', commit, workingDir, relative);
	return {
			href: `https://github.com/${url}`,
			filename
	};
}
