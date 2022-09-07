import { Command } from '../Command';

export default new Command({
	name: 'help',
	description: 'Show the help info'
}).run((client) => client.commands.flatMap((c) => `${c.name} - ${c.description}`).join('\n'));
