import { Game } from './game'

test('Game init', () => {
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

