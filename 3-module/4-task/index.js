function showSalary(users , age) {
  // ваш код...
  
  let txt=[];
 let result='';
  
// let count = 0

  for (user in users){

    if (users[user].age<=age){


          txt.push(String(users[user].name)+', '); 
          txt.push(String(users[user].balance));         
          txt.push('\n');    
                       
      
                   
 
   
    
    
  
    }
    
   
  }

txt.pop();
  
  return txt.join('');
  // return txt;
  


}