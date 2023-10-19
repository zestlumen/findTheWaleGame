'use strict';

//export default - class를 밖으로 노출시키는 것
export default class PopUp {
    constructor() {
        this.popUp = document.querySelector('.pop-up');
        this.popUpText = document.querySelector('.pop-up__message');
        this.popUpRefresh = document.querySelector('.pop-up__refresh');

        this.popUpRefresh.addEventListener('click', () => {
            this.onClick && this.onClick();
            //등록된 멤버변수있으면 onCLick()호출
            this.hide();
        });
    }
    //클래스멤버 변수에 onCLick이 할당
    setClickListener(onClick) { //startGame();
        this.onClick = onClick;
        //class PopUp안에 있는 멤버변수onClick에 전달받은 인자를 할당해주는 것
    }
    showWithText(text) {
        this.popUpText.innerText = text;
        this.popUp.classList.remove('pop-up--hide');

    }

    hide() {
        this.popUp.classList.add('pop-up--hide');
    }
}
