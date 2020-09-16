/**
 * Handle mechanics, physics and appearance of instanced players.
 * @class
 *
 * @param {integer} x
 * @param {integer} y
 */

// imports
import {data, settings} from "../data.js";

class Player {

    /** cpd = center point distance. w, h = width, height. */
    constructor(x, y) {
        this.x = Math.floor(data.canvas.width) / Math.floor(x);
        this.y = Math.floor(data.canvas.height) / Math.floor(y);
        this.up = [38, 90];
        this.down = [40, 77];
        this.height = 30;
        this.width = 60;
        this.cpd = {
            w: this.width / 2,
            h: this.height / 2
        };
        this.velocity = {
            x: 0,
            y: 0
        };
        this.reset = () => {
            this.x = Math.floor(data.canvas.width) / Math.floor(x);
            this.y = Math.floor(data.canvas.height) / Math.floor(y);
            this.velocity.x = 0;
            this.velocity.y = 0;
        };
        this.img = p5.loadImage('assets/characters/arrow.png');
        data.players.push(this);
    }

    spawn() {
        const appearance = {
            properties: [],
            shape: {
                properties: [
                    p5.imageMode(p5.CENTER),
                    this.img.resize(50, 0),
                    p5.fill(settings.dark ? 250 : 40)
                ],
                main: [p5.image(this.img, this.x + 10, this.y)]
            },
            text: {
                properties: [],
                main: []
            }
        };
        return appearance;
    }

    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.y = p5.constrain(this.y, this.height / 2, data.canvas.height - this.height / 2);
        if (this.x + (this.width / 2) <= 0) data.screen = "gameover";
        this.x < data.canvas.width / 2 ? this.velocity.x = 0.5 : this.velocity.x = 0;
        data.screens.game.get("sounds").get("ambient").amp(p5.constrain(p5.map(this.x, 0, data.canvas.width / 2, 0.5, 0.6), 0, 1));
        data.screens.game.get("sounds").get("ambient").rate(p5.constrain(p5.map(this.x, 0, data.canvas.width / 2, 0, 1), 0, 1));
    }

    load_controls() {
        this.up.forEach(up => { if (p5.keyCode === up) this.velocity.y = -7; });
        this.down.forEach(down => { if (p5.keyCode === down) this.velocity.y = 7; });
    }

}

// exports
export default Player;