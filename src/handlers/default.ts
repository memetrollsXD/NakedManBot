import Command from "../util/Command";

export default async function run(command: Command) {
    command.reply(command.args.join(" "));
}