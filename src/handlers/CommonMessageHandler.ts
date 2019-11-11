import { Message } from "discord.js";
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

        const dialogFlowResponse = await this._dialogFlow.getResponse(userId, text);

        if (dialogFlowResponse.intent.displayName && dialogFlowResponse.intentDetectionConfidence >= 0.65) {
            if (dialogFlowResponse.intent.displayName !== "default-fallback") {
                message.channel.send(dialogFlowResponse.fulfillmentText);
            }
        }
    };
}

export default CommonMessageHandler;
