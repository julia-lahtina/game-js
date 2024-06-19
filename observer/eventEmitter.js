export class EventEmitter {
    #subscribers = {}

    subscribe(eventName, callback) {
        if (!this.#subscribers[eventName]) {
            this.#subscribers[eventName] = []
        }
        this.#subscribers[eventName].push(callback);
    }

    emit(eventName, data) {
        this.#subscribers[eventName]?.forEach(callback => {
            callback(data);
        });
    }

    unsubscribe() { };

}