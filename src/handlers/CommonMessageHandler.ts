import {Message, User} from "discord.js";
import { EventEmitter } from "events";
import Handler from "./Handler";
import {DialogFlow, LocalEvents} from "../core";

class CommonMessageHandler extends Handler {

    _dialogFlow: DialogFlow;

    constructor(localEmitter: EventEmitter) {
        super(localEmitter);

        this._dialogFlow = new DialogFlow();

        this._addLocalListener(LocalEvents.NEW_MESSAGE_COMMON, this._handleNewCommonMessage);
    }

    _handleNewCommonMessage = async (message: Message): Promise<void> => {
        const userId = message.author.id;
        const text = message.content;
        const selfId = message.client.user.id;

        const dialogFlowResponse = await this._dialogFlow.getResponse(userId, text.replace(`<@${selfId}>`, ""));

        if (dialogFlowResponse.intentDetectionConfidence >= 0.65) {
            if (message.mentions.users.filter((user: User) => user.id == selfId).size >= 1) {
                message.channel.send(dialogFlowResponse.fulfillmentText);
            } else if (dialogFlowResponse.intent.displayName) {
                if (dialogFlowResponse.intent.displayName !== "default-fallback") {
                    message.channel.send(dialogFlowResponse.fulfillmentText);
                }
            }
        }
    };
}

export default CommonMessageHandler;
