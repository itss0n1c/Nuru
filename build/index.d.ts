import { Command, Commands } from './Command';
import BaseStore from './BaseStore';
import chalk from 'chalk';
import { Result } from 'arg';
export interface NuruOptions {
    name: string;
    verison: string;
    accent: [number, number, number];
    commands: Command[];
}
export declare class Nuru {
    name: string;
    version: string;
    accent: chalk.Chalk;
    args: Result<any>;
    commands: Commands;
    constructor(opts?: Partial<NuruOptions>);
    log(text: string, showTitle?: boolean, title?: boolean): void;
    handleRes(): Promise<void>;
    init(opts: Partial<NuruOptions>): Promise<void>;
}
export { Command, BaseStore, chalk };
