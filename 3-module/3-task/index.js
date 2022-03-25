function camelize(str) {
  // ваш код...

  let final = [];

  // return str.split('-').forEach(val=> val[0].toUpperCase() + val.slice(1)).join('');

 final.push(str.split('-')[0])
  
 str.split('-').slice(1).forEach(val=>{

      if (val!=='') {
       final.push(val[0].toUpperCase() + val.slice(1)); 
        
      }


    });

  return final.join('');
  
}
