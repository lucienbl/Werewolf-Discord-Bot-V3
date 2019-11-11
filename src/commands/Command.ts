import {Message, User} from "discord.js";

class Command {

    _message: Message;

    constructor(message: Message) {
        this._message = message;
    }

    /**
     * Default handler
     */
    handle = (): void => {
        // nothing
    };

    /**
     * Reply to the current message
     * @param message
     * @private
     */
    _reply = async (message: string): Promise<any> => {
        await this._message.channel.send(message);
    };

    /**
     * DM the current user
     * @param message
     * @private
     */
    _DM = async (message: string): Promise<any> => {
      await this._message.author.send(message);
    };

    /**
     * Returns the author of the message
     * @private
     */
    get _user(): User {
        return this._message.author;
    }
}

export default Command;
