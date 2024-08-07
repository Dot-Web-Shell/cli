import { readFileSync } from "fs";
import { existsSync, readdirSync } from "fs";
import { readFile, writeFile } from "fs/promises";
import { join, parse } from "path";

export default class LocalFile {
    static *readDir(src) {
        for (const d of readdirSync(src, { withFileTypes: true })) {
            const c = join(src, d.name);
            if (d.isDirectory()) {
                yield* LocalFile.readDir(c);
                continue;
            }
            yield new LocalFile(c);
        }
    }
    constructor(path) {
        this.path = path;
        const { dir, ext, base, name } = parse(this.path);
        this.dir = dir;
        this.ext = ext;
        this.name = base;
        this.onlyName = name;
    }
    exists() {
        return existsSync(this.path);
    }
    writeFile(content, encoding) {
        return writeFile(this.path, content, encoding);
    }
    readFile(encoding) {
        return readFile(this.path, encoding);
    }
    async readJson() {
        return JSON.parse(await this.readFile("utf8"));
    }
    async writeJson(json) {
        return this.writeFile(JSON.stringify(json, void 0, 4));
    }
}

const config = JSON.parse(readFileSync("dot-web-shell.config.json", "utf8"));

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

