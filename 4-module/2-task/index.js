function makeDiagonalRed(table) {
  // ваш код...
  // let table = document.body.firstElementChild;

let r = 0;
let c = 0;

while((r<=table.rows.length-1) && (c<=table.rows[0].cells.length-1)){

  table.rows[r].cells[c].style.backgroundColor = 'red';

  r++;
  c++;
}

}
