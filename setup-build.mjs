import { readFileSync } from "fs";
import { existsSync, readdirSync } from "fs";
import { copyFile, cp, readFile, writeFile } from "fs/promises";
import { join, parse } from "path";

export default class LocalFile {

    /** @returns {Generator<LocalFile>} */
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

    async copy(dest) {
        await copyFile(this.path, dest);
        return new LocalFile(dest);
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

const generated = join(process.cwd(), "generated");

const maui = join(process.cwd(), "maui");

await cp(maui, generated, { recursive: true });

for (const element of LocalFile.readDir(generated)) {

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

