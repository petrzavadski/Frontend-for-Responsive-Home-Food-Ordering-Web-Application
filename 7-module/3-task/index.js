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

    this.stepsElem.querySelector('.slider__step-active').remove('slider__step-active');
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
    let oneSection = wTotal / this.steps;
    

    let activeStep = (Math.round(event.offsetX / oneSection));

console.log(activeStep);
    console.log(activeStep / this.steps*100);

    this.setActiveStep(activeStep);
    this.setProgress(activeStep / this.steps*100);

    


  }

  render() {

    const slider = document.createElement('div');

    slider.className = 'slider';
    
    const thumb = document.createElement('div');

    thumb.className = 'slider__thumb';

    thumb.innerHTML = `<span class="slider__value">${this.value}</span>`;

    this.sliderValue = thumb.firstElement;

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

    // this.elem = createElement(text);

    this.progressElem = progress;
    this.stepsElem = steps;


    
  }

}
