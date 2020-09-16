/**
 * Creates a new start screen with given name.
 * Handles the functionality, states, data and appearance of instanced gameover screen.
 * @class
 * @augments Screen
 * 
 * @param {string} name
 */

// imports
import {data, settings} from "../data.js";
import Screen from "./screen.js";
import Button from "../classes/button.js";
import Sound from "../classes/sound_mgr.js";

class Gameover extends Screen {

    constructor(name) {
        super(name);
        this.count;
        this.score;
    }

    preload() {
        new Button(this.name, "quit", 3, 1.2, 50, 250, "[Q] - QUIT");
        new Button(this.name, "restart", 1.5, 1.2, 50, 250, "[R] - RESTART");
        new Sound(this.name, "ambient", "../../assets/sounds/gameover_screen.wav", true);
        super.preload();
    }

    load() {
        data.screens.game.get("main").unload();
        super.load();
    }

    run() {
        if (!this.initialized) this.load();
        p5.background(settings.dark ? 40 : 150);
        // header
        p5.fill(settings.dark ? 250 : 40);
        p5.textSize(100);
        p5.text("GAMEOVER", data.canvas.width / 2, data.canvas.height / 4);
        // result
        p5.fill(settings.dark ? 250 : 40);
        p5.textSize(32);
        p5.text(`FINAL SCORE = ${this.score}`, data.canvas.width / 2, data.canvas.height / 2);
        p5.text(`LASTED FOR ${this.count} SECONDS`, data.canvas.width / 2, data.canvas.height / 1.7);
        this.buttons.forEach(button=> button.show());
    }

    load_controls() {
        if (p5.keyCode === 81) {
            data.screens.gameover.get("main").unload();
            data.screen = "start";
        }
        if (p5.keyCode === 82) {
            data.screens.gameover.get("main").unload();
            data.screen = "game";
        }
    }

}

// exports
export default new Gameover("gameover");