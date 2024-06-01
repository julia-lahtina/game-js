import { GameStatus } from './constants';
import { Game } from './game'

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

