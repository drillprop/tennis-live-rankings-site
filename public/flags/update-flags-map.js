import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to convert string to kebab case
function toKebabCase(str) {
	return str
		.toLowerCase()
		.replace(/\s+/g, "-") // Replace spaces with hyphens
		.replace(/[^a-z0-9-]/g, "") // Remove any non-alphanumeric characters except hyphens
		.replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
		.replace(/^-+|-+$/g, ""); // Remove leading and trailing hyphens
}

// Read the flags-map.ts file
const flagsMapPath = path.join(__dirname, "..", "..", "src", "consts", "flags-map.ts");
const flagsMapContent = fs.readFileSync(flagsMapPath, "utf8");

// Update the flag paths
const updatedContent = flagsMapContent.replace(
	/flag: "flags\/([^"]+)\.svg"/g,
	(match, filename) => {
		const kebabCase = toKebabCase(filename);
		return `flag: "flags/${kebabCase}.svg"`;
	},
);

// Write the updated content back to the file
fs.writeFileSync(flagsMapPath, updatedContent);
console.log("Updated flags-map.ts with kebab-case filenames");
