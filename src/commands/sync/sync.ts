import { join } from "path";
import { packagePath } from "../../AppInfo.js";
import { AppCommands } from "../../AppCommand.js";

export default function sync(str, options) {
    // copy all files...

    const contentAppFolder = join(packagePath, "content", "app");


}

AppCommands
    .command("sync")
    .description("Generate the Mobile App Source Code for the App, Warning, this will override existing files")
    .action(sync);