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
