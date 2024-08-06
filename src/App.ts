import { AppCommands } from "./AppCommand.js";
import "./commands/init/init.js";
import "./commands/sync/sync.js";

AppCommands.parse(process.argv);