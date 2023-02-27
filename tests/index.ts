import { Command, Nuru } from '../src/index.js';

const testDefaultCommand = new Command({
	name: 'test',
	description: 'a default test command'
}).run((inst, args) => args.join(' '));

new Nuru({
	commands: [ testDefaultCommand ],
	args: {
		'-o': String,
		'-d': String
	}
}).handleRes();
