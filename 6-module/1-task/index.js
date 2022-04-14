/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {

    this.rows = rows;
    this.elem = this.render();

  }
  render(){

 

    const th ={
  
      
  
       name: "Имя",
  
       age: "Возраст",
  
       salary: "Зарплата",
  
       city: "Город",
  
       misc: ""
  
     }
  
    
  
    let res = [];
  
   
  
   
  
  const table = document.createElement("TABLE");
  
 
  var tr = table.createTHead();  
  
  for (let hat of Object.values(th)){
  
      
  
       let text = document.createTextNode(hat);
  
       let th = document.createElement("TH");
  
       th.appendChild(text);
  
       tr.appendChild(th);
  
  };
  
       
  
  table.appendChild(tr);
  
 
  for (let tr of  this.rows) res.push(Object.values(tr));

  
  var tb = document.createElement("TBODY");

  res.forEach(item =>{
  
    var tr = document.createElement("TR");

    
 
  
    item.forEach(item=>{

  
       var td = document.createElement("TD");
  
       var text = document.createTextNode(item);

       
  
       td.appendChild(text);
  
       tr.appendChild(td);
  
    
    });
  
   
      const btn = document.createElement("button");

      btn.innerHTML="X";
  
      var td = document.createElement("TD");

      
       
      
      btn.addEventListener('click',(event)=>{
      
          if (event.target.innerHTML=="X") event.target.parentElement.parentElement.remove();
      
      });
      
      
      td.appendChild(btn);

      
      tr.appendChild(td);

     
      tb.appendChild(tr); 

      table.appendChild(tb);
  
  
  });
  
 
  
return table;
  
}

}
