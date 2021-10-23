"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const help = new __1.Command({
    name: 'help',
    description: 'Show the help info'
});
help.run((client) => client.commands.array().flatMap(c => `${c.name} - ${c.description}`).join('\n'));
exports.default = help;
