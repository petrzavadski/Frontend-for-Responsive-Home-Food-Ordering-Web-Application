import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.elem = this.createEl();
    this.renderCards(this.products);
    this.filters = {};
  
    // let filters = {
    //   noNuts: true, // true/false
    //   vegeterianOnly: false, // true/false
    //   maxSpiciness: 3, // числа от 0 до 4
    //   category: 'soups' // уникальный идентификатор категории товара
    // };
    // this.updateFilter(filters);
  }

  renderCards(data) {
    // console.log(data);
    // переделать , чтобы принимал массив *1
    const div = this.elem.lastElementChild;
    div.innerHTML = ``;
    data.forEach(data => {
      
      
      let card = new ProductCard(data);

   
      div.append(card.elem);

    });
  }

  createEl() {
    const elem = `<div class="products-grid">
<div class="products-grid__inner">
  <!--ВОТ ТУТ БУДУТ КАРТОЧКИ ТОВАРОВ-->
  </div>
</div>`;

    const div = document.createElement('div');

    div.insertAdjacentHTML('beforeend', elem);

    return div.firstElementChild;
  }

  updateFilter(filters) {

    
    // let filtered = [];

        
   

    // let filtered = []; 
      
    Object.assign(this.filters, filters);
     
    
    this.renderCards(this.products.filter(data=>{
      
    
      // if ((filters.noNuts == true) && (data.nuts == true)) {return;}
      // if ((filters.vegeterianOnly == true) && (data.vegeterian == false)) {return;}
      // if ((filters.category !== data.category) && (typeof filters.category == 'string')) {return;}
      
      // if (filters.maxSpiciness < data.spiciness) {return;}

      const f = this.filters;

      if (((f.noNuts == true) && (data.nuts == true)) 
      || ((f.vegeterianOnly === true) && (data.vegeterian !== true))
      || ((f.category !== data.category) && (typeof f.category == 'string'))
      || (f.maxSpiciness < data.spiciness)
      ) {return false;}

      return true;
      // filtered.push(data);

    }));
    
    
    // this.renderCards(filtered);
    
    





    // filtered.forEach(data => {
      
    //   const div = this.elem.lastElementChild;
    //   let card = new ProductCard(data);


    //   div.append(card.elem);

    // });

    

  }


}
