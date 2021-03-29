import { isEqual, differenceWith } from "lodash"
import { parse } from "./lcov"
import { combinedReport } from "./report"
import { readFileSync, writeFileSync } from "fs"

test("combinedReport should generate a correct report", async function() {
	const beforeData = [
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
				hit: 6,
				details: [
					{
						line: 5,
						hit: 2,
					},
					{
						line: 6,
						hit: 2,
					},
					{
						line: 7,
						hit: 2,
					},
					{
						line: 8,
						hit: 1,
					},
					{
						line: 9,
						hit: 1,
					},
					{
						line: 11,
						hit: 1,
					},
				],
			},
			functions: {
				hit: 3,
				found: 3,
				details: [
					{
						name: "parse",
						line: 4,
						hit: 2,
					},
					{
						name: "(anonymous_1)",
						line: 5,
						hit: 2,
					},
					{
						name: "(anonymous_2)",
						line: 6,
						hit: 2,
					},
				],
			},
			branches: {
				hit: 2,
				found: 2,
				details: [
					{
						line: 7,
						block: 0,
						branch: 0,
						taken: 1,
					},
					{
						line: 7,
						block: 0,
						branch: 1,
						taken: 1,
					},
				],
			},
			title: "",
			file: "src/lcov.js",
		},
		{
			lines: {
				found: 67,
				hit: 0,
				details: [
					{
						line: 4,
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
						line: 12,
						hit: 0,
					},
					{
						line: 13,
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
						line: 19,
						hit: 0,
					},
					{
						line: 20,
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
						line: 26,
						hit: 0,
					},
					{
						line: 30,
						hit: 0,
					},
					{
						line: 31,
						hit: 0,
					},
					{
						line: 33,
						hit: 0,
					},
					{
						line: 34,
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
						line: 39,
						hit: 0,
					},
					{
						line: 44,
						hit: 0,
					},
					{
						line: 49,
						hit: 0,
					},
					{
						line: 50,
						hit: 0,
					},
					{
						line: 60,
						hit: 0,
					},
					{
						line: 72,
						hit: 0,
					},
					{
						line: 75,
						hit: 0,
					},
					{
						line: 82,
						hit: 0,
					},
					{
						line: 83,
						hit: 0,
					},
					{
						line: 84,
						hit: 0,
					},
					{
						line: 85,
						hit: 0,
					},
					{
						line: 89,
						hit: 0,
					},
					{
						line: 105,
						hit: 0,
					},
					{
						line: 108,
						hit: 0,
					},
					{
						line: 109,
						hit: 0,
					},
					{
						line: 120,
						hit: 0,
					},
					{
						line: 127,
						hit: 0,
					},
					{
						line: 129,
						hit: 0,
					},
					{
						line: 131,
						hit: 0,
					},
					{
						line: 132,
						hit: 0,
					},
					{
						line: 135,
						hit: 0,
					},
					{
						line: 145,
						hit: 0,
					},
					{
						line: 146,
						hit: 0,
					},
					{
						line: 147,
						hit: 0,
					},
					{
						line: 149,
						hit: 0,
					},
					{
						line: 150,
						hit: 0,
					},
					{
						line: 151,
						hit: 0,
					},
					{
						line: 153,
						hit: 0,
					},
					{
						line: 157,
						hit: 0,
					},
					{
						line: 159,
						hit: 0,
					},
					{
						line: 160,
						hit: 0,
					},
					{
						line: 162,
						hit: 0,
					},
					{
						line: 163,
						hit: 0,
					},
					{
						line: 164,
						hit: 0,
					},
					{
						line: 166,
						hit: 0,
					},
					{
						line: 167,
						hit: 0,
					},
					{
						line: 168,
						hit: 0,
					},
					{
						line: 171,
						hit: 0,
					},
					{
						line: 172,
						hit: 0,
					},
					{
						line: 175,
						hit: 0,
					},
					{
						line: 176,
						hit: 0,
					},
					{
						line: 177,
						hit: 0,
					},
					{
						line: 180,
						hit: 0,
					},
					{
						line: 181,
						hit: 0,
					},
					{
						line: 184,
						hit: 0,
					},
					{
						line: 185,
						hit: 0,
					},
					{
						line: 188,
						hit: 0,
					},
				],
			},
			functions: {
				hit: 0,
				found: 25,
				details: [
					{
						name: "computeTotal",
						line: 3,
						hit: 0,
					},
					{
						name: "(anonymous_1)",
						line: 10,
						hit: 0,
					},
					{
						name: "combinedReport",
						line: 29,
						hit: 0,
					},
					{
						name: "(anonymous_3)",
						line: 39,
						hit: 0,
					},
					{
						name: "(anonymous_4)",
						line: 48,
						hit: 0,
					},
					{
						name: "round",
						line: 71,
						hit: 0,
					},
					{
						name: "percentage",
						line: 74,
						hit: 0,
					},
					{
						name: "generateReport",
						line: 81,
						hit: 0,
					},
					{
						name: "(anonymous_8)",
						line: 82,
						hit: 0,
					},
					{
						name: "(anonymous_9)",
						line: 84,
						hit: 0,
					},
					{
						name: "toObject",
						line: 107,
						hit: 0,
					},
					{
						name: "(anonymous_11)",
						line: 109,
						hit: 0,
					},
					{
						name: "removeDetails",
						line: 119,
						hit: 0,
					},
					{
						name: "(anonymous_13)",
						line: 120,
						hit: 0,
					},
					{
						name: "getStatement",
						line: 126,
						hit: 0,
					},
					{
						name: "(anonymous_15)",
						line: 130,
						hit: 0,
					},
					{
						name: "uncovered",
						line: 144,
						hit: 0,
					},
					{
						name: "(anonymous_17)",
						line: 146,
						hit: 0,
					},
					{
						name: "(anonymous_18)",
						line: 147,
						hit: 0,
					},
					{
						name: "(anonymous_19)",
						line: 150,
						hit: 0,
					},
					{
						name: "(anonymous_20)",
						line: 151,
						hit: 0,
					},
					{
						name: "ranges",
						line: 156,
						hit: 0,
					},
					{
						name: "(anonymous_22)",
						line: 159,
						hit: 0,
					},
					{
						name: "(anonymous_23)",
						line: 164,
						hit: 0,
					},
					{
						name: "(anonymous_24)",
						line: 165,
						hit: 0,
					},
				],
			},
			branches: {
				hit: 0,
				found: 37,
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
						taken: 0,
					},
					{
						line: 33,
						block: 1,
						branch: 0,
						taken: 0,
					},
					{
						line: 33,
						block: 1,
						branch: 1,
						taken: 0,
					},
					{
						line: 34,
						block: 2,
						branch: 0,
						taken: 0,
					},
					{
						line: 34,
						block: 2,
						branch: 1,
						taken: 0,
					},
					{
						line: 37,
						block: 3,
						branch: 0,
						taken: 0,
					},
					{
						line: 37,
						block: 3,
						branch: 1,
						taken: 0,
					},
					{
						line: 41,
						block: 4,
						branch: 0,
						taken: 0,
					},
					{
						line: 41,
						block: 4,
						branch: 1,
						taken: 0,
					},
					{
						line: 46,
						block: 5,
						branch: 0,
						taken: 0,
					},
					{
						line: 46,
						block: 5,
						branch: 1,
						taken: 0,
					},
					{
						line: 46,
						block: 5,
						branch: 2,
						taken: 0,
					},
					{
						line: 49,
						block: 6,
						branch: 0,
						taken: 0,
					},
					{
						line: 49,
						block: 6,
						branch: 1,
						taken: 0,
					},
					{
						line: 75,
						block: 7,
						branch: 0,
						taken: 0,
					},
					{
						line: 75,
						block: 7,
						branch: 1,
						taken: 0,
					},
					{
						line: 76,
						block: 8,
						branch: 0,
						taken: 0,
					},
					{
						line: 76,
						block: 8,
						branch: 1,
						taken: 0,
					},
					{
						line: 85,
						block: 9,
						branch: 0,
						taken: 0,
					},
					{
						line: 85,
						block: 9,
						branch: 1,
						taken: 0,
					},
					{
						line: 131,
						block: 10,
						branch: 0,
						taken: 0,
					},
					{
						line: 131,
						block: 10,
						branch: 1,
						taken: 0,
					},
					{
						line: 145,
						block: 11,
						branch: 0,
						taken: 0,
					},
					{
						line: 145,
						block: 11,
						branch: 1,
						taken: 0,
					},
					{
						line: 149,
						block: 12,
						branch: 0,
						taken: 0,
					},
					{
						line: 149,
						block: 12,
						branch: 1,
						taken: 0,
					},
					{
						line: 160,
						block: 13,
						branch: 0,
						taken: 0,
					},
					{
						line: 160,
						block: 13,
						branch: 1,
						taken: 0,
					},
					{
						line: 166,
						block: 14,
						branch: 0,
						taken: 0,
					},
					{
						line: 166,
						block: 14,
						branch: 1,
						taken: 0,
					},
					{
						line: 171,
						block: 15,
						branch: 0,
						taken: 0,
					},
					{
						line: 171,
						block: 15,
						branch: 1,
						taken: 0,
					},
					{
						line: 175,
						block: 16,
						branch: 0,
						taken: 0,
					},
					{
						line: 175,
						block: 16,
						branch: 1,
						taken: 0,
					},
					{
						line: 184,
						block: 17,
						branch: 0,
						taken: 0,
					},
					{
						line: 184,
						block: 17,
						branch: 1,
						taken: 0,
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

	const afterData = [
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
				hit: 6,
				details: [
					{
						line: 5,
						hit: 2,
					},
					{
						line: 6,
						hit: 2,
					},
					{
						line: 7,
						hit: 2,
					},
					{
						line: 8,
						hit: 1,
					},
					{
						line: 9,
						hit: 1,
					},
					{
						line: 11,
						hit: 1,
					},
				],
			},
			functions: {
				hit: 3,
				found: 3,
				details: [
					{
						name: "parse",
						line: 4,
						hit: 2,
					},
					{
						name: "(anonymous_1)",
						line: 5,
						hit: 2,
					},
					{
						name: "(anonymous_2)",
						line: 6,
						hit: 2,
					},
				],
			},
			branches: {
				hit: 2,
				found: 2,
				details: [
					{
						line: 7,
						block: 0,
						branch: 0,
						taken: 1,
					},
					{
						line: 7,
						block: 0,
						branch: 1,
						taken: 1,
					},
				],
			},
			title: "",
			file: "src/lcov.js",
		},
		{
			lines: {
				found: 72,
				hit: 70,
				details: [
					{
						line: 4,
						hit: 1,
					},
					{
						line: 10,
						hit: 1,
					},
					{
						line: 11,
						hit: 28,
					},
					{
						line: 12,
						hit: 28,
					},
					{
						line: 13,
						hit: 28,
					},
					{
						line: 15,
						hit: 1,
					},
					{
						line: 16,
						hit: 7,
					},
					{
						line: 17,
						hit: 7,
					},
					{
						line: 18,
						hit: 7,
					},
					{
						line: 19,
						hit: 7,
					},
					{
						line: 20,
						hit: 7,
					},
					{
						line: 23,
						hit: 1,
					},
					{
						line: 24,
						hit: 4,
					},
					{
						line: 26,
						hit: 1,
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
						hit: 32,
					},
					{
						line: 41,
						hit: 32,
					},
					{
						line: 44,
						hit: 32,
					},
					{
						line: 45,
						hit: 0,
					},
					{
						line: 48,
						hit: 32,
					},
					{
						line: 51,
						hit: 1,
					},
					{
						line: 56,
						hit: 7,
					},
					{
						line: 57,
						hit: 7,
					},
					{
						line: 67,
						hit: 1,
					},
					{
						line: 79,
						hit: 32,
					},
					{
						line: 83,
						hit: 32,
					},
					{
						line: 90,
						hit: 1,
					},
					{
						line: 91,
						hit: 7,
					},
					{
						line: 92,
						hit: 7,
					},
					{
						line: 93,
						hit: 28,
					},
					{
						line: 97,
						hit: 7,
					},
					{
						line: 113,
						hit: 1,
					},
					{
						line: 116,
						hit: 1,
					},
					{
						line: 117,
						hit: 7,
					},
					{
						line: 128,
						hit: 7,
					},
					{
						line: 135,
						hit: 7,
					},
					{
						line: 137,
						hit: 7,
					},
					{
						line: 139,
						hit: 21,
					},
					{
						line: 140,
						hit: 0,
					},
					{
						line: 143,
						hit: 21,
					},
					{
						line: 153,
						hit: 7,
					},
					{
						line: 154,
						hit: 118,
					},
					{
						line: 155,
						hit: 97,
					},
					{
						line: 157,
						hit: 7,
					},
					{
						line: 158,
						hit: 203,
					},
					{
						line: 159,
						hit: 143,
					},
					{
						line: 161,
						hit: 7,
					},
					{
						line: 165,
						hit: 7,
					},
					{
						line: 167,
						hit: 7,
					},
					{
						line: 168,
						hit: 76,
					},
					{
						line: 170,
						hit: 7,
					},
					{
						line: 171,
						hit: 7,
					},
					{
						line: 172,
						hit: 595,
					},
					{
						line: 174,
						hit: 240,
					},
					{
						line: 175,
						hit: 5,
					},
					{
						line: 176,
						hit: 5,
					},
					{
						line: 179,
						hit: 235,
					},
					{
						line: 180,
						hit: 87,
					},
					{
						line: 183,
						hit: 148,
					},
					{
						line: 184,
						hit: 77,
					},
					{
						line: 185,
						hit: 77,
					},
					{
						line: 188,
						hit: 71,
					},
					{
						line: 189,
						hit: 71,
					},
					{
						line: 192,
						hit: 7,
					},
					{
						line: 193,
						hit: 5,
					},
					{
						line: 196,
						hit: 7,
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
						hit: 1,
					},
					{
						name: "(anonymous_1)",
						line: 10,
						hit: 28,
					},
					{
						name: "combinedReport",
						line: 29,
						hit: 1,
					},
					{
						name: "(anonymous_3)",
						line: 39,
						hit: 32,
					},
					{
						name: "(anonymous_4)",
						line: 55,
						hit: 7,
					},
					{
						name: "round",
						line: 78,
						hit: 32,
					},
					{
						name: "percentage",
						line: 82,
						hit: 32,
					},
					{
						name: "generateReport",
						line: 89,
						hit: 1,
					},
					{
						name: "(anonymous_8)",
						line: 90,
						hit: 7,
					},
					{
						name: "(anonymous_9)",
						line: 92,
						hit: 28,
					},
					{
						name: "toObject",
						line: 115,
						hit: 1,
					},
					{
						name: "(anonymous_11)",
						line: 117,
						hit: 7,
					},
					{
						name: "removeDetails",
						line: 127,
						hit: 1,
					},
					{
						name: "(anonymous_13)",
						line: 128,
						hit: 7,
					},
					{
						name: "getStatement",
						line: 134,
						hit: 7,
					},
					{
						name: "(anonymous_15)",
						line: 138,
						hit: 21,
					},
					{
						name: "uncovered",
						line: 152,
						hit: 7,
					},
					{
						name: "(anonymous_17)",
						line: 154,
						hit: 118,
					},
					{
						name: "(anonymous_18)",
						line: 155,
						hit: 97,
					},
					{
						name: "(anonymous_19)",
						line: 158,
						hit: 203,
					},
					{
						name: "(anonymous_20)",
						line: 159,
						hit: 143,
					},
					{
						name: "ranges",
						line: 164,
						hit: 7,
					},
					{
						name: "(anonymous_22)",
						line: 167,
						hit: 76,
					},
					{
						name: "(anonymous_23)",
						line: 172,
						hit: 595,
					},
					{
						name: "(anonymous_24)",
						line: 173,
						hit: 240,
					},
				],
			},
			branches: {
				hit: 26,
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
						taken: 28,
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
						taken: 0,
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
						taken: 0,
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
						taken: 0,
					},
					{
						line: 40,
						block: 4,
						branch: 0,
						taken: 32,
					},
					{
						line: 40,
						block: 4,
						branch: 1,
						taken: 0,
					},
					{
						line: 44,
						block: 5,
						branch: 0,
						taken: 0,
					},
					{
						line: 44,
						block: 5,
						branch: 1,
						taken: 32,
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
						taken: 0,
					},
					{
						line: 53,
						block: 6,
						branch: 2,
						taken: 1,
					},
					{
						line: 56,
						block: 7,
						branch: 0,
						taken: 7,
					},
					{
						line: 56,
						block: 7,
						branch: 1,
						taken: 0,
					},
					{
						line: 83,
						block: 8,
						branch: 0,
						taken: 32,
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
						taken: 32,
					},
					{
						line: 93,
						block: 10,
						branch: 0,
						taken: 28,
					},
					{
						line: 93,
						block: 10,
						branch: 1,
						taken: 28,
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
						taken: 21,
					},
					{
						line: 153,
						block: 12,
						branch: 0,
						taken: 7,
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
						taken: 7,
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
						taken: 34,
					},
					{
						line: 168,
						block: 14,
						branch: 1,
						taken: 42,
					},
					{
						line: 174,
						block: 15,
						branch: 0,
						taken: 5,
					},
					{
						line: 174,
						block: 15,
						branch: 1,
						taken: 235,
					},
					{
						line: 179,
						block: 16,
						branch: 0,
						taken: 87,
					},
					{
						line: 179,
						block: 16,
						branch: 1,
						taken: 148,
					},
					{
						line: 183,
						block: 17,
						branch: 0,
						taken: 77,
					},
					{
						line: 183,
						block: 17,
						branch: 1,
						taken: 71,
					},
					{
						line: 192,
						block: 18,
						branch: 0,
						taken: 5,
					},
					{
						line: 192,
						block: 18,
						branch: 1,
						taken: 2,
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

	const expected = {
		total: {
			stmts: {
				after: 57.33,
				before: 26.13,
			},
			branches: {
				after: 39.17,
				before: 17.8,
			},
			functions: {
				after: 77.78,
				before: 31.48,
			},
			lines: {
				after: 62.5,
				before: 29.56,
			},
		},
		files: [
			{
				file: "src/report.js",
				stmts: {
					after: 88.97,
				},
				branches: {
					after: 66.67,
				},
				functions: {
					after: 100,
				},
				lines: {
					after: 97.22,
				},
				details: {
					stmts: {
						hit: 121,
						found: 136,
					},
					branches: {
						hit: 26,
						found: 39,
					},
					functions: {
						hit: 25,
						found: 25,
					},
					lines: {
						hit: 70,
						found: 72,
					},
					uncoveredLines: [
						[11],
						[33, 34],
						[37],
						[40],
						[44, 45],
						[53],
						[56],
						[83, 84],
						[139, 140],
						[153],
						[157],
					],
				},
			},
		],
	}

	// const raw = readFileSync(__dirname + "/../this_after.lcov", "utf-8")
	// const afterData = await parse(raw)
	// writeFileSync("./afterData.json", JSON.stringify(afterData, null, 2))
	// writeFileSync("./result.json", JSON.stringify(result, null, 2))

	const result = combinedReport(afterData, beforeData)

	expect(result).toStrictEqual(expected)
})
