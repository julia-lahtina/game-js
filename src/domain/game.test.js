import { Game } from "./game";
import { GameStatus } from "./constants";

describe('Game tests', () => {
    let game;

    beforeEach(() => {
        game = new Game();
    });

    afterEach(() => {
        game.stop();
    });

    test('Check game initialization', () => {
        const game = new Game();

        game.setSettings({
            gridSize: {
                rows: 2,
                columns: 2,
            },
        });

        const { gridSize } = game.settings;

        expect(gridSize.rows).toBe(2);
        expect(gridSize.columns).toBe(2);
    });

    test('Check start game', () => {
        const game = new Game();

        expect(game.status).toBe(GameStatus.pending);

        game.startGame();

        expect(game.status).toBe(GameStatus.inProgress);
    });

    test('Check players position', () => {
        for (let i = 0; i < 10; i++) {
            const game = new Game();

            game.setSettings({
                gridSize: {
                    rows: 4,
                    columns: 4,
                },
            });

            game.startGame();

            expect(game.player1.position).not.toEqual(game.player2.position);
            expect(game.google.position).not.toEqual(game.player1.position);
            expect(game.google.position).not.toEqual(game.player2.position);
        }
    });

    test('Check google position after jump', async () => {
        game.setSettings({
            gridSize: {
                rows: 4,
                columns: 4,
            },
            jumpGoogleInterval: 120
        });

        game.startGame();

        const prevPosition = game.google.position;

        await delay(150);

        expect(prevPosition).not.toEqual(game.google.position);
    });

    test('Check player moving validation in one row 3x1', async () => {
        // p1 p2 g | p1 g p2 | p2 g p1 | g p1 p2 | g p2 p1
        for (let i = 0; i < 10; i++) {
            game = new Game();

            game.setSettings({
                gridSize: {
                    rows: 1,
                    columns: 3,
                },
            });
            game.startGame();

            const prevPosition = game.google.position.clone();

            const deltaForPlayer1 = game.google.position.x - game.player1.position.x;

            if (Math.abs(deltaForPlayer1) === 2) {
                const deltaForPlayer2 = game.google.position.x - game.player2.position.x;
                if (deltaForPlayer2 > 0) {
                    game.movePlayer2Right();
                } else {
                    game.movePlayer2Left();
                }
                expect(game.score[1].points).toBe(0);
                expect(game.score[2].points).toBe(1);
            } else {
                if (deltaForPlayer1 > 0) {
                    game.movePlayer1Right();
                } else {
                    game.movePlayer1Left();
                }
                expect(game.score[1].points).toBe(1);
                expect(game.score[2].points).toBe(0);
            }

            expect(game.google.position).not.toEqual(prevPosition);
        }
    });

    test('Check player moving validation in one column 1x3', async () => {
        for (let i = 0; i < 10; i++) {
            game = new Game();

            game.setSettings({
                gridSize: {
                    rows: 3,
                    columns: 1,
                },
            });
            game.startGame();

            const prevPosition = game.google.position.clone();

            const deltaForPlayer1 = game.google.position.y - game.player1.position.y;

            if (Math.abs(deltaForPlayer1) === 2) {
                const deltaForPlayer2 = game.google.position.y - game.player2.position.y;
                if (deltaForPlayer2 > 0) {
                    game.movePlayer2Down();
                } else {
                    game.movePlayer2Up();
                }
                expect(game.score[1].points).toBe(0);
                expect(game.score[2].points).toBe(1);
            } else {
                if (deltaForPlayer1 > 0) {
                    game.movePlayer1Down();
                } else {
                    game.movePlayer1Up();
                }
                expect(game.score[1].points).toBe(1);
                expect(game.score[2].points).toBe(0);
            }

            expect(game.google.position).not.toEqual(prevPosition);
        }
    });

    test('Check finish game by max points to win', async () => {
        game.setSettings({
            gridSize: {
                rows: 3,
                columns: 1,
            },
            pointsToWin: 5
        });

        game.startGame();

        do {
            const deltaForPlayer1 = game.google.position.y - game.player1.position.y;
            if (Math.abs(deltaForPlayer1) === 2) {
                const deltaForPlayer2 = game.google.position.y - game.player2.position.y;
                if (deltaForPlayer2 > 0) {
                    game.movePlayer2Down();
                } else {
                    game.movePlayer2Up();
                }
            } else {
                if (deltaForPlayer1 > 0) {
                    game.movePlayer1Down();
                } else {
                    game.movePlayer1Up();
                }
            }
        } while (game.score[1].points !== game.settings.pointsToWin && game.score[2].points !== game.settings.pointsToWin);

        expect(game.status).toBe(GameStatus.finished);
    });
});


function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

