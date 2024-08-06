import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";


const dir = dirname(fileURLToPath(import.meta.url));
export const packagePath = join(dir, "..");
const packageFile = join(packagePath, "package.json");
export const AppInfo = JSON.parse(readFileSync(packageFile, "utf8"));
