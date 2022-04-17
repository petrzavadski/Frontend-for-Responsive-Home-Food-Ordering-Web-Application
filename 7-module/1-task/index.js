import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;

    this.elem = this.render();
    this.dom;
    this.ribbonInner;
    this.after();
  }

  render(){

let text = `<div class="ribbon">
<!--Кнопка прокрутки влево-->
<button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
  <img src="/assets/images/icons/angle-icon.svg" alt="icon">
</button>

<!--Ссылки на категории-->
<nav class="ribbon__inner">
<a href="#" class="ribbon__item ribbon__item_active" data-id="">${this.categories[0].name}</a>`;



for (let cat in this.categories){

  if (!((cat==this.categories.length-1) || (cat==0))){

      text += `<a href="#" class="ribbon__item" data-id="${this.categories[cat].id}">${this.categories[cat].name}</a>`;
  }

}

text +=`
<a href="#" class="ribbon__item" data-id="on-the-side ribbon__item_active">On the side</a>

</nav>

<!--Кнопка прокрутки вправо-->
<button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
  <img src="/assets/images/icons/angle-icon.svg" alt="icon">
</button>
</div>`;




let dom = createElement(text);
    return dom;
  }

after(){

  let right = this.elem.querySelector('.ribbon__arrow_right');
  let left =  this.elem.querySelector('.ribbon__arrow_left');
  let ribbonInner = this.elem.querySelector('.ribbon__inner');

right.addEventListener('click', goRight);
left.addEventListener('click', goLeft);
ribbonInner.addEventListener('scroll', scrollEvt);

// обработчики кликов

const anchor = this.elem.querySelectorAll('A');

for (let i = 1; i < anchor.length; i++) {
  

   
        anchor[i].addEventListener('click', (event)=>{

          event.preventDefault();


   const press =  new CustomEvent('ribbon-select', { // имя события должно быть именно 'ribbon-select'
            detail: event.target.dataset.id, // уникальный идентификатора категории из её объекта
            bubbles: true // это событие всплывает - это понадобится в дальнейшем
          })
          

          anchor[i].dispatchEvent(press);    

          
        });    
};


function goRight(){

  left.classList.add('ribbon__arrow_visible');
  ribbonInner.scrollBy(350, 0); // положительное значение для прокрутки вперёд
 

}

function goLeft(){

  right.classList.add('ribbon__arrow_visible');
  ribbonInner.scrollBy(-350, 0); // отрицательное значение для прокрутки назад
  

}

function scrollEvt(){

  let scrollWidth = ribbonInner.scrollWidth;
  let scrollLeft = ribbonInner.scrollLeft;
  let clientWidth = ribbonInner.clientWidth;
  let scrollRight = scrollWidth - scrollLeft - clientWidth; // число пикселей, например, 100 или 0.

    if (scrollLeft==0) left.classList.toggle('ribbon__arrow_visible');
    if (scrollRight<1) right.classList.toggle('ribbon__arrow_visible');

    // if ((left.classList.className!=='ribbon__arrow_visible') && (scrollLeft>0)) left.classList.toggle('ribbon__arrow_visible');


        // console.log('left.className', left.className);
    // console.log('right.className', right.className);

    // left.classList.className('ribbon__arrow_visible');
    // right.classList.className('ribbon__arrow_visible');

}

}}


