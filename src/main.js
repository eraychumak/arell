'use strict';

/**
 * @file preloads, sets up and runs the whole game (the brain?).
 * @version v1.7
 * @author Eray Chumak <eraychumak_@outlook.com>
*/

// imports
import {data} from "./data.js";
import Player from "./classes/player.js";
import Obstacle from "./classes/obstacle.js";
import "./screens/mgr.js";

/** creates a new instance of p5 removing it from the global namespace. */
new p5(p5 => {

    window.p5 = p5;
    p5.disableFriendlyErrors = true;

    p5.preload = () => { for (screen in data.screens) data.screens[screen].get("main").preload(); }

    p5.setup = () => {
        p5.createCanvas(data.canvas.width, data.canvas.height);
        p5.textFont(p5.loadFont("../assets/fonts/aldrish.ttf"));
        new Player(5, 2);
        new Obstacle(1);
        new Obstacle(2);
        new Obstacle(3);
        new Obstacle(5);
    };

    p5.draw = () => data.screens[data.screen].get("main").run();
    p5.keyPressed = () => data.screens[data.screen].get("main").load_controls();

}, document.getElementById("game"));

console.log(data.welcome_dev);