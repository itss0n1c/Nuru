import { Command, Nuru } from '../src';

const testDefaultCommand = new Command({
	name: 'test',
	description: 'a default test command'
}).run((inst, args) => args.join(' '));
const cli = new Nuru().init({
	commands: [ testDefaultCommand ],
	defaultCommand: 'test',
	args: {
		'-o': String,
		'-d': String
	}
});

