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

import {Message, User} from "discord.js";
import { EventEmitter } from "events";
import Handler from "./Handler";
import {Commands, DialogFlow, LocalEvents} from "../core";
import HelpCommand from "../commands/HelpCommand";
import TesterHatCommand from "../commands/TesterHatCommand";

class CommonMessageHandler extends Handler {

    _dialogFlow: DialogFlow;

    constructor(localEmitter: EventEmitter) {
        super(localEmitter);

        this._dialogFlow = new DialogFlow();

        this._addLocalListener(LocalEvents.NEW_MESSAGE_COMMON, this._handleNewCommonMessage);
    }

    _handleNewCommonMessage = async (message: Message): Promise<any> => {
        const userId = message.author.id;
        const text = message.content;
        const selfId = message.client.user.id;

        const dialogFlowResponse = await this._dialogFlow.getResponse(userId, text.replace(`<@${selfId}>`, ""));

        // dialogflow handling
        if (dialogFlowResponse.intentDetectionConfidence >= 0.65) {
            if (message.mentions.users.filter((user: User) => user.id == selfId).size >= 1) {
                return message.channel.send(dialogFlowResponse.fulfillmentText);
            } else if (dialogFlowResponse.intent.displayName) {
                if (dialogFlowResponse.intent.displayName !== "default-fallback") {
                    return message.channel.send(dialogFlowResponse.fulfillmentText);
                }
            }
        }

        // commands handling
        if (!text.startsWith(process.env.PREFIX)) return;
        switch (text.toLowerCase().substr(1)) {
            case Commands.HELP: return new HelpCommand(message).handle();
            case Commands.TESTER_HAT: return new TesterHatCommand(message).handle();

            default: return;
        }
    };
}

export default CommonMessageHandler;
