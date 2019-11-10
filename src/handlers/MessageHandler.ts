import { Message } from "discord.js";

class MessageHandler {

    public static dispatch = (message: Message): void => {
        const isDM = message.channel.type === "dm";

        if (isDM) {
            console.log("This is a DM!");
        } else {
            console.log("This is a common message!");
        }
    };
}

export default MessageHandler;
