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

import { Message } from "discord.js";
import { EventEmitter } from "events";
import Handler from "./Handler";
import {DialogFlow, LocalEvents} from "../core";

class DirectMessageHandler extends Handler {

    _dialogFlow: DialogFlow;

    constructor(localEmitter: EventEmitter) {
        super(localEmitter);

        this._dialogFlow = new DialogFlow();

        this._addLocalListener(LocalEvents.NEW_MESSAGE_DM, this._handleNewDirectMessage);
    }

    _handleNewDirectMessage = async (message: Message): Promise<void> => {
        const userId = message.author.id;
        const text = message.content;

        const dialogFlowResponse = await this._dialogFlow.getResponse(userId, text);

        if (dialogFlowResponse.intent) {
            message.channel.send(dialogFlowResponse.fulfillmentText);
        } else {
            message.channel.send("Sorry, I didn't get what you said!");
        }
    };
}

export default DirectMessageHandler;
