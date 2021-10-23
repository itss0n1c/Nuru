import { Nuru } from '.';
import BaseStore from './BaseStore';
declare type CBFunction<T = Nuru> = (client: T, args: string[]) => string | Promise<string>;
interface CmdInfo {
    name: string;
    description: string;
}
export declare class Command<T = Nuru> {
    name: string;
    description: string;
    client: T;
    response: CBFunction<T>;
    constructor(data: CmdInfo);
    run(cb: CBFunction<T>): Promise<void>;
    handle(client: T, args: string[]): Promise<string>;
}
export declare class Commands extends BaseStore<string, Command> {
}
export {};
