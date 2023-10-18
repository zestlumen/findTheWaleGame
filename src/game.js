'use strict';

import { Field, itemType } from './field.js';
import * as sound from './sound.js';

export const Reason = Object.freeze({
    win: 'win',
    lose: 'lose',
    cancel: 'cancel',
});
//Builder Pattern
export class GameBuilder {
    gameDuration(duration) {
        this.gameDuration = duration;
        return this;
    }

    whaleCount(num) {
        this.whaleCount = num;
        return this;
    }

    jellyCount(num) {
        this.jellyCount = num;
        return this;
    }
    build() {
        return new Game(
            this.gameDuration,//
            this.whaleCount,//
            this.jellyCount
        );
    }
}

class Game {
    constructor(gameDuration, whaleCount, jellyCount) {
        this.gameDuration = gameDuration;
        this.whaleCount = whaleCount;
        this.jellyCount = jellyCount;

        this.gameTimer = document.querySelector('.game__timer');
        this.gameScore = document.querySelector('.game__score');
        this.gameBtn = document.querySelector('.game__button');
        this.gameBtn.addEventListener('click', () => {
            if (this.started) {
                this.stop(Reason.cancel);
            } else {
                this.start();
            }
        });
        this.gameField = new Field(whaleCount, jellyCount);
        this.gameField.setClickListener(this.onItemClick);

        this.started = false;
        this.score = 0;
        this.timer = undefined;
    }

    setGameStopListener(onGameStop) {
        this.onGameStop = onGameStop;
    }

    start() {
        this.started = true;
        this.initGame();
        this.showStopButton();
        this.showTimeAndScore();
        this.startGameTimer();
        sound.playBackground();
    }

    stop(reason) {
        this.started = false;
        this.stopGameTimer();
        this.hideGameButton();
        sound.stopBackground();
        this.onGameStop && this.onGameStop(reason);
    }

    onItemClick = (item) => { //event를 item으로 변경
        if (!this.started) {
            return;
        }
        if (item === itemType.whale) {
            this.score++;
            this.updateScoreBoard();
            if (this.score === this.whaleCount) {
                this.stop(Reason.win);
            }
        } else if (item === itemType.jelly) {
            this.stop(Reason.lose);
        }
    }

    showStopButton() {
        const icon = this.gameBtn.querySelector('.fa-solid');
        icon.classList.add('fa-stop');
        icon.classList.remove('fa-play');
        this.gameBtn.style.visibility = "visible";
    }

    hideGameButton() {
        this.gameBtn.style.visibility = "hidden";
    }

    showTimeAndScore() {
        this.gameTimer.style.visibility = 'visible';
        this.gameScore.style.visibility = 'visible';
    }

    startGameTimer() {
        let remainingTimeSec = this.gameDuration;
        this.updateTimerText(remainingTimeSec);
        this.timer = setInterval(() => {
            if (remainingTimeSec <= 0) {
                clearInterval(this.timer);
                this.stop(this.whaleCount === this.score ? Reason.win : Reason.lose);
                return;
            }
            this.updateTimerText(--remainingTimeSec);
        }, 1000);
    }

    stopGameTimer() {
        clearInterval(this.timer);
    }

    updateTimerText(time) {
        const minutes = Math.floor(time / 60);//0
        const seconds = time % 60;
        this.gameTimer.innerText = `${minutes}:${seconds}`;
    }

    initGame() {
        this.score = 0;
        this.gameScore.innerText = this.whaleCount;
        this.gameField.init();
    }

    updateScoreBoard() {
        this.gameScore.innerText = this.whaleCount - this.score;
    }

}