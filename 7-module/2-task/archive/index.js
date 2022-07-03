import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
   this.title = `Вот сюда нужно добавлять заголовок`; 
   this.modalBody = `A сюда нужно добавлять содержимое тела модального окна`;

  }

 

  open(){

      let text = `  <!--Корневой элемент Modal-->
      <div class="modal">
        <!--Прозрачная подложка перекрывающая интерфейс-->
        <div class="modal__overlay"></div>
    
        <div class="modal__inner">
          <div class="modal__header">
            <!--Кнопка закрытия модального окна-->
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>
    
            <h3 class="modal__title">
              ${this.title}
            </h3>
          </div>
    
          <div class="modal__body">
            ${this.modalBody}
          </div>
        </div>
    
      </div>`;
  
      let container = document.querySelector('.container');
      let body = document.querySelector('BODY');
      
      let btn = document.querySelector('.button');

      
      let table = createElement(text);
      
      container.append(table);

      body.classList.add('is-modal-open');

      let closeBtn = document.querySelector('.modal__close');
      closeBtn.addEventListener('click', Modal.close);

      document.addEventListener('keydown', function(event) {
        if (event.code === 'Escape') {

          let body = document.querySelector('BODY');
          body.classList.remove('is-modal-open');
          Modal.close();
     
        }
      },
      {
        once: true
      });
  

  }


 setTitle(title){

  this.title = title;

 }
      
 setBody(func){

  this.modalBody = func.innerHTML;

 }

 static close(){


  let container = document.querySelector('.modal');
  container.remove();
  let btn = document.querySelector('.button');

  btn.style="display: block;"



 }

}
