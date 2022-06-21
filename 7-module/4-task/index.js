import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.render();
    this.addDragListeners();
    this.elem.onclick = event => {
      this.handleClick(event);
      
    }; 

    this.thumbElem.onmousedown = event => {
      this.handleMousedown(event);
    }; 
    this.thumbElem.ondragstart = function() {
      return false;
    };
  }

  toggleDraggingClass(bolean) {
    //v true add class slider_dragging 
    // v false delete class slider_dragging
    // v из всех мест где идет работа с этим классом заменить на этот метод

    if (bolean === true) {this.elem.classList.add('slider_dragging');}
    else {
      this.elem.classList.remove('slider_dragging');
    }


  }

  calculateStep(event) {
    // v вычисляет шаг слайдера на основе корординат курсора мыши mouseEvent
    // v везде где есть вычисление этого шага - надо вызвать этот метод

    let wTotal = this.elem.clientWidth; //  width 
    let oneSection = wTotal / (this.steps - 1);
    

    let activeStep = (Math.round(event.offsetX / oneSection));

    return activeStep;
  }

  dispatchChange() {
    // v генерирует событие Sliderchange на корневом элементе слайдера 
    // v заменить везде где есть генерация события на вызов этого метода

    this.elem.dispatchEvent(
      new CustomEvent('slider-change', { // имя события должно быть именно 'slider-change'
        detail: this.activeStep, // значение 0, 1, 2, 3, 4
        bubbles: true // событие всплывает - это понадобится в дальнейшем
      }));

  }

  addDragListeners() {
    // v  перенести все навешивание drag and drop сюда из конструктора
    // v вызвать его в конструкторе

    this.handleMousemove = this.handleMousemove.bind(this);
    this.handleMouseup = this.handleMouseup.bind(this);

  }

  handleMousedown(event) {
    // v вешаем обработчик движения мыши +  добавление класса к слайдеру
    // v вешаем обработчик поднятия мыши 


    document.addEventListener('mousemove', this.handleMousemove);

    document.addEventListener('mouseup', this.handleMouseup);

    // document.addEventListener('mousemove',
    //   event=>{
    //     this.handleMousemove(event);
    //   });

    // document.addEventListener('mouseup',
    //   event=>{
    //     this.handleMouseup(event);
    //   });

    // this.elem.classList.add('slider_dragging');

    // slider_dragging

    this.toggleDraggingClass(true);
  }

  handleMousemove(event) {
    // let shiftX = event.clientX - this.thumbElem.getBoundingClientRect().left;
    // this.thumbElem.left = `${shiftX}px`;
   

    // ...0 ...1..2...3...
    // вычисление шага

    let activeStep = this.calculateStep(event);
   
    
    this.updateValue(activeStep);

  }


  handleMouseup(event) {
    // удаляем обработчик движения мыши v
    // удаляем обработчик поднятия мыши v
    //удаляем класса к слайдеру v

    document.removeEventListener('mousemove', this.handleMousemove);

    document.removeEventListener('mouseup', this.handleMouseup);

    this.elem.classList.remove('slider_dragging');
    this.toggleDraggingClass(false);

  }

  setValue(val) {
    this.sliderValue.textContent = val;
    
  }

  updateValue(val) { // !!!! <----- Доделать!!!!!!

    // console.log(val);
    // 1. value
    this.value = val;
    // 2.     this.setActiveStep(this.value);
    this.setActiveStep(val);
    // 3 stepProgress
    let activeStep = this.calculateStep(this);

    let procent = (activeStep / (this.steps - 1)) * 100; 
    
 
    this.setProgress(procent);
    
    //4  this.sliderValue
    this.setValue(val);
    //5 dispatch(событие handleMouseup)
   
    // this.dispatchChange(); 
    // v
    // this.elem.dispatchEvent(
    //   new CustomEvent('slider-change', { // имя события должно быть именно 'slider-change'
    //     detail: activeStep, // значение 0, 1, 2, 3, 4
    //     bubbles: true // событие всплывает - это понадобится в дальнейшем
    //   }));
    this.dispatchChange();
  
  }

  setProgress(val) {
    // менять ширину элемента progressElem в процентах

    this.progressElem.style.width = `${val}%`;


  }

  setActiveStep(n) {
    // добавляем класс slider__step-active активному шагу


    this.stepsElem.children[n].className = 'slider__step-active';
   

  }

  clearActiveStep() {
  // удаляем все классы slider_step-active активном шагу
      
    // 1 вариант - РАБОТАЕТ

    // let list = this.stepsElem;

    // for (let i = 0; i < list.children.length; i++) {
           
    //   if (list.children[i].className === 'slider__step-active') {

    //     list.children[i].removeAttribute('class');

    //     // .removeAttribute('class');
    //     // list.children[i].removeAttribute('class');

    //   }
            
    // }
    

    // 2 вариант - ПОЧЕМУ-ТО НЕ РАБОТАЕТ!!!

    this.stepsElem.querySelector('.slider__step-active').classList.remove('slider__step-active');
    // del.classList.remove('slider__step-active');
 
    // 3 вариант - РАБОТАЕТ
    // for (let i = 0; i < this.stepsElem.children.length; i++) {
      
    //   if (this.stepsElem.children[i].className == 'slider__step-active') {
    //     this.stepsElem.children[i].classList.remove('slider__step-active');
    //   }


    // }




  }

  handleClick(event) {
  // определить координаты курсора во время клика

    let activeStep = this.calculateStep(event);

    let procent = (activeStep / (this.steps - 1)) * 100; 
 
    
 
    this.clearActiveStep(); 

    this.setActiveStep(activeStep);
    
    this.setProgress(procent);
    this.thumbElem.style.left = `${procent}%`;
    

    this.setValue(activeStep);

    /// генерируем событие

    this.dispatchChange();



  }

  render() {

    const slider = document.createElement('div');

    slider.className = 'slider';
    
    const thumb = document.createElement('div');

    thumb.className = 'slider__thumb';

    thumb.innerHTML = `<span class="slider__value">${this.value}</span>`;

   

    slider.append(thumb);

    const progress = document.createElement('div');

    progress.className = 'slider__progress';
  
    slider.append(progress);
    
    const steps = document.createElement('div');

    steps.className = 'slider__steps';

    slider.append(steps);

    for (let i = 0; i < this.steps;i++) {

      steps.append(document.createElement('span'));

    }

   

    this.elem = slider;
    this.thumbElem = thumb;

    // this.elem = createElement(text);

    this.progressElem = progress;
    this.stepsElem = steps;
    this.sliderValue = thumb.firstElementChild;
  
    this.setActiveStep(this.value);
 
    
  }

}
