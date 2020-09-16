/**
 * Creates a new start screen with given name.
 * Handles the functionality, states, data and appearance of instanced game screen.
 * @class
 * @augments Screen
 * 
 * @param {string} name
*/

// imports
import {data, settings} from "../data.js";
import Screen from "./screen.js";
import Sound from "../classes/sound_mgr.js";

// handles screen states, data and appearance.
class Game extends Screen {

    constructor(name) {
        super(name);
        this.paused = false;
        this.count = 1;
        this.timer = 0;
        this.frame_rate = 0;
    }

    preload() {
        new Sound(this.name, "ambient", "../../assets/sounds/game_screen.mp3", true);
        super.preload();
    }

    load() {
        this.timer = setInterval(() => {
            if (!this.paused) this.count += 1;
            this.frame_rate = p5.frameRate();
        }, 1000);
        super.load();
    }

    run() {
        if (!this.initialized) this.load();
        p5.background(settings.dark ? 40 : 150);
        if (settings.frame_rate) {
            p5.textSize(32);
            p5.text(`FPS: ${Math.floor(this.frame_rate)}`, data.canvas.width / 1.05, 50);
        }
        if (settings.timer) {
            p5.textSize(32);
            p5.text(`TIMER: ${Math.floor(this.count)}`, data.canvas.width / 1.2, 50);
        }
        if (settings.highscore) {
            p5.textSize(32);
            p5.fill(data.score.value > data.score.high ? "rgba(0, 255, 0, 1)" : "rgba(200, 0, 0, 1)");
            p5.text(`HIGHSCORE: ${Math.floor(data.score.high)}`, data.canvas.width - (data.canvas.width / 1.11), 50);
        }
        data.players.forEach(player => {
            player.spawn();
            player.update();
            data.score.show(player);
        });
        data.obstacles.forEach(obstacle => {
            obstacle.spawn();
            obstacle.update();
        });
        if (data.score.value > data.score.high) {
            data.score.high = data.score.value;
        }
        data.score.update();
    }

    load_controls() {
        data.players.forEach(p => p.load_controls());
        if (p5.keyCode === 27 || p5.keyCode === 80) {
            data.screens.pause.get("main").load();
            return data.screen = "pause";
        }
        if (p5.keyCode === 82) return data.screens.game.get("main").unload();
    }

    unload() {
        clearInterval(this.timer);
        if (data.score.value > data.score.high) data.score.high = data.score.value;
        data.screens.gameover.get("main").score = data.score.value;
        data.screens.gameover.get("main").count = this.count;
        data.score.reset();
        data.players.forEach(p => p.reset());
        data.obstacles.forEach(o => o.reset());
        this.count = 1;
        super.unload();
    }

}

// exports
export default new Game("game");