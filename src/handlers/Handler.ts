import { EventEmitter } from "events";

class Handler {

    _localEmitter: EventEmitter;

    constructor(localEmitter: EventEmitter) {
        this._localEmitter = localEmitter;
    }

    /**
     * Adds a local listener
     * @param eventName
     * @param listener
     * @private
     */
    _addLocalListener = (eventName: number, listener: any): void => {
        this._localEmitter.addListener(eventName.toString(), listener);
    };
}

export default Handler;
