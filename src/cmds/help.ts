import { Command } from '..';

const help = new Command({
	name: 'help',
	description: 'Show the help info'
});

help.run((client) => [ ...client.commands.values() ].flatMap((c) => `${c.name} - ${c.description}`).join('\n'));

export default help;
