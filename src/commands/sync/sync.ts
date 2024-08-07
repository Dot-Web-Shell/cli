import { join } from "path";
import { packagePath } from "../../AppInfo.js";
import { cli } from "../../cli.js";
import { cwd } from "../../cwd/cwd.js";
import { readFile, writeFile } from "fs/promises";

cli
    .command("sync")
    .description("Generate the Mobile App Source Code for the App, Warning, this will override existing files")
    .execute(async (command, options) => {
        const contentAppFolder = join(packagePath, "content", "app");

        if (!cwd.exists("maui")) {

            await cwd.copyFolder(contentAppFolder, "maui", {});

        }

        const pkg = await cwd.readJson("package.json");

        const config = await cwd.readJson("dot-web-shell.config.json");
        config.version = pkg.version;
        config.buildNumber ??= 1;
        config.buildNumber = (parseInt(config.buildNumber, 10) + 1).toString();

        const substitutions = [];

        for (const key in config) {
            if (Object.prototype.hasOwnProperty.call(config, key)) {
                const element = config[key];
                substitutions.push([`$$config.${key}$$`, element]);
            }
        }

        for (const element of cwd.readDir("maui")) {

            if (!/\.(cs|xaml|json|xml|csproj)$/i.test(element)) {
                continue;
            }

            // update config...
            const text = await readFile(element, "utf8");

            let replaced = text;
            for (const [k,v] of substitutions) {
                replaced = replaced.replaceAll(k, v);
            }

            if (replaced !== text) {
                await writeFile(element, replaced, "utf8");
            }
    
        }

    });