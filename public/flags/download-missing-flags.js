import fs from "fs";
import https from "https";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const flagsToDownload = [
	{ code: "aw", name: "aruba" },
	{ code: "bm", name: "bermuda" },
	{ code: "vg", name: "british-virgin-islands" },
	{ code: "ky", name: "cayman-islands" },
	{ code: "fo", name: "faroe-islands" },
	{ code: "gu", name: "guam" },
	{ code: "hk", name: "hong-kong" },
	{ code: "il", name: "israel" },
	{ code: "mo", name: "macao" },
	{ code: "mp", name: "northern-mariana-islands" },
	{ code: "pr", name: "puerto-rico" },
	{ code: "tc", name: "turks-and-caicos-islands" },
	{ code: "vi", name: "virgin-islands" },
];

const downloadDir = path.join(__dirname, "downloaded-flags");

// Create downloaded-flags directory if it doesn't exist
if (!fs.existsSync(downloadDir)) {
	fs.mkdirSync(downloadDir);
}

function downloadFlag(code, name) {
	const url = `https://raw.githubusercontent.com/lipis/flag-icons/main/flags/4x3/${code}.svg`;
	const filePath = path.join(downloadDir, `${name}.svg`);

	return new Promise((resolve, reject) => {
		https
			.get(url, (response) => {
				if (response.statusCode !== 200) {
					reject(new Error(`Failed to download ${name}: ${response.statusCode}`));
					return;
				}

				const file = fs.createWriteStream(filePath);
				response.pipe(file);

				file.on("finish", () => {
					file.close();
					console.log(`Downloaded ${name}.svg`);
					resolve();
				});
			})
			.on("error", (err) => {
				reject(new Error(`Error downloading ${name}: ${err.message}`));
			});
	});
}

async function downloadAllFlags() {
	console.log("Starting flag downloads...");

	for (const flag of flagsToDownload) {
		try {
			await downloadFlag(flag.code, flag.name);
		} catch (error) {
			console.error(`Error downloading ${flag.name}:`, error.message);
		}
	}

	console.log("Download complete!");
}

downloadAllFlags();
