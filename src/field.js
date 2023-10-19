'use strict';

import * as sound from './sound.js';

const WHALE_WIDTH = 200;
const WHALE_HEIGHT = 200;

export const itemType = Object.freeze({
    whale: 'whale',
    jelly: 'jelly'
});

export class Field {
    constructor(whaleCount, jellyCount) {
        this.whaleCount = whaleCount;
        this.jellyCount = jellyCount;
        this.field = document.querySelector('.game__field');
        this.fieldRect = this.field.getBoundingClientRect();
        // this.onClick = this.onClick.bind(this); 1.직접적인 바인딩
        // this.field.addEventListener('click', (event)=>this.onClick(event));
        // 2.이벤트 받아서 전달해서 바인딩
        this.field.addEventListener('click', this.onClick);
        //★ 함수를 인자로 전달시에 클래스정보는 함께 전달되지 X
        //JS에서는 함수만 전달되어짐->함수를 클래스와 바인딩해줘야함
    }

    init() {
        this.field.innerHTML = '';
        this._addItem(itemType.whale, this.whaleCount, 'img/whale.png');
        this._addItem(itemType.jelly, this.jellyCount, 'img/jellyfish.png');
    }

    setClickListener(onItemClick) { //아이템이클릭되면호출 콜백함수
        this.onItemClick = onItemClick;
    }

    //_는 js에서 private처럼 쓰이는데 좋지않음
    _addItem(className, count, imgPath) {
        const x1 = 0;
        const y1 = 0;
        const x2 = this.fieldRect.width - WHALE_WIDTH;
        const y2 = this.fieldRect.height - WHALE_HEIGHT;
        for (let i = 0; i < count; i++) {
            const item = document.createElement('img');
            item.setAttribute('class', className);
            item.setAttribute('src', imgPath);
            item.style.position = "absolute";
            const x = randomNumber(x1, x2);
            const y = randomNumber(y1, y2);
            item.style.left = `${x}px`;
            item.style.top = `${y}px`;
            this.field.appendChild(item);
        }
    }
    //3.다른 콜백으로 전달할 때 온클릭이라는 멤버변수가 arrowfunction을 가리킴
    onClick = (e) => {
        const target = e.target;
        if (target.matches('.whale')) {
            target.remove();
            sound.playWhale();
            this.onItemClick && this.onItemClick(itemType.whale);
        } else if (target.matches('.jelly')) {
            this.onItemClick && this.onItemClick(itemType.jelly);
        }
    }
}

//static, field와 무관, 공통적으로 쓸 수 있음.
function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
    //min included / max not included 
    //x2,y2에서 WHALE_SIZE를 빼서 전체 범위 자체를 조정
}
