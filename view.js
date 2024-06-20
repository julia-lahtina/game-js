export class View {
    #tableGridElement;
    #scoreElement;
    #game;

    constructor(game) {
        this.#tableGridElement = document.getElementById('table-grid');
        this.#scoreElement = document.getElementById('score');
        this.#game = game;
        this.#controlInt();
    }

    startGame() {
        this.#game.startGame();

        this.#game.eventEmitter.on('positions-updated', this.render.bind(this));
    }

    render() {
        this.#tableGridElement.innerHTML = '';

        for (let y = 1; y <= this.#game.settings.gridSize.rows; y++) {
            const newTrElement = document.createElement('tr');
            this.#tableGridElement.appendChild(newTrElement);

            for (let x = 1; x <= this.#game.settings.gridSize.columns; x++) {
                const newTdElement = document.createElement('td');
                newTrElement.appendChild(newTdElement);

                if (this.#game.google.position.x === x && this.#game.google.position.y === y) {
                    const googleElement = document.createElement('img');
                    googleElement.src = './assets/google.png';
                    googleElement.id = 'google';
                    googleElement.alt = 'google-img';
                    newTdElement.appendChild(googleElement);
                }

                if (this.#game.player1.position.x === x && this.#game.player1.position.y === y) {
                    const player1Element = document.createElement('img');
                    player1Element.src = './assets/player1.png';
                    player1Element.id = 'player1';
                    player1Element.alt = 'player1-img';
                    newTdElement.appendChild(player1Element);
                }

                if (this.#game.player2.position.x === x && this.#game.player2.position.y === y) {
                    const player2Element = document.createElement('img');
                    player2Element.src = './assets/player2.png';
                    player2Element.id = 'player2';
                    player2Element.alt = 'player2-img';
                    newTdElement.appendChild(player2Element);
                }
            }
        }

        this.#scoreElement.innerHTML = `Score: Player1-${this.#game.score[1].points}, Player2-${this.#game.score[2].points}`;
    }

    #controlInt() {
        window.addEventListener('keydown', (event) => {
            switch (event.code) {
                case 'ArrowUp':
                    this.#game.movePlayer1Up()
                    break;
                case 'ArrowDown':
                    this.#game.movePlayer1Down()
                    break;
                case 'ArrowRight':
                    this.#game.movePlayer1Right()
                    break;
                case 'ArrowLeft':
                    this.#game.movePlayer1Left()
                    break;
                case 'KeyW':
                    this.#game.movePlayer2Up()
                    break;
                case 'KeyS':
                    this.#game.movePlayer2Down()
                    break;
                case 'KeyD':
                    this.#game.movePlayer2Right()
                    break;
                case 'KeyA':
                    this.#game.movePlayer2Left()
                    break;
                default:
                    break;
            }
        })
    }
}
