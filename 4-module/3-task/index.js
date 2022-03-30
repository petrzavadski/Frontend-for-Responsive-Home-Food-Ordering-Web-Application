function highlight(table) {

  let index=3;
  
for (let r=0; r<table.rows.length;r++){
for (let c=0;c<=table.rows[0].cells.length-1;c++){
  
     
   if (table.rows[r].cells[index].hasAttribute('data-available')) {


    
    if (table.rows[r].cells[index].getAttribute('data-available')=="true"){
      
      table.rows[r].cells[index].parentElement.classList.add('available');
      
    } else {
      
       table.rows[r].cells[index].parentElement.classList.add('unavailable');
    
    }


 
   

  
  } else {
            table.rows[r].cells[c].parentElement.setAttribute('hidden', true);
   
  } 

  
if (table.rows[r].cells[c].innerHTML ==`m`) table.rows[r].cells[c].parentElement.classList.add('male');
if (table.rows[r].cells[c].innerHTML ==`f`) table.rows[r].cells[c].parentElement.classList.add('female');       

  
if (isFinite(table.rows[r].cells[c].innerHTML)){

if (+table.rows[r].cells[c].innerHTML<18){
table.rows[r].cells[c].parentElement.setAttribute(`style`, `text-decoration: line-through`);

}

}
  
}

}

}