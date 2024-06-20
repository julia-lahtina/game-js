import { Game } from './game.js';
import { EventEmitter } from "./observer/eventEmitter.js";
import { View } from "./view.js";

const eventEmitter = new EventEmitter();

const game = new Game(eventEmitter);

const view = new View(game);

view.startGame()

view.render();