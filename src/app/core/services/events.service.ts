import { Injectable, Type } from '@angular/core';

import BaseEvent from '../events/base.event';

interface Listener<T extends BaseEvent> {
    type: Type<T>,
    callbacks: ((event: T) => void)[]
}

@Injectable()
export class EventsService {
    constructor() {
        this.listeners = [];
    }

    listeners: Listener<BaseEvent>[];

    on<T extends BaseEvent>(type: Type<T>, callback: (event: T) => void) {
        let listener = this.listeners.find(e => e.type === type) as Listener<T>;

        if (!listener) {
            listener = {
                type: type,
                callbacks: []
            };

            this.listeners.push(listener);
        }

        listener.callbacks.push(callback);
    }

    off<T extends BaseEvent>(type: Type<T>, callback: (event: T) => void) {
        let listener = this.listeners.find(e => e.type === type) as Listener<T>;

        if (listener) {
            listener.callbacks = listener.callbacks.filter(c => c !== callback);

            if (listener.callbacks.length === 0) {
                this.listeners = this.listeners.filter(l => l.type !== type);
            }
        }
    }

    broadcast<T extends BaseEvent>(event: T) {
        let listener = this.listeners.find((l) => l.type === event.constructor);

        if (!listener) {
            return;
        }

        for (let callback of listener.callbacks) {
            callback(event);
        }
    }
}