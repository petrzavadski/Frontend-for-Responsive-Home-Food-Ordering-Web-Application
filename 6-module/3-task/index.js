import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = this.render();
    this.count = 1;
    this.x = 0;
    this.initCarousel();
 
  }

  render(){
 
    

    let text = `<!--Корневой элемент карусели-->
    <div class="carousel">
      <!--Кнопки переключения-->
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div><div class="carousel__inner">`;

    for (let slide in this.slides){

  text +=`<!--Верстка ${+slide+1}-ого слайда-->
<div class="carousel__slide" data-id="${this.slides[+slide].name}">
  <img src="/assets/images/carousel/${this.slides[+slide].image}" class="carousel__img" alt="slide">
  <div class="carousel__caption">
    <span class="carousel__price">€${this.slides[+slide].price.toFixed(2)}</span>
    <div class="carousel__title">${this.slides[+slide].name}</div>
    <button type="button" class="carousel__button">

      <img src="/assets/images/icons/plus-icon.svg" alt="icon">
    </button>
  </div>
</div>`;


    }

    text+=`<\div>`;


let table = createElement(text);

return table;


  }

initCarousel() {

  

  

  
    let right = this.elem.querySelector('.carousel__arrow_right');


    let left =  this.elem.querySelector('.carousel__arrow_left');
    let el =  this.elem.querySelector('.carousel__inner');
  
   
  
    if (this.count==1) {
        left.style.display = 'none'
    }else{
      left.style.display = '';
      }
         

    if (this.count==this.slides.length) {
        right.style.display = 'none'; 

    } else {
        right.style.display = '';
      }
      
  
right.addEventListener('click', goRight.bind(this));
left.addEventListener('click', goLeft.bind(this));

  // событие при клике по +

   
  const btn = this.elem.querySelectorAll('BUTTON')

  for (let i = 0; i < this.slides.length; i++) {
    
  
     
              btn[i].addEventListener('click', ()=>{
  
                const press =  new CustomEvent("product-add", { // имя события должно быть именно "product-add"
                detail: this.slides[i].id, // Уникальный идентификатора товара из объекта слайда
                bubbles: true // это событие всплывает - это понадобится в дальнейшем
            })
  
            btn[i].dispatchEvent(press);    
  
            
          });    
  };
  

function goRight(){
  this.count++;
  
  
    if (this.count==this.slides.length) { 
      right.style.display = 'none';
      left.style.display = ''; 
  } else {
    right.style.display = '';
    left.style.display = '';
  }
     

  
    

        
    if (this.count!==this.slides.length+1) {
      this.x-=el.offsetWidth;
      el.style.transform = 'translateX(' + this.x + 'px)'; 

    }
    
    

   

      
  }

 function goLeft(){
  this.count--;
  

 
  if (this.count==1) { 
    left.style.display = 'none';
    right.style.display = ''; 
} else {
  right.style.display = '';
  left.style.display = '';
}
    
    if (this.count!==0) {
      this.x+=el.offsetWidth;
      el.style.transform = 'translateX(' + this.x + 'px)'; 

    }

    

    
       
  }



  
}






}



