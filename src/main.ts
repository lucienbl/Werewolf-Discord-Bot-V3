import { Message, Client } from 'discord.js';
import { Events, MessageDispatcher } from "./core";
import { Logger } from "./utils";

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const client = new Client();
const messageDispatcher = new MessageDispatcher();

// setup listeners
client.on(Events.Ready, () => messageDispatcher.initializeClientStack());
client.on(Events.Message, (message: Message) => messageDispatcher.dispatch(message));

// login client
client.login(process.env.BOT_TOKEN).then(() => Logger.info("Bot logged in!"));
