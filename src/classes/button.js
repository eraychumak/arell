/**
 * Handles the appearance and functionality of instanced buttons.
 * @class 
 * 
 * @param {string} name
 * @param {integer} x
 * @param {integer} y
 * @param {integer} height
 * @param {integer} width
 * @param {string} content
 */

// imports
import {data, settings} from "../data.js";

class Button {

    constructor(screen, name, x, y, height, width, content) {
        this.name = name;
        this.x = data.canvas.width / x;
        this.y = data.canvas.height / y;
        this.height = height;
        this.width = width;
        this.content = content;
        data.screens[screen].get("buttons").set(this.name, this);
    }

    show() {
        const main = {
            properties: [],
            shape: {
                properties: [
                    p5.fill(settings.dark ? 250 : 40),
                    p5.rectMode(p5.CENTER)
                ],
                main: [
                    p5.rect(this.x, this.y + 5, this.width, this.height, 10),
                    p5.rect(this.x, this.y, this.width, this.height, 10)
                ],
            },
            text: {
                properties: [
                    p5.fill(settings.dark ? 40 : 250),
                    p5.textSize(20),
                    p5.textAlign(p5.CENTER)
                ],
                main: [p5.text(this.content, this.x, this.y + (this.height / 6))]
            }
        };
        return main;
    }

}

// exports
export default Button;