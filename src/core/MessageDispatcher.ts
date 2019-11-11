import { Message } from "discord.js";
import { LocalEvents, EventEmitter } from "./index";
import { DirectMessageHandler, Handler, CommonMessageHandler } from "../handlers";
import {Logger} from "../utils";

class MessageDispatcher {

    _localEmitter: EventEmitter;
    _handlers: Handler[];

    constructor() {
        this._localEmitter = new EventEmitter();
        this._handlers = [];
    }

    public initializeClientStack = (): void => {
        this._handlers.push(new DirectMessageHandler(this._localEmitter));
        this._handlers.push(new CommonMessageHandler(this._localEmitter));

        Logger.info("Client stack successfully initialized!");
    };

    public dispatch = async (message: Message): Promise<any> => {
        const isDM = message.channel.type === "dm";
        const isBot = message.author.bot;

        if (isBot) return;

        if (isDM) {
            this._localEmitter._emitLocalEvent(LocalEvents.NEW_MESSAGE_DM, message);
        } else {
            this._localEmitter._emitLocalEvent(LocalEvents.NEW_MESSAGE_COMMON, message);
        }
    };
}

export default MessageDispatcher;
