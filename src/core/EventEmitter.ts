import { EventEmitter as Emitter } from "events";

class EventEmitter extends Emitter {

    _emitLocalEvent = (event: number, ...args: any[]): void => {
        this.emit(event.toString(), ...args);
    }
}

export default EventEmitter;
