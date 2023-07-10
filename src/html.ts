function tag(name: string) {
	return function(...children: (string | number | { [key: string]: string | number})[]) {
		const firstChild = children[0];
		const props =
			typeof firstChild === "object"
				? Object.keys(firstChild)
						.map(key => ` ${key}='${firstChild[key]}'`)
						.join("")
				: ""

		const c = typeof firstChild === "string" ? children : children.slice(1)

		return `<${name}${props}>${c.join("")}</${name}>`
	}
}

export const details = tag("details")
export const summary = tag("summary")
export const tr = tag("tr")
export const td = tag("td")
export const th = tag("th")
export const b = tag("b")
export const table = tag("table")
export const tbody = tag("tbody")
export const a = tag("a")
export const span = tag("span")
export const h2 = tag("h2")

export const fragment = function(...children: string[]) {
	return children.join("")
}
