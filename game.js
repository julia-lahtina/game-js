import { GameStatus } from "./constants";

export class Game {
    #settings = {
        gridSize: {
            rows: 2,
            columns: 2
        }
    };

    #status = GameStatus.pending;

    #player1;

    #player2;

    set settings(settings) {

        this.#settings = settings
    }

    get settings() {
        return this.#settings;
    }

    get status() {
        return this.#status;
    }

    get player1() {
        return this.#player1;
    }

    get player2() {
        return this.#player2;
    }

    constructor() {
        this.#player1 = new Player(this.#getPlayerPosition());
        this.#player2 = new Player(this.#getPlayerPosition([this.#player1.position, this.#player1.position]));
    }

    startGame() {
        this.#status = GameStatus.inProgress;
    }

    #getPlayerPosition(exceptionPosition = []) {
        let x;
        let y;

        do {
            x = this.#getRandomNumber(this.#settings.gridSize.columns);
            y = this.#getRandomNumber(this.#settings.gridSize.rows);
        } while (exceptionPosition.some(el => el.x === x && el.y === y))

        return {
            x, y
        }
    }

    #getRandomNumber(max) {
        return Math.floor(Math.random() * max + 1);
    }
}


export class Player {
    constructor(position) {
        this.position = position;
    }
}