"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Commands = exports.Command = void 0;
const BaseStore_1 = __importDefault(require("./BaseStore"));
class Command {
    name;
    description;
    client;
    response;
    constructor(data) {
        this.name = data.name;
        this.description = data.description;
    }
    async run(cb) {
        this.response = cb;
    }
    async handle(client, args) {
        return this.response(client, args);
    }
}
exports.Command = Command;
class Commands extends BaseStore_1.default {
}
exports.Commands = Commands;
