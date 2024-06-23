import { GameStatus } from "./constants.js";

export class Game {
    #settings = {
        gridSize: {
            rows: 5,
            columns: 5,
        },
        jumpGoogleInterval: 3000,
        maxPointsToWin: 10
    };

    #status = GameStatus.pending;

    #player1;

    #player2;

    #google;

    #googleJumpIntervalId;

    #score = {
        1: { points: 0 },
        2: { points: 0 },
    };

    #eventEmitter;

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

    get score() {
        return this.#score;
    }

    get eventEmitter() {
        return this.#eventEmitter;
    }

    constructor(eventEmitter) {
        this.#eventEmitter = eventEmitter;
    }

    startGame() {
        this.#status = GameStatus.inProgress;
        this.#createUnits();
        this.#googleJumpIntervalId = setInterval(() => {
            this.#moveGoogleToRandomPosition();
        }, this.#settings.jumpGoogleInterval);
    }

    stop() {
        clearInterval(this.#googleJumpIntervalId);
    }

    finishGame() {
        clearInterval(this.#googleJumpIntervalId);
        this.#google.position = new Position(0, 0);
        this.#status = GameStatus.finished;
    }

    setSettings(settings = {}) {
        this.#settings = { ...this.#settings, gridSize: { ...this.#settings.gridSize, ...settings.gridSize }, ...settings };
    }

    movePlayer1Right() {
        this.#movePlayer(this.#player1, this.#player2, { x: 1 });
        this.eventEmitter.emit('positions-updated', {})
    }

    movePlayer1Left() {
        this.#movePlayer(this.#player1, this.#player2, { x: -1 });
        this.eventEmitter.emit('positions-updated', {})
    }

    movePlayer1Up() {
        this.#movePlayer(this.#player1, this.#player2, { y: -1 });
        this.eventEmitter.emit('positions-updated', {})
    }

    movePlayer1Down() {
        this.#movePlayer(this.#player1, this.#player2, { y: 1 });
        this.eventEmitter.emit('positions-updated', {})
    }

    movePlayer2Right() {
        this.#movePlayer(this.#player2, this.#player1, { x: 1 });
        this.eventEmitter.emit('positions-updated', {})
    }

    movePlayer2Left() {
        this.#movePlayer(this.#player2, this.#player1, { x: -1 });
        this.eventEmitter.emit('positions-updated', {})
    }

    movePlayer2Up() {
        this.#movePlayer(this.#player2, this.#player1, { y: -1 });
        this.eventEmitter.emit('positions-updated', {})
    }

    movePlayer2Down() {
        this.#movePlayer(this.#player2, this.#player1, { y: 1 });
        this.eventEmitter.emit('positions-updated', {})
    }

    #getRandomPosition(exceptionPositions = []) {
        let x;
        let y;

        do {
            x = RandomNumber.getRandomNumber(this.#settings.gridSize.columns);
            y = RandomNumber.getRandomNumber(this.#settings.gridSize.rows);
        } while (exceptionPositions.some((el) => el.x === x && el.y === y));

        return new Position(x, y);
    }

    #moveGoogleToRandomPosition() {
        const exceptionPositions = [this.#player1.position, this.#player2.position];
        if (this.#google) {
            exceptionPositions.push(this.#google.position);
        }
        this.#google = new Google(this.#getRandomPosition(exceptionPositions));

        this.eventEmitter.emit('positions-updated', {})
    }

    #createUnits() {
        this.#player1 = new Player(this.#getRandomPosition(), 1);
        this.#player2 = new Player(this.#getRandomPosition([this.#player1.position]), 2);
        this.#moveGoogleToRandomPosition();
    }

    #checkIsPlayerOnBorder(player, moveInfo) {
        const positionCopy = player.position.clone();

        if (moveInfo.x) positionCopy.x += moveInfo.x;
        if (moveInfo.y) positionCopy.y += moveInfo.y;

        // return positionCopy.x < 1
        //     || positionCopy.y < 1
        //     || positionCopy.x > this.#settings.gridSize.columns
        //     || positionCopy.y > this.#settings.gridSize.rows;

        if (positionCopy.x < 1 || positionCopy.x > this.#settings.gridSize.columns) return true;
        if (positionCopy.y < 1 || positionCopy.y > this.#settings.gridSize.rows) return true;

        return false;
    }

    #checkDidPlayersOverlap(currentPlayer, otherPlayer, moveInfo) {
        const positionCopy = currentPlayer.position.clone();

        if (moveInfo.x) positionCopy.x += moveInfo.x;
        if (moveInfo.y) positionCopy.y += moveInfo.y;

        return positionCopy.equal(otherPlayer.position);
    }

    #checkPlayerDidCatchGoogle(player) {
        return player.position.equal(this.#google.position);
    }

    #updateScore(player) {
        this.#score[player.id].points++;
    }

    #movePlayer(player, otherPlayer, moveInfo) {
        const isOnBorder = this.#checkIsPlayerOnBorder(player, moveInfo);
        const isOnDifferentPlayer = this.#checkDidPlayersOverlap(player, otherPlayer, moveInfo);

        if (isOnBorder || isOnDifferentPlayer) return;

        if (moveInfo.x) {
            player.position.x += moveInfo.x;
        }

        if (moveInfo.y) {
            player.position.y += moveInfo.y;
        }

        const isOnGoogle = this.#checkPlayerDidCatchGoogle(player);

        if (isOnGoogle) {
            this.#updateScore(player);
            if (this.#score[player.id].points === this.#settings.pointsToWin) {
                this.finishGame();
                return;
            }
            this.#moveGoogleToRandomPosition();
        }
    }

}

export class Unit {
    constructor(position) {
        this.position = position;
    }
}

export class Player extends Unit {
    constructor(position, id) {
        super(position);
        this.id = id;
    }
}

export class Google extends Unit {
    constructor(position) {
        super(position);
    }
}

export class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    clone() {
        return new Position(this.x, this.y);
    }

    equal(position) {
        const { x, y } = position;
        return this.x === x && this.y === y;
    }
}

export class RandomNumber {
    static getRandomNumber(max) {
        return Math.floor(Math.random() * max + 1);
    }
}
