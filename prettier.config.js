module.exports = {
	semi: true,
	singleQuote: false,
	trailingComma: "all",
	printWidth: 100,
	useTabs: true,
	tailwindAttributes: ["activeClassName"],
	plugins: ["prettier-plugin-tailwindcss", "@trivago/prettier-plugin-sort-imports"],
	tailwindStylesheet: "./src/app/globals.css",
	importOrder: ["^@/(.*)$", "^./", "^[./]"],
	importOrderSeparation: true,
	importOrderSortSpecifiers: true,
};
