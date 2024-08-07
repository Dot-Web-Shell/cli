import { cli } from "./cli.js";
import "./commands/init/init.js";
import "./commands/sync/sync.js";
import "./commands/setup-build/setup-build.js";
cli.execute(process.argv);