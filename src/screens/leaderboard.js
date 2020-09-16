/**
 * Creates a new start screen with given name.
 * Handles the functionality, states, data and appearance of instanced leaderboard screen.
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

class Leaderboard extends Screen {

    preload() {
        new Button(this.name, "back", 1.25, 1.4, 50, 200, "[B] - BACK");
        new Sound(this.name, "ambient", "assets/sounds/default_ambient.mp3", true);
        super.preload();
    }

    load() {
        data.screens.start.get("main").unload();
        super.load();
    }

    run() {
        if (!this.initialized) this.load();
        p5.background(settings.dark ? "rgba(40, 40, 40, 0.1)" : "rgba(150, 150, 150, 0.1)");
        // header
        p5.fill(settings.dark ? 250 : 0);
        p5.textSize(50);
        p5.text("CURRENTLY UNDER DEVELOPMENT.", data.canvas.width / 2, data.canvas.height / 2);
        this.buttons.forEach(button => button.show());
    }

    load_controls() {
        if (p5.keyCode === 66) {
            data.screens.leaderboard.get("main").unload();
            return data.screen = "start";
        }
    }

}

// exports
export default new Leaderboard("leaderboard");