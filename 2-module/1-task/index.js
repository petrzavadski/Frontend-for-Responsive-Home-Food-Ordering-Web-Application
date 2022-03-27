function sumSalary(salaries) {
  // ваш код...
  let total=0;

  for (val in salaries){

    if (Boolean(salaries[val]) ? isFinite(salaries[val]) : false){
      total+=salaries[val];
    }
 
  }

return total;

}
