export class EventEmitter {
    #events = {
        // 'start-game': [
        //     ()=>{}, ()=>{}
        // ]
    };

    on(eventName, callback) {
        if (!this.#events[eventName]) {
            this.#events[eventName] = [];
        }
        this.#events[eventName].push(callback);
    }

    emit(eventName, data) {
        this.#events[eventName]?.forEach((callback) => callback(data));
    }

    unsubscribe() { }
}
