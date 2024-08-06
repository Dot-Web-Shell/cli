export interface ICommandOption {
    required?: boolean;
    /** -- will be prefixed automatically */
    option: string;
    description?: string;
    /** - will be prefixed automatically */
    short?: string;
    defaultValue?: any;
    prompt?: string;
}

export default interface ICommand {
    name: string;
    description?: string;
    options: ICommandOption[];
    execute: (command, options) => void | Promise<void>;
}

class Command {

    public readonly cmd: ICommand = { name: "", options: [], execute: () => { throw new Error("Execute not defined") }};

    constructor(name) {
        this.cmd.name = name;
    }

    description(description: string) {
        this.cmd.description = description;
        return this;
    }

    execute(fx: ((command: any, options: any) => void | Promise<void>)) {
        this.cmd.execute = fx;
        return this;
    }

    flag(option: string, description: string, ) {
        this.cmd.options.push({
            option,
            description
        })
        return this;
    }

    prompt(option: string, prompt: string, defaultValue?: string, description?: string, ) {
        this.cmd.options.push({
            option,
            prompt,
            description
        })
        return this;
    }

    requiredOption(option: string, prompt: string, description?: string, ) {
        this.cmd.options.push({
            option,
            prompt,
            required: true,
            description
        })
        return this;
    }

    toDetailedString() {
        let options = this.cmd.options.length ? "\nOptions:" : "";
        for (const i of this.cmd.options) {
            let option = `\n\t--${i.option}`;
            if (i.prompt) {
                option += `=${i.prompt}\t\t${i.description ?? ""}`;
            }
            options += `${option}`;
        }
        if (this.cmd.description) {
            return `${this.cmd.name}\n\t${this.cmd.description}${options}\t${this.cmd.description}`;
        }
        return `${this.cmd.name} ${options}`;
    }

    toString() {
        return `${this.cmd.name} [options]`;
    }
}

export class CLI {

    name = "CLI Name";

    description = "CLI Description";

    commands = [] as Command[];

    execute(argv = process.argv) {

        if (argv.length > 2) {

            const [program, script, command, ... options] = argv;

            if (/^help$/i.test(command)) {
                if (options.length) {
                    const cmd = this.findCommand(options[0]);
                    console.log(cmd.toDetailedString());
                    return;
                } 
                for (const element of this.commands) {
                    console.log(element.toDetailedString());
                }
                return;
            }


            return;
        }
        
        for (const element of this.commands) {
            console.log(element.toString());
        }
    }

    findCommand(name: string) {
        for (const element of this.commands) {
            if (name === element.cmd.name) {
                return element;
            }
        }
        console.error(`Command ${name} not found`);
    }

    command(name: string) {
        const cmd = new Command(name);
        this.commands.push(cmd);
        return cmd;
    }

}

export let cli = new CLI();
