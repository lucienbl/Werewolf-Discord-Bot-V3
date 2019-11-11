import { EventEmitter as Emitter } from "events";

class EventEmitter extends Emitter {

    /**
     * Emit a local event
     * @param event
     * @param args
     * @private
     */
    _emitLocalEvent = (event: number, ...args: any[]): void => {
        this.emit(event.toString(), ...args);
    }
}

export default EventEmitter;
