'use strict';

const whaleSound = new Audio('./sound/carrot_pull.mp3');
const alertSound = new Audio('./sound/alert.wav');
const bgSound = new Audio('./sound/bg.mp3');
const jellySound = new Audio('./sound/bug_pull.mp3');
const winSound = new Audio('./sound/game_win.mp3');

export function playWhale() {
    playSound(whaleSound);
}
export function playJelly() {
    playSound(jellySound);
}
export function playAlert() {
    playSound(alertSound);
}
export function playWin() {
    playSound(winSound);
}
export function playBackground() {
    playSound(bgSound);
}
export function stopBackground() {
    bgSound.pause();
}

function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}
