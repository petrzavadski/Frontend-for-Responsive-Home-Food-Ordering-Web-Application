function filterRange(arr, a, b) {
  // ваш код...
  let newArr = [];
  
  arr.forEach(val=>{
    if (val<=b && val>=a) newArr.push(val)
  })

  return newArr

}
