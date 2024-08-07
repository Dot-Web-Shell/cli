import { join } from "path";
import { AppInfo, packagePath } from "../../AppInfo.js";
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

        const pkgFile = cwd.file("package.json");

        const pkg = await pkgFile.readJson();

        pkg.devDependencies ??= {};
        pkg["@dot-web-shell/cli"] = "^" + AppInfo.version;
        pkg.scripts ??= {};
        pkg.scripts.version = "node ./node_modules/@dot-web-shell/cli sync";
        pkg.scripts.postversion = "git push --follow-tags";
        pkg.scripts.build = "node ./node_modules/@dot-web-shell/cli setup-build";

        await pkgFile.writeJson(pkg);


        const dotConfig = cwd.file("dot-web-shell.config.json");

        const config = await dotConfig.readJson();
        const tokens = pkg.version.split(".");
        tokens.pop();
        config.version = tokens.join(".");
        config.buildNumber ??= 1;
        config.buildNumber = (parseInt(config.buildNumber, 10) + 1).toString();

        await dotConfig.writeJson(config);
    

    });