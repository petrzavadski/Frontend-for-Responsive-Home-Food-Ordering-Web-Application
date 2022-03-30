function makeFriendsList(data) {

  let elem = document.createElement('ul');
    
  for (let part of data){
    
  elem.innerHTML +='<li>' + part.firstName + ' ' + part.lastName + '</li>';
  
  }
 
  return elem;

}
