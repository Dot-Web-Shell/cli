import { join } from "path";
import { packagePath } from "../../AppInfo.js";
import { cli } from "../../cli.js";

cli
    .command("sync")
    .description("Generate the Mobile App Source Code for the App, Warning, this will override existing files")
    .execute((command, options) => {
        const contentAppFolder = join(packagePath, "content", "app");
    });