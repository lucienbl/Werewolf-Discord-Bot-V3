import Discord, { Message } from 'discord.js';
import { Events } from "./core";
import MessageHandler from "./handlers/MessageHandler";

const client = new Discord.Client();

client.on(Events.Ready, () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on(Events.Message, async (msg: Message) => MessageHandler.dispatch(msg));

client.login('token').then(() => {
  console.log("Successfully logged in!");
});
