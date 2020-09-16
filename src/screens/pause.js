/**
 * Creates a new start screen with given name.
 * Handles the functionality, states, data and appearance of instanced pause screen.
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

class Pause extends Screen {

    preload() {
        new Button(this.name, "quit", 2, 1.2, 50, 200, "[Q] - QUIT");
        new Sound(this.name, "ambient", ".../../assets/sounds/default_ambient.mp3", true);
        super.preload();
    }

    load() {
        data.screens.game.get("main").paused = true;
        data.screens.game.get("sounds").get("ambient").pause();
        super.load();
    }

    run() {
        if (!this.initialized) this.load();
        p5.background(settings.dark ? "rgba(40, 40, 40, 0.1)" : "rgba(150, 150, 150, 0.1)");
        // header.
        p5.fill(settings.dark ? 250 : 40);
        p5.textSize(100);
        p5.text("GAME PAUSED", data.canvas.width / 2, data.canvas.height / 2);
        // version.
        p5.fill(settings.dark ? 250 : 40);
        p5.textSize(20);
        p5.text(data.version, data.canvas.width / 12, data.canvas.height / 1.03);
        this.buttons.forEach(button => button.show());
    }

    load_controls() {
        if (p5.keyCode === 27 || p5.keyCode === 80) {
            data.screens.pause.get("main").unload();
            data.screen = "game";
        }
        if (p5.keyCode === 81) {
            data.screens.game.get("main").unload();
            data.screens.pause.get("main").unload();
            data.screens.game.get("sounds").get("ambient").stop();
            data.screen = "start";
        }
    }

    unload() {
        data.screens.game.get("main").paused = false;
        data.screens.game.get("sounds").get("ambient").play();
        super.unload();
    }

}

// exports
export default new Pause("pause");