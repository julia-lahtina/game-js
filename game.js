import { GameStatus } from "./constants";

export class Game {
    #settings = {
        gridSize: {
            rows: 2,
            columns: 2
        },
        jumpGoogleInterval: 100,
    };

    #status = GameStatus.pending;

    #player1;

    #player2;

    #google;

    #googleJumpIntervalId;

    #score = {
        1: { points: 0 },
        2: { points: 0 },
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

    get google() {
        return this.#google;
    }


    constructor() {

    }

    startGame() {
        this.#status = GameStatus.inProgress;
        this.#createUnits();
        this.#googleJumpIntervalId = setInterval(() => {
            this.#moveGoogleToRandomPosition();
        }, this.#settings.jumpGoogleInterval)
    }

    stop() {
        clearInterval(this.#googleJumpIntervalId)
    }

    setSettings(settings = {}) {
        this.#settings = { ...this.#settings, gridSize: { ...this.#settings.gridSize, ...settings.gridSize }, ...settings };
    }

    movePlayer1Right() {

    }
    movePlayer1Left() {

    }
    movePlayer1Up() {

    }
    movePlayer1Down() {

    }


    movePlayer2Right() {

    }
    movePlayer2Left() {

    }
    movePlayer2Up() {

    }
    movePlayer2Down() {

    }

    #getRandomPosition(exceptionPosition = []) {
        let x;
        let y;

        do {
            x = RandomNumber.getRandomNumber(this.#settings.gridSize.columns);
            y = RandomNumber.getRandomNumber(this.#settings.gridSize.rows);
        } while (exceptionPosition.some(el => el.x === x && el.y === y))

        return new Position(x, y)
    }

    #moveGoogleToRandomPosition() {
        const exceptionPosition = [this.#player1.position, this.#player2.position];
        if (this.#google) {
            exceptionPosition.push(this.#google.position)
        }
        this.#google = new Google(this.#getRandomPosition(exceptionPosition))
    }

    #createUnits() {
        this.#player1 = new Player(this.#getRandomPosition(), 1);
        this.#player2 = new Player(this.#getRandomPosition([this.#player1.position]), 2);
        this.#moveGoogleToRandomPosition()
    }


}


export class Unit {
    constructor(position) {
        this.position = position;
    }
}
export class Player extends Unit {
    constructor(position, id) {
        super(position)
        this.id = id;
    }
}

export class Google extends Unit {
    constructor(position) {
        super(position)
    }
}

export class RandomNumber {
    static getRandomNumber(max) {
        return Math.floor(Math.random() * max + 1);
    }
}

export class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    clone() {
        return new Position(this.x, this.y)
    }

    equal(position) {
        const { x, y } = position;
        return this.x === x && this.y === y;
    }
}

