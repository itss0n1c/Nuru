import { Nuru } from '.';
import BaseStore from './BaseStore';

// eslint-disable-next-line no-unused-vars
type CBFunction<T = Nuru> = (client: T, args: string[]) => string | Promise<string>

interface CmdInfo {
	name: string
	description: string
}

export class Command<T = Nuru> {
	name: string
	description: string
	client: T
	response: CBFunction<T>

	constructor(data: CmdInfo) {
		this.name = data.name;
		this.description = data.description;
	}

	async run(cb: CBFunction<T>): Promise<void> {
		this.response = cb;
	}

	async handle(client: T, args: string[]): Promise<string> {
		return this.response(client, args);
	}
}

export class Commands extends BaseStore<string, Command> {}
