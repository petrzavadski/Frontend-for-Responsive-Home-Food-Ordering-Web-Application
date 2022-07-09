import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();

  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }


  updatePosition() {
    // ваш код ...

    let isMobile = (document.documentElement.clientWidth <= 767);

    // Если условие выполняется, обнуляем стили к исходным
    if (isMobile) {
      // Object.assign(this.elem.style, {
      //   position: '',
      //   top: '',
      //   left: '',
      //   zIndex: ''
      // });

      this.elem.style.position = '';
      this.elem.style.top = '';
      this.elem.style.zIndex = '';
      this.elem.style.left = '';

      return;
    }

    let e = {
      offsetWidth: 540,
      offsetHeight: 440
    };

    const isHidden = elem =>{

      // ВОПРОС №1 
      // Почему код ниже (строки * и ** ) дает ошибку и как это исправить:

      const {x, y} = {x: elem.offsetWidth, 
        y: elem.offsetHeight}; // *


      // почему ошибка "Uncaught SyntaxError: Unexpected token '.' (at index.js:50:27)"

      return !x && !y;
    };

    isHidden(e);


    

    if (!(isHidden(this.elem))) {

      if (typeof this.initY === 'undefined') {
        
        this.initY = this.elem.getBoundingClientRect().top + window.pageYOffset;
      }


      if (window.pageYOffset > this.initY) {
        // плавающая корзина


        let hor1 = document.querySelector('.container').getBoundingClientRect().right + 20;
        let hor2 = document.documentElement.clientWidth - this.elem.offsetWidth - 10;

        // Вопрос №2 Не понятно как работает эта логика
        // let hor1 = document.querySelector('.container').getBoundingClientRect().right + 20; // *
        // let hor2 = document.documentElement.clientWidth - this.elem.offsetWidth - 10; //**
        // т.е. почему мы берем эти параметры и вообще как это работает:
        // hor1 = правая координата элемента с классом "container" + 20
        // hor2 = размер окна - длина элемента корзины - 10 
        
        

        let coord = Math.min(hor1, hor2) + 'px';

        // Object.assign(this.elem.style, {
        //   position: 'fixed',
        //   top: '50px',
        //   zIndex: 1e3,
        //   right: '10px',
        //   left: coord
        // });

        this.elem.style.position = 'fixed';
        this.elem.style.top = '50px';
        this.elem.style.zIndex = '1000';
        this.elem.style.right = '10px';
        this.elem.style.left = coord;
   

      } else {
        // корзина сверху
        // Object.assign(this.elem.style, {
        //   position: 'absolute',
        //   top: '',
        //   left: ''
        // });

        this.elem.style.position = 'absolute';
        this.elem.style.top = '';
        this.elem.style.left = '';

      }

  

    }



  }


}

// Вопрос №3:
// Как реализовать логику для мобильных устройств?

// let isMobile = document.documentElement.clientWidth <= 767;

// // Если условие выполняется, обнуляем стили к исходным
// if (document.documentElement.clientWidth <= 767) {
//   Object.assign(this.elem.style, {
//     position: '',
//     top: '',
//     left: '',
//     zIndex: ''
//   });
// }