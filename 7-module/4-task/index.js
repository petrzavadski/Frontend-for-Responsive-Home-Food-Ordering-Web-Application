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


  }

  // вычисление процентов  - метод
  pCalc(event) {
    return (event.clientX - this.elem.getBoundingClientRect().left) / (this.elem.clientWidth) * 100;
  }



  // констата getboundary


  toggleDraggingClass(bolean) {
    //v true add class slider_dragging 
    // v false delete class slider_dragging

    if (bolean === true) { this.elem.classList.add('slider_dragging'); }
    else {
      this.elem.classList.remove('slider_dragging');
    }


  }

  calculateStep(event) {
    // v вычисляет шаг слайдера на основе корординат курсора мыши mouseEvent

    let wTotal = this.elem.clientWidth; //  width 330
    let maxValue = this.steps - 1; // 2

    let oneSection = wTotal / (maxValue); // 165 


    let activeStep = Math.round((event.clientX - this.elem.getBoundingClientRect().left) / oneSection); // 99/165


    activeStep = (activeStep < 0) ? 0 : activeStep;

    return (activeStep > maxValue) ? maxValue : activeStep;
  }

  dispatchChange() {
    //  генерирует событие Sliderchange на корневом элементе слайдера 

    this.elem.dispatchEvent(
      new CustomEvent('slider-change', { // имя события должно быть именно 'slider-change'
        detail: this.value, // значение 0, 1, 2, 3, 4
        bubbles: true // событие всплывает - это понадобится в дальнейшем
      }));


  }

  addDragListeners() {
    //  все навешивание drag and drop из конструктора


    this.handleMousemove = this.handleMousemove.bind(this);
    this.handleMouseup = this.handleMouseup.bind(this);

    this.thumbElem.onpointerdown = event => {
      this.handleMousedown(event);
    };
    this.thumbElem.ondragstart = function () {
      return false;
    };


  }

  handleMousedown(event) {
    //  вешаем обработчик движения мыши +  добавление класса к слайдеру
    //  вешаем обработчик поднятия мыши 


    document.addEventListener('pointermove', this.handleMousemove);

    document.addEventListener('pointerup', this.handleMouseup);


    this.toggleDraggingClass(true);
  }

  handleMousemove(event) {

    // вычисление шага

    let procent = this.pCalc(event);



    if (procent > 100) { procent = 100; }
    if (procent < 0) { procent = 0; }

    this.thumbElem.style.left = `${procent}%`;




    this.setProgress(procent);

    let activeStep = this.calculateStep(event);
    this.value = activeStep;
    this.setValue(activeStep);






  }


  handleMouseup(event) {
    // удаляем обработчик движения мыши 
    // удаляем обработчик поднятия мыши 
    //удаляем класса к слайдеру 

    document.removeEventListener('pointermove', this.handleMousemove);

    document.removeEventListener('pointerup', this.handleMouseup);

    this.toggleDraggingClass(false);

    let activeStep = this.calculateStep(event);
    this.updateValue(activeStep);

    this.dispatchChange();


  }

  setValue(val) {
    this.sliderValue.textContent = val;

  }

  updateValue(step) {

    this.value = step;
    this.clearActiveStep();
    this.setActiveStep(step);

    let procent = (step / (this.steps - 1)) * 100;
    this.thumbElem.style.left = `${procent}%`;


    this.setProgress(procent);


    this.setValue(step);



  }

  setProgress(val) {
    // меняем ширину элемента progressElem в процентах

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


    // 2 вариант 

    this.stepsElem.querySelector('.slider__step-active').classList.remove('slider__step-active');

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

    this.updateValue(activeStep);

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

    for (let i = 0; i < this.steps; i++) {

      steps.append(document.createElement('span'));

    }



    this.elem = slider;
    this.thumbElem = thumb;

    this.progressElem = progress;
    this.stepsElem = steps;
    this.sliderValue = thumb.firstElementChild;

    this.setActiveStep(this.value);


  }

}
