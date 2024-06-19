import { Game } from './game.js';

const game = new Game();

game.setSettings({
    gridSize: {
        rows: 3,
        columns: 3
    },
    jumpGoogleInterval: 1000
});

game.startGame();

game.subscribe('positions-updated', render)

const tableGridElement = document.getElementById('table-grid');


render();










function render() {

    tableGridElement.innerHTML = '';

    for (let x = 1; x <= game.settings.gridSize.rows; x++) {
        const newTrElement = document.createElement('tr');
        tableGridElement.appendChild(newTrElement);

        for (let y = 1; y <= game.settings.gridSize.columns; y++) {
            const newTdElement = document.createElement('td');
            newTrElement.appendChild(newTdElement);

            if (game.google.position.x === x && game.google.position.y === y) {
                const googleElement = document.createElement('img');
                googleElement.src = './assets/google.png';
                googleElement.id = 'google';
                googleElement.alt = 'google';
                newTdElement.appendChild(googleElement);
            }

            if (game.player1.position.x === x && game.player1.position.y === y) {
                const player1Element = document.createElement('img');
                player1Element.src = './assets/player1.png';
                player1Element.id = 'player1';
                player1Element.alt = 'player1';
                newTdElement.appendChild(player1Element);
            }

            if (game.player2.position.x === x && game.player2.position.y === y) {
                const player2Element = document.createElement('img');
                player2Element.src = './assets/player2.png';
                player2Element.id = 'player2';
                player2Element.alt = 'player2';
                newTdElement.appendChild(player2Element);
            }
        }
    }

}