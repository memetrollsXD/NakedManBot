import { Message, MessagePayload, ReplyMessageOptions } from "discord.js-selfbot-v13";
import defaultHandler from "../handlers/default";
import config from '../config.json';
import Logger from "./Logger";

const c = new Logger("Command", "blue");

export default class Command {
    public readonly name: string;
    public readonly args: string[];
    constructor(public readonly message: Message) {
        const split = message.content.split(/ +/);
        this.name = split[0].substring(1);
        this.args = split.slice(1);
    }

    public execute() {
        c.log(`${this.message.author.tag} issued command ${this.name}`);
        c.trail(this.args.join(" "));
        try {
            import(`../handlers/${this.name}`).then(module => {
                module.default(this);
            }).catch(err => {
                if (err.code === "MODULE_NOT_FOUND") {
                    c.warn(`No handler found for command ${this.name}`);
                    defaultHandler(this);
                    return;
                }
                c.error(err);
            });
        } catch (e: any) {
            c.error(e);
            defaultHandler(this);
        }
    }

    public async reply(message: string | MessagePayload | ReplyMessageOptions) {
        this.message.reply(config.message_prefix ? `${config.message_prefix}${message}` : message);
    }
}