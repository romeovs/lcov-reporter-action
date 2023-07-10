import commonjs from "@rollup/plugin-commonjs"
import resolve from "@rollup/plugin-node-resolve"
import json from "@rollup/plugin-json"
import typescript from '@rollup/plugin-typescript';
import externals from "rollup-plugin-node-externals"

export default {
	input: "src/index.ts",
	output: {
		file: "dist/main.js",
		format: "cjs",
	},
	treeshake: true,
	plugins: [
		typescript(),
		externals({
			builtin: true,
			deps: false,
		}),
		resolve({
			preferBuiltins: true,
			mainFields: [ "main" ],
		}),
		commonjs(),
		json(),
	],
}
