import { Command, Commands } from './Command';
import BaseStore from './BaseStore';
import chalk from 'chalk';
import arg, { Result } from 'arg';
import help from './cmds/help';

export interface NuruOptions {
	name: string
	verison: string
	accent: [number, number, number],
	commands: Command[]
	args?: arg.Spec
	defaultCommand?: string
}

export class Nuru {
	name: string
	version: string
	accent: chalk.Chalk
	args: Result<any>
	commands = new Commands();

	async log(text: string, showTitle = false, title = false): Promise<void> {
		const str = `${showTitle ? this.accent(`[${this.name}${title ? ` ${text}` : ''}] `) : ''}${!title ? chalk.white(this.formatInline(text)) : `v${this.version}\n`}`;
		console.log(str);
	}

	formatInline(str: string): string {
		const sub = this.substr(str, '`', '`');
		str = str.replace(/`/g, '');
		return str.replace(sub, chalk.yellow(sub));
	}

	error(text: string): void {
		const str = `${chalk.bgRgb(255, 0, 0)(chalk.rgb(255, 255, 255)('Error'))} ${chalk.white(this.formatInline(text))}`;
		console.log(str);
	}

	substr(str: string, start: string, end: string): string {
		return str.substring(
			str.indexOf(start) + 1,
			str.lastIndexOf(end)
		);
	}

	async handleRes(): Promise<void> {
		const cmdname = this.args._[0];
		const args = this.args._.slice(1, this.args._.length);
		if (this.commands.has(cmdname)) {
			const cmd = this.commands.get(cmdname);
			let res: string;
			try {
				res = await cmd.handle(this, args);
			} catch (e) {
				return this.error(e);
			}

			return this.log(res);
		}
		return this.error(`Command \`${cmdname}\` not found!`);
	}

	async init(opts?: Partial<NuruOptions>): Promise<void> {
		if (typeof opts === 'undefined') {
			opts = {};
		}
		this.name = opts.name ?? 'Nuru';
		this.version = opts.verison ?? '1.0.0';
		if (typeof opts.accent !== 'undefined') {
			this.accent = chalk.rgb(opts.accent[0], opts.accent[1], opts.accent[2]);
		} else {
			this.accent = chalk.rgb(28, 119, 255);
		}

		const defaultCommands = [ help ];
		if (typeof opts.commands !== 'undefined') {
			for (const cmd of opts.commands) {
				this.commands.set(cmd.name, cmd);
			}
		}
		for (const cmd of defaultCommands) {
			this.commands.set(cmd.name, cmd);
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
			if (e.code === 'ARG_UNKNOWN_OPTION') {
				return this.log(e.message, true);
			}
			return this.log(e);
		}
		if (typeof this.args._[0] === 'undefined') {
			this.args._[0] = opts.defaultCommand ?? 'help';
		}
		return this.handleRes();
	}
}
export { Command, BaseStore, chalk };
