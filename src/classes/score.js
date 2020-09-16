/**
 * Handles score mechanics and appearance.
 * @class
 */

// imports
import {settings} from "../data.js";

class Score {

    constructor() {
        this.value = 0;
        this.multiplier = 1;
        this.high = 0;
    }

    show(player) {
        const appearance = {
            properties: [],
            shape: {
                properties: [],
                main: []
            },
            text: {
                properties: [
                    p5.fill(settings.dark ? 255 : 20),
                    p5.textSize(15),
                    p5.textAlign(p5.CENTER)
                ],
                main: [p5.text(this.value, player.x, player.y - player.height)]
            }
        };
        return appearance;
    }

    reset() { this.value = 0; }
    update() { this.value += this.multiplier; }

}

// exports
export default Score;