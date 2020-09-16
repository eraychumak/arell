/**
 * Handle mechanics, physics and appearance of instanced obstacles.
 * @class
 * 
 * @param {integer} x
 */

// imports
import {data, settings} from "../data.js";

class Obstacle {

    constructor(x) {
        this.x = data.canvas.width / x;
        this.y = 0;
        this.height = data.canvas.height / 2;
        this.width = 5;
        this.velocity = {
            x: -5,
            y: 0
        };
        this.reset = () => {
            this.x = data.canvas.width / x;
            this.y = 0;
            this.height = data.canvas.height / 2;
            this.velocity.x = -20;
            this.velocity.y = 0;
        };
        this.img = p5.loadImage('../../assets/obstacles/true/main.png');
        data.obstacles.push(this);
    }

    spawn() {
        const main = {
            properties: [],
            shape: {
                properties: [
                    p5.rectMode(p5.CENTER),
                    p5.fill(settings.dark ? 250 : 40)
                ],
                main: [p5.image(this.img, this.x, this.y, this.width, this.height)]
            },
            text: {
                properties: [],
                main: []
            }
        }
        return main;
    }

    update() {
        this.x += this.velocity.x;
        data.players.forEach(player => {
            if (this.x < -player.width) {
                this.height = (data.canvas.height / 6) + Math.floor(p5.random(data.canvas.height / 2))
                if (player.y >= 0 && player.y <= data.canvas.height / 2) {
                    this.y = this.height / 2;
                    this.x = data.canvas.width;
                } else {
                    this.y = data.canvas.height - (this.height / 2);
                    this.x = data.canvas.width;
                }
            }
            if (player.y >= this.y - (this.height / 2) - player.cpd.h && player.y <= this.y + (this.height / 2) + player.cpd.h && player.x + (player.width / 2) >= this.x - (this.width / 2) && player.x - (player.width / 2) <= this.x + (this.width / 2)) {
                player.velocity.x = this.velocity.x;
            }
        });
        if (this.velocity.x > -20 && data.score.value % 2 === 0) this.velocity.x -= 0.01;
    }

}

// exports
export default Obstacle;