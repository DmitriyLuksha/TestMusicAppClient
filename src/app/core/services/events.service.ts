import { Injectable, Type } from '@angular/core';

import BaseEvent from '../events/base.event';

interface TypeListener<T extends BaseEvent> {
    type: Type<T>;
    listeners: {
        callback: (event: T) => void;
        thisArg?: any;
    }[]
}

@Injectable()
export class EventsService {
    constructor() {
        this.typeListeners = [];
    }

    typeListeners: TypeListener<BaseEvent>[];

    on<T extends BaseEvent>(type: Type<T>, callback: (event: T) => void, thisArg?: any) {
        let typeListener = this.typeListeners.find(e => e.type === type) as TypeListener<T>;

        if (!typeListener) {
            typeListener = {
                type: type,
                listeners: []
            };

            this.typeListeners.push(typeListener);
        }

        typeListener.listeners.push({
            callback: callback,
            thisArg: thisArg
        });
    }

    off<T extends BaseEvent>(type: Type<T>, callback: (event: T) => void) {
        let typeListener = this.typeListeners.find(e => e.type === type) as TypeListener<T>;

        if (typeListener) {
            typeListener.listeners = typeListener.listeners.filter(l => l.callback !== callback);

            if (typeListener.listeners.length === 0) {
                this.typeListeners = this.typeListeners.filter(tl => tl.type !== type);
            }
        }
    }

    broadcast<T extends BaseEvent>(event: T) {
        let typeListener = this.typeListeners.find((tl) => tl.type === event.constructor);

        if (!typeListener) {
            return;
        }

        for (let listener of typeListener.listeners) {
            listener.callback.call(listener.thisArg, event);
        }
    }
}