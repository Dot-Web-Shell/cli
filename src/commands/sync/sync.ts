import { join } from "path";
import { packagePath } from "../../AppInfo.js";
import { cli } from "../../cli.js";
import { cwd } from "../../cwd/cwd.js";

cli
    .command("sync")
    .description("Generate the Mobile App Source Code for the App, Warning, this will override existing files")
    .execute(async (command, options) => {
        const contentAppFolder = join(packagePath, "content", "app");

        const config = await cwd.readJson("dot-web-shell.config.json");

        await cwd.copyFolder(contentAppFolder, "maui", config);
    });