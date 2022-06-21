import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.render();
    this.elem.onclick = event => {
      this.handleClick(event);
    }; 
 
  }

  setValue(val) {
    this.sliderValue.textContent = val;
    
  }

  setProgress(val) {
    // менять ширину элемента progressElem в процентах

    this.progressElem.style.width = `${val}%`;

  }

  setActiveStep(n) {
    // добавляем класс slider__step-active активному шагу

    console.log(n);
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
  // console.log(координаты) 

    // console.log(event.x, event.y); 

    // console.log(event.offsetX); 

    let wTotal = this.elem.clientWidth; //  width 
    let oneSection = wTotal / (this.steps - 1);
    

    let activeStep = (Math.round(event.offsetX / oneSection));

    // console.log(activeStep);
    console.log(activeStep / this.steps * 100);

    let procent = (activeStep / (this.steps - 1)) * 100; 
    this.clearActiveStep(); 
    console.log(activeStep);
    this.setActiveStep(activeStep);
    
    this.setProgress(procent);
    this.thumbElem.style.left = `${procent}%`;
    

    this.setValue(activeStep);

    this.elem.dispatchEvent(
    new CustomEvent('slider-change', { // имя события должно быть именно 'slider-change'
      detail: activeStep, // значение 0, 1, 2, 3, 4
      bubbles: true // событие всплывает - это понадобится в дальнейшем
    }));

  }

  render() {

    const slider = document.createElement('div');

    slider.className = 'slider';
    
    const thumb = document.createElement('div');

    thumb.className = 'slider__thumb';

    thumb.innerHTML = `<span class="slider__value">${this.value}</span>`;

    this.sliderValue = thumb.firstElementChild;

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
    // console.log(this.value)
    this.setActiveStep(this.value);
    console.log(this.thumbElem);
    
  }

}
