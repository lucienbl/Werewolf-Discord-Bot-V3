import { Message } from "discord.js";
import { EventEmitter } from "events";
import Handler from "./Handler";
import { LocalEvents } from "../core";

class CommonMessageHandler extends Handler {

    constructor(localEmitter: EventEmitter) {
        super(localEmitter);

        this._addLocalListener(LocalEvents.NEW_MESSAGE_COMMON, this._handleNewCommonMessage);
    }

    _handleNewCommonMessage = async (msg: Message): Promise<void> => {
        // await msg.channel.send("Hi :wave:");
    };
}

export default CommonMessageHandler;
