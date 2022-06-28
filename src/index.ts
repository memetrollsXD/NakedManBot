import { Client } from 'discord.js-selfbot-v13';
import config from './config.json';
import Command from './util/Command';
import Logger from './util/Logger';

const c = new Logger("Client");
c.log("Starting...");
const client = new Client({ checkUpdate: false });

client.on('ready', () => {
    c.log(`Logged in as ${client.user?.tag}!`);
});

client.on("messageCreate", (message) => {
    if (!config.WHITELISTED_GUILDS.includes(message.guildId || message.guild!.id) || message.author.bot) return;
    if (message.content.startsWith(config.prefix)) {
        new Command(message).execute();
    }
});

client.login(config.token);