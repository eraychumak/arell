/**
 * Creates a new start screen with given name.
 * Handles the functionality, states, data and appearance of instanced options screen.
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

class Options extends Screen {

    preload() {
        new Button(this.name, "back", 1.25, 1.1, 50, 250, "[B] - BACK");
        new Button(this.name, "dark", 4, 2, 50, 250, "[D] - DARK");
        new Button(this.name, "light", 2.28, 2, 50, 250, "[L] - LIGHT");
        new Button(this.name, "fps", 1.6, 2, 50, 250, "[F] - FPS");
        new Button(this.name, "timer", 4, 1.5, 50, 250, "[T] - TIMER");
        new Button(this.name, "highscore", 2.28, 1.5, 50, 250, "[H] - HIGHSCORE");
        new Sound(this.name, "ambient", ".../../assets/sounds/default_ambient.mp3", true);
        super.preload();
    }

    load() {
        data.screens.start.get("main").unload();
        super.load();
    }

    run() {
        if (!this.initialized) this.load();
        p5.background(settings.dark ? "rgba(40, 40, 40, 0.1)" : "rgba(150, 150, 150, 0.1)");
        this.buttons.forEach(button => button.show());
        p5.fill(settings.dark ? 250 : 40);
        p5.textSize(100);
        p5.text("OPTIONS", data.canvas.width / 2, data.canvas.height / 4);
        Object.create = {
            properties: [],
            shape: {
                properties: [
                    p5.rectMode(p5.CENTER),
                    p5.fill(settings.dark ? 250 : 40),
                    p5.stroke(settings.dark ? 40 : 250)
                ],
                main: [
                    p5.rect(data.canvas.width / 1.25, data.canvas.height / 1.8, 250, 400, 10),
                    p5.line(data.canvas.width / 1.25 - 125, data.canvas.height / 2.7, (data.canvas.width / 1.25) + 125, data.canvas.height / 2.7)
                ]
            },
            text: {
                properties: [
                    p5.textSize(20),
                    p5.fill(settings.dark ? 40 : 250),
                    p5.noStroke()
                ],
                main: [
                    p5.text("CURRENT SETTINGS", data.canvas.width / 1.25, data.canvas.height / 3),
                    p5.text(`DARK MODE\n${settings.dark ? "ON" : "OFF"}`, data.canvas.width / 1.25, data.canvas.height / 2.35),
                    p5.text(`FPS\n${settings.frame_rate  ? "ON" : "OFF"}`, data.canvas.width / 1.25, data.canvas.height / 1.85),
                    p5.text(`TIMER\n${settings.timer  ? "ON" : "OFF"}`, data.canvas.width / 1.25, data.canvas.height / 1.53),
                    p5.text(`HIGHSCORE\n${settings.highscore  ? "ON" : "OFF"}`, data.canvas.width / 1.25, data.canvas.height / 1.3)
                ]
            }
        };
    }

    load_controls() {
        if (p5.keyCode === 66) {
            data.screens[this.name].get("sounds").get("transition").play();
            data.screens.options.get("main").unload();
            return data.screen = "start";
        }
        if (p5.keyCode === 68) {
            data.screens[this.name].get("sounds").get("transition").play();
            if (!settings.dark) return settings.dark = true;
        }
        if (p5.keyCode === 76) {
            data.screens[this.name].get("sounds").get("transition").play();
            if (settings.dark) return settings.dark = false;
        }
        if (p5.keyCode === 70) {
            data.screens[this.name].get("sounds").get("transition").play();
            settings.frame_rate ? settings.frame_rate = false : settings.frame_rate = true;
        }
        if (p5.keyCode === 84) {
            data.screens[this.name].get("sounds").get("transition").play();
            settings.timer ? settings.timer = false : settings.timer = true;
        }
        if (p5.keyCode === 72) {
            data.screens[this.name].get("sounds").get("transition").play();
            settings.highscore ? settings.highscore = false : settings.highscore = true;
        }
    }

}

// exports
export default new Options("options");