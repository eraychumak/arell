/**
 * Default screen object structure.
 * @class 
 * 
 * @param {string} name
 */

// imports
import {data} from "../data.js";
import Sound from "../classes/sound_mgr.js";

class Screen {

    constructor(name) {
        this.name = name;
        this.initialized = false;
        this.buttons = [];
        this.animations = [];
        data.screens[this.name] = new Map();
        data.screens[this.name].set("main", this);
        data.screens[this.name].set("buttons", new Map());
        data.screens[this.name].set("sounds", new Map());
        data.screens[this.name].set("animations", new Map());
    }

    preload() {
        new Sound(this.name, "transition", "assets/sounds/transition_ambient.flac", false);
    }

    load() {
        data.screens[this.name].get("buttons").forEach(button => this.buttons.push(button));
        data.screens[this.name].get("animations").forEach(animation => this.animations.push(animation));
        data.screens[this.name].get("sounds").get("ambient").play();
        data.screens[this.name].get("sounds").get("transition").play();
        this.initialized = true;
    }

    unload() {
        data.screens[this.name].get("sounds").get("ambient").stop();
        this.buttons = [];
        this.animations = [];
        this.initialized = false;
    }

}

// exports
export default Screen;