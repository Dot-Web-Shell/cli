import { cli } from "../../cli.js";
import { cwd } from "../../cwd/cwd.js";
import LocalFile from "../../core/LocalFile.js";

cli
    .command("setup-build")
    .description("Generate the Mobile App Source Code for the App, Warning, this will override existing files")
    .execute(async (command, options) => {

        const dotConfig = cwd.file("dot-web-shell.config.json");

        const config = await dotConfig.readJson();

        const substitutions = [];

        for (const key in config) {
            if (Object.prototype.hasOwnProperty.call(config, key)) {
                const element = config[key];
                substitutions.push([`$$config.${key}$$`, element]);
            }
        }
        
        for (const element of LocalFile.readDir( cwd.file("maui").path )) {

            if (!/\.(cs|xaml|json|xml|csproj|text|js|ts)$/i.test(element.name)) {
                continue;
            }

            // update config...
            const text = await element.readFile("utf8");

            let replaced = text;
            for (const [k,v] of substitutions) {
                replaced = replaced.replaceAll(k, v);
            }

            if (replaced !== text) {
                await element.writeFile( replaced, "utf8");
            }
    
        }

    });