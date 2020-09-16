/**
 * Handles all sound instances within game.
 * @class 
 * 
 * @param {string} screen
 * @param {string} name
 * @param {string} file
 * @param {boolean} loop
 */

// imports
import {data} from "../data.js";

class Sound {
    constructor(screen, name, file, loop) {
        this.name = name;
        this.file = p5.loadSound(file);
        this.file.setLoop(loop);
        data.screens[screen].get("sounds").set(this.name, this.file);
    }
}

// exports
export default Sound;