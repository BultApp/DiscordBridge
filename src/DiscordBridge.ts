import * as Discord from "discord.js";

let api;
let helper;
let discordClient;
let discordChannel;

exports.constructor = (api: any, helper: any) => {
    this.api = api;
    this.helper = helper;
    this.discordClient = new Discord.Client();

    this.discordClient.on("ready", () => {
        console.log("[DiscordBridge] Discord client ready.");
        this.discordChannel = this.discordClient.channels.find("name", process.env.DISCORDBRIDGE_DISCORD_CHANNEL);
    });

    this.discordClient.on("message", (message: any) => {
        if (message.channel.name.toLowerCase() === process.env.DISCORDBRIDGE_DISCORD_CHANNEL && message.content.indexOf("[DB]") < 0) {
            this.api.say(message.content + " [" + message.author.username + "#" + message.author.discriminator + "] [DB]");
        }
    });

    this.discordClient.login(process.env.DISCORDBRIDGE_DISCORD_TOKEN);
};


exports.onChatMessage = {
    execute: (data: any, message: any) => {
        if (message.message.indexOf("[DB]") < 0) {
            this.discordChannel.send(message.message + " [/" + message.username + "] [DB]");
        }
    }
};