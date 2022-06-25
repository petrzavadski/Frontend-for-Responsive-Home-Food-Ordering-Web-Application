import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    // this.filters = {};
    this.elem = this.createEl();
    this.renderCards();

    let filters = {
      noNuts: true, // true/false
      vegeterianOnly: false, // true/false
      maxSpiciness: 3, // числа от 0 до 4
      category: 'soups' // уникальный идентификатор категории товара
    };

  }

  renderCards() {
    this.products.forEach(data => {
      
      const div = this.elem.lastElementChild;
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
    
    let filtered = [];

    this.products.forEach(data=>{
      
    

      if ((filters.noNuts == true) && (data.nuts == true)) {return;}
      if ((filters.vegeterianOnly == true) && (data.vegeterian == false)) {return;}
      if ((filters.category == data.category) && (typeof filters.category == 'string')) {

        if (filters.maxSpiciness >= data.spiciness) {filtered.push(data);}

      }

      });

  filtered.forEach(data => {
      
      const div = this.elem.lastElementChild;
      let card = new ProductCard(data);


      div.append(card.elem);

  }

}
