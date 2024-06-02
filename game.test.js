import { GameStatus } from './constants';
import { Game, Player } from './game'

test('Check game initialization', () => {
    const game = new Game();
    game.settings = {
        gridSize: {
            rows: 2,
            columns: 2
        }
    }
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

        game.settings = {
            gridSize: {
                rows: 4,
                columns: 4
            }
        }

        expect(game.player1.position).not.toEqual(game.player2.position);
    }

})

