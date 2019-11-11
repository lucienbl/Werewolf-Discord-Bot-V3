import {Command} from "./index";
import {Message} from "discord.js";

class HelpCommand extends Command {

    constructor(message: Message) {
        super(message);
    }

    handle = async (): Promise<any> => {
        await this._reply("You need help?");
    }
}

export default HelpCommand;
