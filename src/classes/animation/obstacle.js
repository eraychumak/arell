// imports
import {data, settings} from "../../data.js";

let toggle = true;

// handles mechanics, physics & appearance of all obstacles.
class Animation {

    constructor(screen, name, x) {
        this.screen = screen;
        this.name = name;
        this.x = data.canvas.width / x;
        this.y = 0;
        this.height = data.canvas.height / 2;
        this.width = 5;
        this.velocity = {
            x: -15,
            y: 0
        };
        data.screens[screen].get("animations").set(this.name, this);
    }

    spawn() {
        const main = {
            properties: [],
            shape: {
                properties: [
                    p5.rectMode(p5.CENTER),
                    p5.fill(settings.dark ? 255 : 20)
                ],
                main: [p5.rect(this.x, this.y, this.width, this.height)]
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
        if (this.x < 0) {
            this.x = data.canvas.width;
            if (toggle) {
                this.height = data.canvas.height - p5.random(data.canvas.height / 2);
                this.y = data.canvas.height;
                toggle = false;
            } else {
                this.height = (data.canvas.height / 2) + p5.random(data.canvas.height / 2);
                this.y = 0;
                toggle = true;
            }
        }
    }

}

// exports
export default Animation;