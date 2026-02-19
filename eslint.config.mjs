import nextVitals from "eslint-config-next/core-web-vitals";
import prettier from "eslint-config-prettier/flat";
import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
	...nextVitals,
	prettier,
	// Override default ignores of eslint-config-next.
	globalIgnores([
		// Default ignores of eslint-config-next:
		".next/**",
		"out/**",
		"build/**",
		"next-env.d.ts",
		".history/**",
	]),
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
]);

export default eslintConfig;
