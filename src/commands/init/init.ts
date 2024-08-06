import { AppCommands } from "../../AppCommand.js";
import { cwd } from "../../cwd/cwd.js";

const init = (str, options) => {

    const defaultConfig = {
        ... options
    };

    cwd.createTextFileIfNotExists("dot-web-shell.config.json", JSON.stringify(defaultConfig, void 0, 4));

}

AppCommands
    .command("init")
    .description("Generate default config")
    .option("--name", "Name of the app", "App Name")
    .option("--id", "App/Bundle ID of the App", "com.dot-web-shell.app")
    .option("--url", "URL To Load the App")
    .action(init);