import {Command} from "./index";
import {Message} from "discord.js";

class TesterHatCommand extends Command {

    constructor(message: Message) {
        super(message);
    }

    handle = async (): Promise<any> => {
        await this._reply("You want a tester hat?");
    }
}

export default TesterHatCommand;
