import { diff } from "./comment"

test("diff with no changes", async function() {
	const lcov = [
		{
			lines: {
				found: 13,
				hit: 0,
				details: [
					{
						line: 9,
						hit: 0,
					},
					{
						line: 10,
						hit: 0,
					},
					{
						line: 11,
						hit: 0,
					},
					{
						line: 13,
						hit: 0,
					},
					{
						line: 14,
						hit: 0,
					},
					{
						line: 17,
						hit: 0,
					},
					{
						line: 18,
						hit: 0,
					},
					{
						line: 19,
						hit: 0,
					},
					{
						line: 22,
						hit: 0,
					},
					{
						line: 33,
						hit: 0,
					},
					{
						line: 36,
						hit: 0,
					},
					{
						line: 37,
						hit: 0,
					},
					{
						line: 38,
						hit: 0,
					},
				],
			},
			functions: {
				hit: 0,
				found: 2,
				details: [
					{
						name: "main",
						line: 8,
						hit: 0,
					},
					{
						name: "(anonymous_1)",
						line: 36,
						hit: 0,
					},
				],
			},
			branches: {
				hit: 0,
				found: 2,
				details: [
					{
						line: 17,
						block: 0,
						branch: 0,
						taken: 0,
					},
					{
						line: 17,
						block: 0,
						branch: 1,
						taken: 0,
					},
				],
			},
			title: "",
			file: "src/cli.js",
		},
		{
			lines: {
				found: 8,
				hit: 0,
				details: [
					{
						line: 6,
						hit: 0,
					},
					{
						line: 7,
						hit: 0,
					},
					{
						line: 9,
						hit: 0,
					},
					{
						line: 23,
						hit: 0,
					},
					{
						line: 24,
						hit: 0,
					},
					{
						line: 25,
						hit: 0,
					},
					{
						line: 28,
						hit: 0,
					},
					{
						line: 33,
						hit: 0,
					},
				],
			},
			functions: {
				hit: 0,
				found: 1,
				details: [
					{
						name: "diff",
						line: 5,
						hit: 0,
					},
				],
			},
			branches: {
				hit: 0,
				found: 6,
				details: [
					{
						line: 10,
						block: 0,
						branch: 0,
						taken: 0,
					},
					{
						line: 10,
						block: 0,
						branch: 1,
						taken: 0,
					},
					{
						line: 17,
						block: 1,
						branch: 0,
						taken: 0,
					},
					{
						line: 17,
						block: 1,
						branch: 1,
						taken: 0,
					},
					{
						line: 23,
						block: 2,
						branch: 0,
						taken: 0,
					},
					{
						line: 23,
						block: 2,
						branch: 1,
						taken: 0,
					},
				],
			},
			title: "",
			file: "src/comment.js",
		},
		{
			lines: {
				found: 18,
				hit: 18,
				details: [
					{
						line: 2,
						hit: 22,
					},
					{
						line: 4,
						hit: 106,
					},
					{
						line: 6,
						hit: 13,
					},
					{
						line: 10,
						hit: 106,
					},
					{
						line: 12,
						hit: 106,
					},
					{
						line: 16,
						hit: 2,
					},
					{
						line: 17,
						hit: 2,
					},
					{
						line: 18,
						hit: 2,
					},
					{
						line: 19,
						hit: 2,
					},
					{
						line: 20,
						hit: 2,
					},
					{
						line: 21,
						hit: 2,
					},
					{
						line: 22,
						hit: 2,
					},
					{
						line: 23,
						hit: 2,
					},
					{
						line: 24,
						hit: 2,
					},
					{
						line: 25,
						hit: 2,
					},
					{
						line: 26,
						hit: 2,
					},
					{
						line: 28,
						hit: 2,
					},
					{
						line: 29,
						hit: 18,
					},
				],
			},
			functions: {
				hit: 4,
				found: 4,
				details: [
					{
						name: "tag",
						line: 1,
						hit: 22,
					},
					{
						name: "(anonymous_1)",
						line: 2,
						hit: 106,
					},
					{
						name: "(anonymous_2)",
						line: 6,
						hit: 13,
					},
					{
						name: "(anonymous_3)",
						line: 28,
						hit: 18,
					},
				],
			},
			branches: {
				hit: 4,
				found: 4,
				details: [
					{
						line: 4,
						block: 0,
						branch: 0,
						taken: 12,
					},
					{
						line: 4,
						block: 0,
						branch: 1,
						taken: 94,
					},
					{
						line: 10,
						block: 1,
						branch: 0,
						taken: 94,
					},
					{
						line: 10,
						block: 1,
						branch: 1,
						taken: 12,
					},
				],
			},
			title: "",
			file: "src/html.js",
		},
		{
			lines: {
				found: 42,
				hit: 0,
				details: [
					{
						line: 8,
						hit: 0,
					},
					{
						line: 9,
						hit: 0,
					},
					{
						line: 12,
						hit: 0,
					},
					{
						line: 13,
						hit: 0,
					},
					{
						line: 14,
						hit: 0,
					},
					{
						line: 15,
						hit: 0,
					},
					{
						line: 16,
						hit: 0,
					},
					{
						line: 17,
						hit: 0,
					},
					{
						line: 18,
						hit: 0,
					},
					{
						line: 20,
						hit: 0,
					},
					{
						line: 21,
						hit: 0,
					},
					{
						line: 22,
						hit: 0,
					},
					{
						line: 23,
						hit: 0,
					},
					{
						line: 27,
						hit: 0,
					},
					{
						line: 28,
						hit: 0,
					},
					{
						line: 29,
						hit: 0,
					},
					{
						line: 32,
						hit: 0,
					},
					{
						line: 41,
						hit: 0,
					},
					{
						line: 42,
						hit: 0,
					},
					{
						line: 43,
						hit: 0,
					},
					{
						line: 44,
						hit: 0,
					},
					{
						line: 45,
						hit: 0,
					},
					{
						line: 46,
						hit: 0,
					},
					{
						line: 47,
						hit: 0,
					},
					{
						line: 50,
						hit: 0,
					},
					{
						line: 51,
						hit: 0,
					},
					{
						line: 52,
						hit: 0,
					},
					{
						line: 53,
						hit: 0,
					},
					{
						line: 56,
						hit: 0,
					},
					{
						line: 60,
						hit: 0,
					},
					{
						line: 62,
						hit: 0,
					},
					{
						line: 63,
						hit: 0,
					},
					{
						line: 64,
						hit: 0,
					},
					{
						line: 70,
						hit: 0,
					},
					{
						line: 71,
						hit: 0,
					},
					{
						line: 81,
						hit: 0,
					},
					{
						line: 86,
						hit: 0,
					},
					{
						line: 90,
						hit: 0,
					},
					{
						line: 94,
						hit: 0,
					},
					{
						line: 99,
						hit: 0,
					},
					{
						line: 100,
						hit: 0,
					},
					{
						line: 101,
						hit: 0,
					},
				],
			},
			functions: {
				hit: 0,
				found: 7,
				details: [
					{
						name: "main",
						line: 11,
						hit: 0,
					},
					{
						name: "(anonymous_1)",
						line: 20,
						hit: 0,
					},
					{
						name: "(anonymous_2)",
						line: 27,
						hit: 0,
					},
					{
						name: "deletePreviousComments",
						line: 80,
						hit: 0,
					},
					{
						name: "(anonymous_4)",
						line: 89,
						hit: 0,
					},
					{
						name: "(anonymous_5)",
						line: 93,
						hit: 0,
					},
					{
						name: "(anonymous_6)",
						line: 99,
						hit: 0,
					},
				],
			},
			branches: {
				hit: 0,
				found: 24,
				details: [
					{
						line: 13,
						block: 0,
						branch: 0,
						taken: 0,
					},
					{
						line: 13,
						block: 0,
						branch: 1,
						taken: 0,
					},
					{
						line: 21,
						block: 1,
						branch: 0,
						taken: 0,
					},
					{
						line: 21,
						block: 1,
						branch: 1,
						taken: 0,
					},
					{
						line: 27,
						block: 2,
						branch: 0,
						taken: 0,
					},
					{
						line: 27,
						block: 2,
						branch: 1,
						taken: 0,
					},
					{
						line: 28,
						block: 3,
						branch: 0,
						taken: 0,
					},
					{
						line: 28,
						block: 3,
						branch: 1,
						taken: 0,
					},
					{
						line: 28,
						block: 4,
						branch: 0,
						taken: 0,
					},
					{
						line: 28,
						block: 4,
						branch: 1,
						taken: 0,
					},
					{
						line: 41,
						block: 5,
						branch: 0,
						taken: 0,
					},
					{
						line: 41,
						block: 5,
						branch: 1,
						taken: 0,
					},
					{
						line: 45,
						block: 6,
						branch: 0,
						taken: 0,
					},
					{
						line: 45,
						block: 6,
						branch: 1,
						taken: 0,
					},
					{
						line: 51,
						block: 7,
						branch: 0,
						taken: 0,
					},
					{
						line: 51,
						block: 7,
						branch: 1,
						taken: 0,
					},
					{
						line: 56,
						block: 8,
						branch: 0,
						taken: 0,
					},
					{
						line: 56,
						block: 8,
						branch: 1,
						taken: 0,
					},
					{
						line: 62,
						block: 9,
						branch: 0,
						taken: 0,
					},
					{
						line: 62,
						block: 9,
						branch: 1,
						taken: 0,
					},
					{
						line: 70,
						block: 10,
						branch: 0,
						taken: 0,
					},
					{
						line: 70,
						block: 10,
						branch: 1,
						taken: 0,
					},
					{
						line: 90,
						block: 11,
						branch: 0,
						taken: 0,
					},
					{
						line: 90,
						block: 11,
						branch: 1,
						taken: 0,
					},
				],
			},
			title: "",
			file: "src/index.js",
		},
		{
			lines: {
				found: 6,
				hit: 0,
				details: [
					{
						line: 5,
						hit: 0,
					},
					{
						line: 6,
						hit: 0,
					},
					{
						line: 7,
						hit: 0,
					},
					{
						line: 8,
						hit: 0,
					},
					{
						line: 9,
						hit: 0,
					},
					{
						line: 11,
						hit: 0,
					},
				],
			},
			functions: {
				hit: 0,
				found: 3,
				details: [
					{
						name: "parse",
						line: 4,
						hit: 0,
					},
					{
						name: "(anonymous_1)",
						line: 5,
						hit: 0,
					},
					{
						name: "(anonymous_2)",
						line: 6,
						hit: 0,
					},
				],
			},
			branches: {
				hit: 0,
				found: 2,
				details: [
					{
						line: 7,
						block: 0,
						branch: 0,
						taken: 0,
					},
					{
						line: 7,
						block: 0,
						branch: 1,
						taken: 0,
					},
				],
			},
			title: "",
			file: "src/lcov.js",
		},
		{
			lines: {
				found: 72,
				hit: 71,
				details: [
					{
						line: 4,
						hit: 2,
					},
					{
						line: 10,
						hit: 2,
					},
					{
						line: 11,
						hit: 56,
					},
					{
						line: 12,
						hit: 56,
					},
					{
						line: 13,
						hit: 56,
					},
					{
						line: 15,
						hit: 2,
					},
					{
						line: 16,
						hit: 14,
					},
					{
						line: 17,
						hit: 14,
					},
					{
						line: 18,
						hit: 14,
					},
					{
						line: 19,
						hit: 14,
					},
					{
						line: 20,
						hit: 14,
					},
					{
						line: 23,
						hit: 2,
					},
					{
						line: 24,
						hit: 8,
					},
					{
						line: 26,
						hit: 2,
					},
					{
						line: 30,
						hit: 1,
					},
					{
						line: 31,
						hit: 1,
					},
					{
						line: 33,
						hit: 1,
					},
					{
						line: 34,
						hit: 1,
					},
					{
						line: 36,
						hit: 1,
					},
					{
						line: 37,
						hit: 1,
					},
					{
						line: 39,
						hit: 1,
					},
					{
						line: 40,
						hit: 8,
					},
					{
						line: 41,
						hit: 8,
					},
					{
						line: 44,
						hit: 8,
					},
					{
						line: 45,
						hit: 4,
					},
					{
						line: 48,
						hit: 8,
					},
					{
						line: 51,
						hit: 1,
					},
					{
						line: 56,
						hit: 1,
					},
					{
						line: 57,
						hit: 1,
					},
					{
						line: 67,
						hit: 1,
					},
					{
						line: 79,
						hit: 64,
					},
					{
						line: 83,
						hit: 64,
					},
					{
						line: 90,
						hit: 2,
					},
					{
						line: 91,
						hit: 14,
					},
					{
						line: 92,
						hit: 14,
					},
					{
						line: 93,
						hit: 56,
					},
					{
						line: 97,
						hit: 14,
					},
					{
						line: 113,
						hit: 2,
					},
					{
						line: 116,
						hit: 2,
					},
					{
						line: 117,
						hit: 14,
					},
					{
						line: 128,
						hit: 14,
					},
					{
						line: 135,
						hit: 14,
					},
					{
						line: 137,
						hit: 14,
					},
					{
						line: 139,
						hit: 42,
					},
					{
						line: 140,
						hit: 0,
					},
					{
						line: 143,
						hit: 42,
					},
					{
						line: 153,
						hit: 14,
					},
					{
						line: 154,
						hit: 238,
					},
					{
						line: 155,
						hit: 170,
					},
					{
						line: 157,
						hit: 14,
					},
					{
						line: 158,
						hit: 411,
					},
					{
						line: 159,
						hit: 221,
					},
					{
						line: 161,
						hit: 14,
					},
					{
						line: 165,
						hit: 14,
					},
					{
						line: 167,
						hit: 14,
					},
					{
						line: 168,
						hit: 126,
					},
					{
						line: 170,
						hit: 14,
					},
					{
						line: 171,
						hit: 14,
					},
					{
						line: 172,
						hit: 941,
					},
					{
						line: 174,
						hit: 391,
					},
					{
						line: 175,
						hit: 10,
					},
					{
						line: 176,
						hit: 10,
					},
					{
						line: 179,
						hit: 381,
					},
					{
						line: 180,
						hit: 140,
					},
					{
						line: 183,
						hit: 241,
					},
					{
						line: 184,
						hit: 125,
					},
					{
						line: 185,
						hit: 125,
					},
					{
						line: 188,
						hit: 116,
					},
					{
						line: 189,
						hit: 116,
					},
					{
						line: 192,
						hit: 14,
					},
					{
						line: 193,
						hit: 10,
					},
					{
						line: 196,
						hit: 14,
					},
				],
			},
			functions: {
				hit: 25,
				found: 25,
				details: [
					{
						name: "computeTotal",
						line: 3,
						hit: 2,
					},
					{
						name: "(anonymous_1)",
						line: 10,
						hit: 56,
					},
					{
						name: "combinedReport",
						line: 29,
						hit: 1,
					},
					{
						name: "(anonymous_3)",
						line: 39,
						hit: 8,
					},
					{
						name: "(anonymous_4)",
						line: 55,
						hit: 1,
					},
					{
						name: "round",
						line: 78,
						hit: 64,
					},
					{
						name: "percentage",
						line: 82,
						hit: 64,
					},
					{
						name: "generateReport",
						line: 89,
						hit: 2,
					},
					{
						name: "(anonymous_8)",
						line: 90,
						hit: 14,
					},
					{
						name: "(anonymous_9)",
						line: 92,
						hit: 56,
					},
					{
						name: "toObject",
						line: 115,
						hit: 2,
					},
					{
						name: "(anonymous_11)",
						line: 117,
						hit: 14,
					},
					{
						name: "removeDetails",
						line: 127,
						hit: 2,
					},
					{
						name: "(anonymous_13)",
						line: 128,
						hit: 14,
					},
					{
						name: "getStatement",
						line: 134,
						hit: 14,
					},
					{
						name: "(anonymous_15)",
						line: 138,
						hit: 42,
					},
					{
						name: "uncovered",
						line: 152,
						hit: 14,
					},
					{
						name: "(anonymous_17)",
						line: 154,
						hit: 238,
					},
					{
						name: "(anonymous_18)",
						line: 155,
						hit: 170,
					},
					{
						name: "(anonymous_19)",
						line: 158,
						hit: 411,
					},
					{
						name: "(anonymous_20)",
						line: 159,
						hit: 221,
					},
					{
						name: "ranges",
						line: 164,
						hit: 14,
					},
					{
						name: "(anonymous_22)",
						line: 167,
						hit: 126,
					},
					{
						name: "(anonymous_23)",
						line: 172,
						hit: 941,
					},
					{
						name: "(anonymous_24)",
						line: 173,
						hit: 391,
					},
				],
			},
			branches: {
				hit: 32,
				found: 39,
				details: [
					{
						line: 11,
						block: 0,
						branch: 0,
						taken: 0,
					},
					{
						line: 11,
						block: 0,
						branch: 1,
						taken: 56,
					},
					{
						line: 33,
						block: 1,
						branch: 0,
						taken: 1,
					},
					{
						line: 33,
						block: 1,
						branch: 1,
						taken: 1,
					},
					{
						line: 34,
						block: 2,
						branch: 0,
						taken: 1,
					},
					{
						line: 34,
						block: 2,
						branch: 1,
						taken: 1,
					},
					{
						line: 37,
						block: 3,
						branch: 0,
						taken: 1,
					},
					{
						line: 37,
						block: 3,
						branch: 1,
						taken: 1,
					},
					{
						line: 40,
						block: 4,
						branch: 0,
						taken: 8,
					},
					{
						line: 40,
						block: 4,
						branch: 1,
						taken: 8,
					},
					{
						line: 44,
						block: 5,
						branch: 0,
						taken: 4,
					},
					{
						line: 44,
						block: 5,
						branch: 1,
						taken: 4,
					},
					{
						line: 53,
						block: 6,
						branch: 0,
						taken: 1,
					},
					{
						line: 53,
						block: 6,
						branch: 1,
						taken: 1,
					},
					{
						line: 53,
						block: 6,
						branch: 2,
						taken: 0,
					},
					{
						line: 56,
						block: 7,
						branch: 0,
						taken: 1,
					},
					{
						line: 56,
						block: 7,
						branch: 1,
						taken: 1,
					},
					{
						line: 83,
						block: 8,
						branch: 0,
						taken: 64,
					},
					{
						line: 83,
						block: 8,
						branch: 1,
						taken: 0,
					},
					{
						line: 84,
						block: 9,
						branch: 0,
						taken: 0,
					},
					{
						line: 84,
						block: 9,
						branch: 1,
						taken: 64,
					},
					{
						line: 93,
						block: 10,
						branch: 0,
						taken: 56,
					},
					{
						line: 93,
						block: 10,
						branch: 1,
						taken: 56,
					},
					{
						line: 139,
						block: 11,
						branch: 0,
						taken: 0,
					},
					{
						line: 139,
						block: 11,
						branch: 1,
						taken: 42,
					},
					{
						line: 153,
						block: 12,
						branch: 0,
						taken: 14,
					},
					{
						line: 153,
						block: 12,
						branch: 1,
						taken: 0,
					},
					{
						line: 157,
						block: 13,
						branch: 0,
						taken: 14,
					},
					{
						line: 157,
						block: 13,
						branch: 1,
						taken: 0,
					},
					{
						line: 168,
						block: 14,
						branch: 0,
						taken: 58,
					},
					{
						line: 168,
						block: 14,
						branch: 1,
						taken: 68,
					},
					{
						line: 174,
						block: 15,
						branch: 0,
						taken: 10,
					},
					{
						line: 174,
						block: 15,
						branch: 1,
						taken: 381,
					},
					{
						line: 179,
						block: 16,
						branch: 0,
						taken: 140,
					},
					{
						line: 179,
						block: 16,
						branch: 1,
						taken: 241,
					},
					{
						line: 183,
						block: 17,
						branch: 0,
						taken: 125,
					},
					{
						line: 183,
						block: 17,
						branch: 1,
						taken: 116,
					},
					{
						line: 192,
						block: 18,
						branch: 0,
						taken: 10,
					},
					{
						line: 192,
						block: 18,
						branch: 1,
						taken: 4,
					},
				],
			},
			title: "",
			file: "src/report.js",
		},
		{
			lines: {
				found: 49,
				hit: 36,
				details: [
					{
						line: 5,
						hit: 1,
					},
					{
						line: 6,
						hit: 1,
					},
					{
						line: 8,
						hit: 1,
					},
					{
						line: 16,
						hit: 1,
					},
					{
						line: 17,
						hit: 0,
					},
					{
						line: 19,
						hit: 1,
					},
					{
						line: 21,
						hit: 1,
					},
					{
						line: 22,
						hit: 1,
					},
					{
						line: 23,
						hit: 3,
					},
					{
						line: 24,
						hit: 3,
					},
					{
						line: 25,
						hit: 3,
					},
					{
						line: 26,
						hit: 3,
					},
					{
						line: 29,
						hit: 1,
					},
					{
						line: 32,
						hit: 3,
					},
					{
						line: 35,
						hit: 3,
					},
					{
						line: 40,
						hit: 1,
					},
					{
						line: 44,
						hit: 3,
					},
					{
						line: 45,
						hit: 1,
					},
					{
						line: 48,
						hit: 2,
					},
					{
						line: 52,
						hit: 0,
					},
					{
						line: 53,
						hit: 0,
					},
					{
						line: 54,
						hit: 0,
					},
					{
						line: 56,
						hit: 0,
					},
					{
						line: 57,
						hit: 0,
					},
					{
						line: 60,
						hit: 0,
					},
					{
						line: 61,
						hit: 0,
					},
					{
						line: 63,
						hit: 0,
					},
					{
						line: 67,
						hit: 9,
					},
					{
						line: 71,
						hit: 12,
					},
					{
						line: 72,
						hit: 12,
					},
					{
						line: 73,
						hit: 12,
					},
					{
						line: 74,
						hit: 12,
					},
					{
						line: 75,
						hit: 12,
					},
					{
						line: 77,
						hit: 0,
					},
					{
						line: 81,
						hit: 12,
					},
					{
						line: 83,
						hit: 12,
					},
					{
						line: 84,
						hit: 0,
					},
					{
						line: 87,
						hit: 12,
					},
					{
						line: 91,
						hit: 3,
					},
					{
						line: 98,
						hit: 3,
					},
					{
						line: 99,
						hit: 0,
					},
					{
						line: 103,
						hit: 0,
					},
					{
						line: 111,
						hit: 3,
					},
					{
						line: 115,
						hit: 3,
					},
					{
						line: 116,
						hit: 3,
					},
					{
						line: 117,
						hit: 3,
					},
					{
						line: 118,
						hit: 3,
					},
					{
						line: 119,
						hit: 3,
					},
					{
						line: 120,
						hit: 3,
					},
				],
			},
			functions: {
				hit: 10,
				found: 12,
				details: [
					{
						name: "tabulate",
						line: 4,
						hit: 1,
					},
					{
						name: "(anonymous_1)",
						line: 32,
						hit: 3,
					},
					{
						name: "(anonymous_2)",
						line: 35,
						hit: 3,
					},
					{
						name: "toFolder",
						line: 43,
						hit: 3,
					},
					{
						name: "diffField",
						line: 51,
						hit: 0,
					},
					{
						name: "formatFloat",
						line: 66,
						hit: 9,
					},
					{
						name: "percField",
						line: 70,
						hit: 12,
					},
					{
						name: "(anonymous_7)",
						line: 73,
						hit: 12,
					},
					{
						name: "addField",
						line: 80,
						hit: 12,
					},
					{
						name: "toRow",
						line: 90,
						hit: 3,
					},
					{
						name: "(anonymous_10)",
						line: 102,
						hit: 0,
					},
					{
						name: "filename",
						line: 114,
						hit: 3,
					},
				],
			},
			branches: {
				hit: 15,
				found: 43,
				details: [
					{
						line: 5,
						block: 0,
						branch: 0,
						taken: 0,
					},
					{
						line: 5,
						block: 0,
						branch: 1,
						taken: 1,
					},
					{
						line: 16,
						block: 1,
						branch: 0,
						taken: 0,
					},
					{
						line: 16,
						block: 1,
						branch: 1,
						taken: 1,
					},
					{
						line: 25,
						block: 2,
						branch: 0,
						taken: 3,
					},
					{
						line: 25,
						block: 2,
						branch: 1,
						taken: 3,
					},
					{
						line: 44,
						block: 3,
						branch: 0,
						taken: 1,
					},
					{
						line: 44,
						block: 3,
						branch: 1,
						taken: 2,
					},
					{
						line: 52,
						block: 4,
						branch: 0,
						taken: 0,
					},
					{
						line: 52,
						block: 4,
						branch: 1,
						taken: 0,
					},
					{
						line: 53,
						block: 5,
						branch: 0,
						taken: 0,
					},
					{
						line: 53,
						block: 5,
						branch: 1,
						taken: 0,
					},
					{
						line: 56,
						block: 6,
						branch: 0,
						taken: 0,
					},
					{
						line: 56,
						block: 6,
						branch: 1,
						taken: 0,
					},
					{
						line: 56,
						block: 7,
						branch: 0,
						taken: 0,
					},
					{
						line: 56,
						block: 7,
						branch: 1,
						taken: 0,
					},
					{
						line: 60,
						block: 8,
						branch: 0,
						taken: 0,
					},
					{
						line: 60,
						block: 8,
						branch: 1,
						taken: 0,
					},
					{
						line: 61,
						block: 9,
						branch: 0,
						taken: 0,
					},
					{
						line: 61,
						block: 9,
						branch: 1,
						taken: 0,
					},
					{
						line: 61,
						block: 10,
						branch: 0,
						taken: 0,
					},
					{
						line: 61,
						block: 10,
						branch: 1,
						taken: 0,
					},
					{
						line: 61,
						block: 11,
						branch: 0,
						taken: 0,
					},
					{
						line: 61,
						block: 11,
						branch: 1,
						taken: 0,
					},
					{
						line: 73,
						block: 12,
						branch: 0,
						taken: 9,
					},
					{
						line: 73,
						block: 12,
						branch: 1,
						taken: 3,
					},
					{
						line: 74,
						block: 13,
						branch: 0,
						taken: 12,
					},
					{
						line: 74,
						block: 13,
						branch: 1,
						taken: 0,
					},
					{
						line: 74,
						block: 14,
						branch: 0,
						taken: 12,
					},
					{
						line: 74,
						block: 14,
						branch: 1,
						taken: 0,
					},
					{
						line: 74,
						block: 14,
						branch: 2,
						taken: 0,
					},
					{
						line: 83,
						block: 15,
						branch: 0,
						taken: 0,
					},
					{
						line: 83,
						block: 15,
						branch: 1,
						taken: 12,
					},
					{
						line: 83,
						block: 16,
						branch: 0,
						taken: 12,
					},
					{
						line: 83,
						block: 16,
						branch: 1,
						taken: 0,
					},
					{
						line: 98,
						block: 17,
						branch: 0,
						taken: 0,
					},
					{
						line: 98,
						block: 17,
						branch: 1,
						taken: 3,
					},
					{
						line: 103,
						block: 18,
						branch: 0,
						taken: 0,
					},
					{
						line: 103,
						block: 18,
						branch: 1,
						taken: 0,
					},
					{
						line: 103,
						block: 19,
						branch: 0,
						taken: 0,
					},
					{
						line: 103,
						block: 19,
						branch: 1,
						taken: 0,
					},
					{
						line: 119,
						block: 20,
						branch: 0,
						taken: 2,
					},
					{
						line: 119,
						block: 20,
						branch: 1,
						taken: 1,
					},
				],
			},
			title: "",
			file: "src/tabulate.js",
		},
	]
	const options = {
		repository: "example/foo",
		commit: "2e15bee6fe0df5003389aa5ec894ec0fea2d874a",
		prefix: "/files/project/",
	}

	const htmlString = `Coverage for this commit<table><tbody><tr><th><b>60.10</b></th><th>(0)</th></tr></tbody></table>No difference in coverage of files`

	const result = diff(lcov, lcov, options)

	expect(result).toBe(htmlString)
})
