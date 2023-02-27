import arg, { ArgError, Result } from 'arg';
import chalk, { ChalkInstance } from 'chalk';
import help from './cmds/help.js';
import { Command } from './Command.js';

export interface NuruOptions {
	name: string;
	version: string;
	accent: [number, number, number];
	commands: Command<any>[];
	args?: arg.Spec;
	defaultCommand?: string;
}

export class Nuru {
	name: string;
	version: string;
	accent: ChalkInstance;
	args: Result<any>;
	commands: Command[] = [];

	constructor(opts: Partial<NuruOptions> = {}) {
		this.name = opts.name ?? 'Nuru';
		this.version = opts.version ?? '1.0.0';
		if (typeof opts.accent !== 'undefined') {
			this.accent = chalk.rgb(opts.accent[0], opts.accent[1], opts.accent[2]);
		} else {
			this.accent = chalk.rgb(28, 119, 255);
		}

		const defaultCommands = [ help ];
		if (typeof opts.commands !== 'undefined') {
			for (const cmd of opts.commands) {
				this.commands.push(cmd);
			}
		}
		for (const cmd of defaultCommands) {
			this.commands.push(cmd);
		}

		if (typeof opts.args === 'undefined') {
			opts.args = {};
		}

		opts.args = {
			...opts.args,
			'--help': Boolean,
			'-h': '--help',
			'-a': '--help'
		};

		try {
			this.args = arg(opts.args);
		} catch (e) {
			if (e instanceof ArgError && e.code === 'ARG_UNKNOWN_OPTION') {
				this.error(e.message);
			} else {
				this.error(e instanceof Error ? e : (e as string));
			}
			process.exit(1);
		}
		if (typeof opts.defaultCommand !== 'undefined') {
			this.args._ = [ opts.defaultCommand, ...this.args._ ];
		}
	}

	async log(text: string, showTitle = false, title = false): Promise<void> {
		const str = `${showTitle ? this.accent(`[${this.name}${title ? ` ${text}` : ''}] `) : ''}${
			!title ? chalk.white(this.formatInline(text)) : `v${this.version}\n`
		}`;
		console.log(str);
	}

	formatInline(str: string): string {
		const sub = this.substr(str, '`', '`');
		str = str.replace(/`/g, '');
		return str.replace(sub, chalk.yellow(sub));
	}

	error(text: string | Error): void {
		if (typeof text !== 'string') {
			text = text.message;
		}
		const str = `${chalk.bgRgb(255, 0, 0)(chalk.rgb(255, 255, 255)('Error'))} ${chalk.white(this.formatInline(text))}`;
		console.error(str);
	}

	substr(str: string, start: string, end: string): string {
		return str.substring(str.indexOf(start) + 1, str.lastIndexOf(end));
	}

	findCommand(name: string): Command | undefined {
		return this.commands.find((c) => c.name === name);
	}

	async handleRes(): Promise<void> {
		let cmdname = this.args._[0];
		if (typeof cmdname === 'undefined') {
			cmdname = 'help';
		}
		const extraArgs = this.args._.slice(1, this.args._.length);
		const definedArgs = Object.keys(this.args)
			.filter((k) => k !== '_')
			.map((k) => `${k} ${this.args[k]}`);

		const args = [ ...definedArgs, ...extraArgs ];
		const cmd = this.findCommand(cmdname);
		if (cmd) {
			let res: string | void;
			try {
				res = await cmd.handle(this, args);
			} catch (e) {
				return this.error(e instanceof Error ? e : (e as string));
			}

			if (typeof res !== 'undefined') {
				return this.log(res);
			}
			return void 0;
		}
		return this.error(`Command \`${cmdname}\` not found!`);
	}
}
export { Command, chalk };
