import { Game } from '../domain/game.js';
import { EventEmitter } from "../utils/observer/eventEmitter.js";
import { View } from "./view.js";

const eventEmitter = new EventEmitter();

const game = new Game(eventEmitter);

const view = new View(game);

view.startGame()

view.render();