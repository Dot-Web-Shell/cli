import { cwd } from "../../cwd/cwd.js";
import { cli } from "../../cli.js";


cli
    .command("init")
    .requiredOption("name", "Application Name", "Name of the application")
    .requiredOption("id", "Bundle ID")
    .requiredOption("url", "url", "Hosted Application URL")
    .execute( (command, options) => {
        const { name, id, url } = options;

        const defaultConfig = {
            name, id, url
        };
    
        cwd.createTextFileIfNotExists("dot-web-shell.config.json", JSON.stringify(defaultConfig, void 0, 4));            
    });