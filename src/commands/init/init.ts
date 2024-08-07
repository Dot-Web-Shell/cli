import { cwd } from "../../cwd/cwd.js";
import { cli } from "../../cli.js";


cli
    .command("init")
    .requiredOption("name", "Application Name", "Name of the application")
    .requiredOption("id", "Bundle ID")
    .requiredOption("url", "url", "Hosted Application URL")
    .execute( async (command, options) => {
        const { name, id, url } = options;

        const defaultConfig = {
            name, id, url
        };
    
        cwd.createTextFileIfNotExists("dot-web-shell.config.json", JSON.stringify(defaultConfig, void 0, 4));

        // update package.json

        const pkg = await cwd.readJson("package.json");
        pkg.dependencies ??= {};
        pkg["@dot-web-shell/build"] = "^1.0.0";
        pkg.scripts ??= {};
        pkg.scripts.postversion = "node @dot-web-shell/build/dist/post-version.js && git push --follow-tags";

        await cwd.writeFile("package.json", JSON.stringify(pkg, void 0, 4));
    });