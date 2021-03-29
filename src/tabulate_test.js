import { tabulate } from "./tabulate"
import { th, tr, td, table, tbody, a, b, del } from "./html"

test("tabulate should generate a correct table", function() {
	const data = {
		total: {
			stmts: {
				after: 78.57,
			},
			branches: {
				after: 100,
			},
			functions: {
				after: 66.67,
			},
			lines: {
				after: 78.79,
			},
		},
		files: [
			{
				file: "/files/project/index.js",
				stmts: {
					after: 100,
				},
				branches: {},
				functions: {
					after: 100,
				},
				lines: {},
				details: {
					stmts: {
						hit: 0,
						found: 0,
					},
					functions: {
						hit: 0,
						found: 0,
					},
					uncoveredLines: [],
				},
			},
			{
				file: "/files/project/src/foo.js",
				stmts: {
					after: 89.66,
				},
				branches: {
					after: 100,
				},
				functions: {
					after: 66.67,
				},
				lines: {
					after: 91.3,
				},
				details: {
					stmts: {
						hit: 26,
						found: 29,
					},
					branches: {
						hit: 3,
						found: 3,
					},
					functions: {
						hit: 2,
						found: 3,
					},
					lines: {
						hit: 21,
						found: 23,
					},
					uncoveredLines: [[37]],
				},
			},
			{
				file: "/files/project/src/bar/baz.js",
				stmts: {
					after: 53.85,
				},
				branches: {},
				functions: {
					after: 66.67,
				},
				lines: {
					after: 50,
				},
				details: {
					stmts: {
						hit: 7,
						found: 13,
					},
					functions: {
						hit: 2,
						found: 3,
					},
					lines: {
						hit: 5,
						found: 10,
					},
					uncoveredLines: [[20, 21], [27]],
				},
			},
		],
	}

	const options = {
		repository: "example/foo",
		commit: "2e15bee6fe0df5003389aa5ec894ec0fea2d874a",
		prefix: "/files/project/",
	}

	const html = table(
		tbody(
			tr(
				th("File"),
				th("% Stmts"),
				th("% Branches"),
				th("% Funcs"),
				th("% Lines"),
			),
			tr(
				td(
					a(
						{
							href: `https://github.com/${options.repository}/blob/${options.commit}/index.js`,
						},
						"index.js",
					),
				),
				td(b("100")),
				td(b("N/A")),
				td(b("100")),
				td(b("N/A")),
			),
			tr(td({ colspan: 6 }, b("src"))),
			tr(
				td(
					"&nbsp; &nbsp;",
					a(
						{
							href: `https://github.com/${options.repository}/blob/${options.commit}/src/foo.js`,
						},
						"foo.js",
					),
				),
				td(b("89.66")),
				td(b("100")),
				td(b("66.67")),
				td(b("91.30")),
			),
			tr(td({ colspan: 6 }, b("src/bar"))),
			tr(
				td(
					"&nbsp; &nbsp;",
					a(
						{
							href: `https://github.com/${options.repository}/blob/${options.commit}/src/bar/baz.js`,
						},
						"baz.js",
					),
				),
				td(b("53.85")),
				td(b("N/A")),
				td(b("66.67")),
				td(b("50")),
			),
		),
	)
	expect(tabulate(data, options)).toBe(html)
})

test("tabulate should generate a correct table with diff", async function() {
	const data = {
		total: {
			stmts: {
				after: 56.28,
				before: 26.13,
			},
			branches: {
				after: 42.5,
				before: 17.8,
			},
			functions: {
				after: 72.22,
				before: 31.48,
			},
			lines: {
				after: 60.1,
				before: 29.56,
			},
		},
		files: [
			{
				file: "src/lcov.js",
				stmts: {
					after: 0,
					before: 100,
				},
				branches: {
					after: 0,
					before: 100,
				},
				functions: {
					after: 0,
					before: 100,
				},
				lines: {
					after: 0,
					before: 100,
				},
				details: {
					stmts: {
						hit: 0,
						found: 11,
					},
					branches: {
						hit: 0,
						found: 2,
					},
					functions: {
						hit: 0,
						found: 3,
					},
					lines: {
						hit: 0,
						found: 6,
					},
					uncoveredLines: [[5, 9], [11]],
				},
			},
			{
				file: "src/report.js",
				stmts: {
					after: 94.12,
				},
				branches: {
					after: 82.05,
				},
				functions: {
					after: 100,
				},
				lines: {
					after: 98.61,
				},
				details: {
					stmts: {
						hit: 128,
						found: 136,
					},
					branches: {
						hit: 32,
						found: 39,
					},
					functions: {
						hit: 25,
						found: 25,
					},
					lines: {
						hit: 71,
						found: 72,
					},
					uncoveredLines: [[11], [53], [83, 84], [139, 140], [153], [157]],
				},
			},
		],
	}

	const options = {
		repository: "example/foo",
		commit: "2e15bee6fe0df5003389aa5ec894ec0fea2d874a",
		prefix: "/files/project/",
		showUncoveredLines: true,
		showColorEmoji: true,
		showOldValueForFiles: true,
		showIncreasePerFiles: true,
		withDiff: true,
	}
	const html = table(
		tbody(
			tr(
				th("File"),
				th("% Stmts"),
				th("% Branches"),
				th("% Funcs"),
				th("% Lines"),
				th("Uncovered Lines"),
			),
			tr(td({ colspan: 6 }, b("src"))),
			tr(
				td(
					"&nbsp; &nbsp;",
					a(
						{
							href: `https://github.com/${options.repository}/blob/${options.commit}/src/lcov.js`,
						},
						"lcov.js",
					),
				),
				td(del("100"), " ", b("0"), "(-100) 🔴"),
				td(del("100"), " ", b("0"), "(-100) 🔴"),
				td(del("100"), " ", b("0"), "(-100) 🔴"),
				td(del("100"), " ", b("0"), "(-100) 🔴"),
				td("5&ndash;9, 11"),
			),
			tr(
				td(
					"&nbsp; &nbsp;",
					a(
						{
							href: `https://github.com/${options.repository}/blob/${options.commit}/src/report.js`,
						},
						"report.js",
					),
				),
				td(del("N/A"), " ", b("94.12"), "(+94.12) 🟢"),
				td(del("N/A"), " ", b("82.05"), "(+82.05) 🟢"),
				td(del("N/A"), " ", b("100"), "(+100) 🟢"),
				td(del("N/A"), " ", b("98.61"), "(+98.61) 🟢"),
				td("11, 53, 83&ndash;84, 139&ndash;140, 153, 157"),
			),
		),
	)

	expect(tabulate(data, options)).toBe(html)
})
