import { cwd } from "../../cwd/cwd.js";
import { cli } from "../../cli.js";


cli
    .command("init")
    .requiredOption("name", "Application Name", "Name of the application")
    .requiredOption("id", "Bundle ID")
    .requiredOption("url", "url", "Hosted Application URL")
    .requiredOption("buildNumber", "build number", "Build number to start with")
    .execute( async (command, options) => {
    
        cwd.createTextFileIfNotExists("dot-web-shell.config.json", JSON.stringify(options, void 0, 4));

        // update package.json

        const pkg = await cwd.readJson("package.json");
        pkg.dependencies ??= {};
        pkg["@dot-web-shell/build"] = "^1.0.0";
        pkg.scripts ??= {};
        pkg.scripts.version = "node @dot-web-shell/cli sync";
        pkg.scripts.postversion = "git push --follow-tags";

        await cwd.writeFile("package.json", JSON.stringify(pkg, void 0, 4));
    });