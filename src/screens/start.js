/**
 * Creates a new start screen with given name.
 * Handles the functionality, states, data and appearance of instanced start screen.
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
import Animation from "../classes/animation/obstacle.js";

class Start extends Screen {

    preload() {
        new Button(this.name, "start", 3, 1.6, 50, 250, "[S] | START");
        new Button(this.name, "leaderboard", 2, 1.6, 50, 250, "[L] | LEADERBOARD");
        new Button(this.name, "options", 1.5, 1.6, 50, 250, "[O] | OPTIONS");
        new Sound(this.name, "ambient", "../../assets/sounds/default_ambient.mp3", true);
        new Animation(this.name, "one", 1);
        new Animation(this.name, "two", 3);
        super.preload();
    }

    run() {
        if (!this.initialized) this.load();
        p5.background(settings.dark ? 40 : 150);
        this.animations.forEach(a => { a.spawn(); a.update(); });
        // header
        p5.fill(settings.dark ? 255 : 0);
        p5.textSize(100);
        p5.text("ARELL", data.canvas.width / 2, data.canvas.height / 4);
        // version
        p5.fill(settings.dark ? 255 : 0);
        p5.textSize(20);
        p5.text(data.version, data.canvas.width / 12, data.canvas.height / 1.03);
        this.buttons.forEach(button => button.show());
    }

    load_controls() {
        if (p5.keyCode === 83) {
            data.screens.start.get("main").unload();
            data.screen = "game";
        }
        if (p5.keyCode === 79) return data.screen = "options";
        if (p5.keyCode === 76) return data.screen = "leaderboard";
    }

}

// exports
export default new Start("start");