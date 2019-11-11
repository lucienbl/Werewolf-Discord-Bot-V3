import { EventEmitter } from "events";

class Handler {

    _localEmitter: EventEmitter;

    constructor(localEmitter: EventEmitter) {
        this._localEmitter = localEmitter;
    }

    _addLocalListener = (eventName: number, listener: any): void => {
        this._localEmitter.addListener(eventName.toString(), listener);
    };
}

export default Handler;
