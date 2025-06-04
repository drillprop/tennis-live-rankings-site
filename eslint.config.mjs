import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

const eslintConfig = [
	...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),
	{
		files: ["**/*.ts", "**/*.tsx"],
		languageOptions: {
			parserOptions: {
				project: "tsconfig.json",
			},
		},

		rules: {
			"react/jsx-curly-brace-presence": ["warn", { props: "never", children: "never" }],
			"react/self-closing-comp": [
				"warn",
				{
					component: true,
					html: true,
				},
			],
			"import/no-duplicates": ["error", { "prefer-inline": true }],

			// false negatives
			"import/namespace": ["off"],

			// we allow empty interfaces
			"no-empty-pattern": "off",
			"@typescript-eslint/no-empty-interface": "off",

			// we allow empty functions
			"@typescript-eslint/no-empty-function": "off",

			"@typescript-eslint/require-await": "off",

			// make sure to `await` inside try…catch
			"@typescript-eslint/return-await": ["error", "in-try-catch"],

			// allow unused vars prefixed with `_`
			"@typescript-eslint/no-unused-vars": [
				"error",
				{ argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
			],

			// numbers and booleans are fine in template strings
			"@typescript-eslint/restrict-template-expressions": [
				"error",
				{ allowNumber: true, allowBoolean: true },
			],
		},
	},
];

export default eslintConfig;
