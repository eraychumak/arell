// imports.
import Score from "./classes/score.js";

// global game data.
const data = {
    canvas: {
        height: 720,
        width: window.innerWidth
    },
    version: "beta v1.7",
    obstacles: [],
    players: [],
    screen: "start",
    screens: new Map(),
    score: new Score(),
    welcome_dev:
        `
        Hello fellow developer or random user who
        stumbled across this section!

        Welcome to Arell, aimed to be a simple P5 game but to
        bring a ton of excitement and fun to the player.

        If you would like to support the development of this fun
        game, please visit: https://www.buymeacoffee.com/eraychumak
        `
};

// player settings choice data.
const settings = {
    dark: true,
    frame_rate: true,
    timer: true,
    highscore: true,
    inverted: false
};

// exports.
export {data, settings};