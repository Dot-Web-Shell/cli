import { existsSync, writeFileSync } from "fs";
import { join } from "path";

export const cwd = {

    get path() {
        return process.cwd();
    },

    createTextFileIfNotExists(file, data: string) {
        const path = join(this.path, file);
        if (existsSync(path)) {
            return;
        }
        writeFileSync(file, data);
    },

    copyFolder(src, dest) {
        const path = join(this.path, dest);

    }

};