function toggleText(){

  let toggle = true;
    
  let text = document.body.querySelector("#text");
  let btn = document.body.querySelector(".toggle-text-button"); 
  
  btn.addEventListener('click',()=>{
  
     text.hidden = toggle;
   
     toggle = !toggle;
    
  });
    
  }