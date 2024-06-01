import { GameStatus } from "./constants";

export class Game {
    #settings;
    #status = GameStatus.pending;

    set settings(settings) {

        this.#settings = settings
    }

    get settings() {
        return this.#settings;
    }

    get status() {
        return this.#status;
    }

    constructor() {

    }

    startGame() {
        this.#status = GameStatus.inProgress;
    }
}