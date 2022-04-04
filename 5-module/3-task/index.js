function initCarousel() {
  let count = 1;
  let x = 0;

  

  let right = document.body.querySelector('.carousel__arrow_right');
  let left =  document.body.querySelector('.carousel__arrow_left');
  let elem =  document.body.querySelector('.carousel__inner');
  const DELTA = elem.offsetWidth;

  

  if (count==1) {
      left.style.display = 'none';
      right.style.display = '';
    }
       
  if (count==4) {
      right.style.display = 'none';
      left.style.display = '';
    }
    
   
  function goRight(){

    if (count==4) {
      right.style.display = 'none';
      left.style.display = '';
    }

        
    if (count!==4) {
      x-=DELTA;
      left.style.display = 'none';
      right.style.display = '';
     count++;
     elem.style.transform = 'translateX(' + x + 'px)'; 
            if (count==4) {
      right.style.display = 'none';
      left.style.display = '';
    }
    }
    
    

      
  }

  function goLeft(){

    if (count==1) {
      left.style.display = 'none';
      right.style.display = '';
    }
    
    if (count!==1){
      x+=DELTA;
      left.style.display = '';
       right.style.display = 'none';
    count--; 
      elem.style.transform = 'translateX(' + x + 'px)';
            if (count==1) {
      left.style.display = 'none';
      right.style.display = '';
    }
    }
    
 

  }

right.addEventListener('click', goRight);
left.addEventListener('click', goLeft);


}