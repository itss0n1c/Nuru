import { Nuru } from './index.js';

// eslint-disable-next-line no-unused-vars
type CBFunction<T = Nuru> = (client: T, args: string[]) => string | Promise<string> | void | Promise<void>;

interface CmdInfo {
	name: string;
	description: string;
}

export class Command<T = Nuru> {
	name: string;
	description: string;
	client: T;
	response: CBFunction<T>;

	constructor(data: CmdInfo) {
		this.name = data.name;
		this.description = data.description;
	}

	run(cb: CBFunction<T>): this {
		this.response = cb;
		return this;
	}

	async handle(client: T, args: string[]): Promise<string | void> {
		return this.response(client, args);
	}
}
