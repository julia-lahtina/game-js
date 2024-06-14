import { GameStatus } from './constants';
import { Game } from './game'

describe('Game tests', () => {

    let game;

    beforeEach(() => {
        game = new Game();
    })

    afterEach(() => {
        game.stop();
    })


    test('Check game initialization', () => {
        const game = new Game();

        game.setSettings({
            gridSize: {
                rows: 2,
                columns: 2
            },
        });

        const { gridSize } = game.settings;

        expect(gridSize.rows).toBe(2);
        expect(gridSize.columns).toBe(2);
    })

    test('Check start game', () => {
        const game = new Game();

        expect(game.status).toBe(GameStatus.pending);

        game.startGame()

        expect(game.status).toBe(GameStatus.inProgress);
    })

    test('Check players position', () => {
        for (let i = 0; i < 10; i++) {
            const game = new Game();

            game.setSettings({
                gridSize: {
                    rows: 4,
                    columns: 4
                },
            });

            game.startGame();

            expect(game.player1.position).not.toEqual(game.player2.position);
            expect(game.google.position).not.toEqual(game.player1.position);
            expect(game.google.position).not.toEqual(game.player2.position);
        }

    })

    test('check google position after jump', async () => {

        game.setSettings({
            gridSize: {
                rows: 4,
                columns: 4
            },
            jumpGoogleInterval: 120
        });

        game.startGame();

        const prevPosition = game.google.position;

        await delay(150);

        expect(prevPosition).not.toEqual(game.google.position);
    })

    test('check player moving validation in one row 3x1', async () => {
        for (let i = 0; i < 10; i++) {
            game = new Game();
            game.setSettings({
                gridSize: {
                    rows: 1,
                    columns: 3
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
        expect(prevPosition).not.toEqual(game.google.position);
    })


    function delay(ms) {
        return new Promise(r => setTimeout(r, ms))
    }
})
