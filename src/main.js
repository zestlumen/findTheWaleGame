'use strict';

import PopUp from './popup.js';
import * as sound from './sound.js';
import { GameBuilder, Reason } from './game.js';

const gameFinishBanner = new PopUp();
const game = new GameBuilder()
    .gameDuration(10)
    .whaleCount(7)
    .jellyCount(7)
    .build();
//정확히 어떤 값 설정하는지 보기 쉬움

game.setGameStopListener(reason => {
    let message;
    switch(reason){
        case Reason.cancel:
            message = 'Replay❓❕';
            sound.playAlert();
            break;
        case Reason.win:
            message = 'YOU WON🎉';
            sound.playWin();
            break;
        case Reason.lose:
            message = 'YOU LOST😵';
            sound.playJelly();
            break;
        default:
            throw new Error('not valid reason');
    }
    gameFinishBanner.showWithText(message);
    const elements = document.querySelectorAll('.whale,.jelly');
    elements.forEach(element=>{
        element.classList.add('disabled');
    });
})

gameFinishBanner.setClickListener(() => {
    game.start();
});

// const CARROT_COUNT = 10;
// const BUG_COUNT = 20;
// const GAME_DURATION_SEC = 5;

//------------game Class-----------------
// import * as sound from './sound.js';
// import Field from './field.js';

// const gameTimer = document.querySelector('.game__timer');
// const gameScore = document.querySelector('.game__score');
// const gameBtn = document.querySelector('.game__button');
// gameBtn.addEventListener('click', () => {

//     if (started) {
//         stopGame();
//     } else {
//         startGame();
//     }
// });

// let started = false;
// let score = 0;
// let timer = undefined;

// function startGame() {
//     started = true;
//     initGame();
//     showStopButton();
//     showTimeAndScore();
//     startGameTimer();
//     //playSound(bgSound);
//     sound.playBackground();
// }

// function stopGame() {
//     started = false;
//     stopGameTimer();
//     hideGameButton();
//     //showPopupWithText('REPLAY?');
//     gameFinishBanner.showWithText('REPLAY?');
//     //playSound(alertSound);
//     sound.playAlert();
//     //stopSound(bgSound);
//     sound.stopBackground();
// }

// function finishGame(win) {
//     started = false;
//     hideGameButton();
//     stopGameTimer();
//     sound.stopBackground();
//     //stopSound(bgSound);
//     if (win) {
//         //playSound(winSound);
//         sound.playWin();
//     } else {
//         //playSound(bugSound);
//         sound.playBug();
//     }
//     gameFinishBanner.showWithText(win ? 'YOU WON🎉' : 'YOU LOST😵');
// }


// const gameField = new Field(CARROT_COUNT, BUG_COUNT);
// gameField.setClickListener(onItemClick);

//function onItemClick(item) { //event를 item으로 변경
    //     if (!started) {
    //         return;
    //     }
    //     console.log(item);
    //     // const target = event.target;
    //     if (item === 'carrot') {
    //         debugger;
    //         //target.remove();
    //         score++;
    //         //playSound(carrotSound);
    //         updateScoreBoard();
    //         if (score === CARROT_COUNT) {
    //             finishGame(true);
    //         }
    //     } else if (item === 'bug') {
    //         debugger;
    //         finishGame(false);
    //     }
    // }
    // function updateScoreBoard() {
//     gameScore.innerText = CARROT_COUNT - score;
// }

// function showStopButton() {
//     const icon = gameBtn.querySelector('.fa-solid');
//     icon.classList.add('fa-stop');
//     icon.classList.remove('fa-play');
//     gameBtn.style.visibility = "visible";
// }

// function hideGameButton() {
//     gameBtn.style.visibility = "hidden";
// }

// function showTimeAndScore() {
//     gameTimer.style.visibility = 'visible';
//     gameScore.style.visibility = 'visible';
// }

// function startGameTimer() {
//     let remainingTimeSec = GAME_DURATION_SEC;
//     updateTimerText(remainingTimeSec);
//     timer = setInterval(() => {
//         if (remainingTimeSec <= 0) {
//             clearInterval(timer);
//             finishGame(CARROT_COUNT === score);
//             return;
//         }
//         updateTimerText(--remainingTimeSec);
//     }, 1000);
// }

// function stopGameTimer() {
//     clearInterval(timer);
// }

// function updateTimerText(time) {
//     const minutes = Math.floor(time / 60);//0
//     //minutes = (minutes < 10) ? `0${minutes}` : minutes;
//     const seconds = time % 60;
//     //seconds = (seconds < 10) ? `0${seconds}` : seconds;
//     gameTimer.innerText = `${minutes}:${seconds}`;
// }

// function initGame() {
//     score = 0;
//     gameScore.innerText = CARROT_COUNT;
//     gameField.init();
//     //field.innerHTML = '';
//     //벌레와 당근 생성 -> field추가
//     //console.log(fieldRect);
//     // addItem('carrot', CARROT_COUNT, 'img/carrot.png');
//     // addItem('bug', BUG_COUNT, 'img/bug.png');
// }
    






//------Sound Class-------------

//const carrotSound = new Audio('./sound/carrot_pull.mp3');
// const alertSound = new Audio('./sound/alert.wav');
// const bgSound = new Audio('./sound/bg.mp3');
// const bugSound = new Audio('./sound/bug_pull.mp3');
// const winSound = new Audio('./sound/game_win.mp3');

// function playSound(sound) {
//     sound.currentTime = 0;
//     sound.play();
// }

// function stopSound(sound) {
//     sound.pause();
// }


//------Field Class--------------------------------
//import * as sound from './sound.js';

// const CARROT_SIZE = 80;

// const field = document.querySelector('.game__field');
// const fieldRect = field.getBoundingClientRect();

// field.addEventListener('click', (event) => onFieldClick(event));

// function addItem(className, count, imgPath) {
//     const x1 = 0;
//     const y1 = 0;
//     const x2 = fieldRect.width - CARROT_SIZE;
//     const y2 = fieldRect.height - CARROT_SIZE;

//     for (let i = 0; i < count; i++) {
//         const item = document.createElement('img');
//         item.setAttribute('class', className);
//         item.setAttribute('src', imgPath);
//         item.style.position = "absolute";
//         const x = randomNumber(x1, x2);
//         const y = randomNumber(y1, y2);
//         item.style.left = `${x}px`;
//         item.style.top = `${y}px`;
//         field.appendChild(item);
//     }
// }

// function randomNumber(min, max) {
//     return Math.random() * (max - min) + min;
//     //min included / max not included
//     //x2,y2에서 CARROT_SIZE를 빼서 전체 범위 자체를 조정
// }




//-------PopUp Class--------------------------

// const popUp = document.querySelector('.pop-up');
// const popUpText = document.querySelector('.pop-up__message');
// const popUpRefresh = document.querySelector('.pop-up__refresh');

// function hidePopUp() {
//     popUp.classList.add('pop-up--hide');
// }

// function showPopupWithText(text) {
//     popUpText.innerText = text;
//     popUp.classList.remove('pop-up--hide');
// }
//
// popUpRefresh.addEventListener('click', () => {
//     startGame();
//     hidePopUp();


// })ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ


