"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chalk = exports.BaseStore = exports.Command = exports.Nuru = void 0;
const Command_1 = require("./Command");
Object.defineProperty(exports, "Command", { enumerable: true, get: function () { return Command_1.Command; } });
const BaseStore_1 = __importDefault(require("./BaseStore"));
exports.BaseStore = BaseStore_1.default;
const chalk_1 = __importDefault(require("chalk"));
exports.chalk = chalk_1.default;
const arg_1 = __importDefault(require("arg"));
const help_1 = __importDefault(require("./cmds/help"));
class Nuru {
    name;
    version;
    accent;
    args;
    commands = new Command_1.Commands();
    constructor(opts) {
        this.init(opts);
    }
    log(text, showTitle = false, title = false) {
        const str = `${showTitle ? this.accent(`[${this.name}${title ? ` ${text}` : ''}] `) : ''}${!title ? chalk_1.default.white(text) : `v${this.version}\n`}`;
        console.log(str);
    }
    async handleRes() {
        const cmdname = this.args._[0];
        if (typeof cmdname === 'undefined') {
            return this.log(await this.commands.get('help').handle(this, []));
        }
        const args = this.args._.slice(1, this.args._.length);
        if (this.commands.has(cmdname)) {
            const cmd = this.commands.get(cmdname);
            let res;
            try {
                res = await cmd.handle(this, args);
            }
            catch (e) {
                return console.error(e);
            }
            return this.log(res);
        }
        return this.log(`Command '${cmdname}' not found!`, true);
    }
    async init(opts) {
        if (typeof opts === 'undefined') {
            opts = {};
        }
        this.name = opts.name ?? 'Nuru';
        this.version = opts.verison ?? '1.0.0';
        if (typeof opts.accent !== 'undefined') {
            this.accent = chalk_1.default.rgb(opts.accent[0], opts.accent[1], opts.accent[2]);
        }
        else {
            this.accent = chalk_1.default.rgb(28, 119, 255);
        }
        const defaultCommands = [help_1.default];
        if (typeof opts.commands !== 'undefined') {
            for (const cmd of opts.commands) {
                this.commands.set(cmd.name, cmd);
            }
        }
        for (const cmd of defaultCommands) {
            this.commands.set(cmd.name, cmd);
        }
        try {
            this.args = (0, arg_1.default)({
                '--help': Boolean,
                '-h': '--help'
            });
        }
        catch (e) {
            if (e.code === 'ARG_UNKNOWN_OPTION') {
                return this.log(e.message, true);
            }
            return this.log(e);
        }
        await this.handleRes();
    }
}
exports.Nuru = Nuru;
