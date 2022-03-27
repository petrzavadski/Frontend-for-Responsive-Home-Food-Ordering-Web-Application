function getMinMax(str) {
  // ваш код...

  let num =[]
  str.split(' ').forEach(val=>{

    if (isFinite(val) && val!=='') num.push(+val);
    
  });

  let max = +num.reduce((a, b) => a>b ? a : b );
  let min = +num.reduce((a, b) => a>b ? b : a );
   
  
return {'min': min,
        'max': max} 
        
}
