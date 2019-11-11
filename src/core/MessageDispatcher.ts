import { Message } from "discord.js";
import {DialogFlow, LocalEvents, EventEmitter} from "./index";
import { DirectMessageHandler, Handler, CommonMessageHandler } from "../handlers";
import {Logger} from "../utils";

class MessageDispatcher {

    _localEmitter: EventEmitter;
    _handlers: Handler[];
    _dialogFlow: DialogFlow;

    constructor() {
        this._localEmitter = new EventEmitter();
        this._handlers = [];
        this._dialogFlow = new DialogFlow();
    }

    public initializeClientStack = (): void => {
        this._handlers.push(new DirectMessageHandler(this._localEmitter));
        this._handlers.push(new CommonMessageHandler(this._localEmitter));

        Logger.info("Client stack successfully initialized!");
    };

    public dispatch = async (message: Message): Promise<any> => {
        const isDM = message.channel.type === "dm";
        const isBot = message.author.bot;
        const userId = message.author.id;
        const text = message.content;

        if (isBot) return;

        const dialogFlowResponse = await this._dialogFlow.getResponse(userId, text);

        if (dialogFlowResponse.intent && dialogFlowResponse.intentDetectionConfidence >= 0.7) {
            if (dialogFlowResponse.intent.displayName !== "default-fallback" || isDM) return message.channel.send(dialogFlowResponse.fulfillmentText);
        }

        if (isDM) {
            this._localEmitter._emitLocalEvent(LocalEvents.NEW_MESSAGE_DM, message);
        } else {
            this._localEmitter._emitLocalEvent(LocalEvents.NEW_MESSAGE_COMMON, message);
        }
    };
}

export default MessageDispatcher;
