/*
 * Copyright (c) 2019 Lucien Blunk-Lallet
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

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
