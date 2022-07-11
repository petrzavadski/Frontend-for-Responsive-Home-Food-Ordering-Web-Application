import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {


  }

  async render() {
    // ... ваш код
    let carousel = new Carousel(slides);
    document.body.querySelector('[data-carousel-holder]').append(carousel.elem);

    this.ribbonMenu = new RibbonMenu(categories);
    document.body.querySelector('[data-ribbon-holder]').append(this.ribbonMenu.elem);

    this.stepSlider = new StepSlider({
      steps: 5,
      value: 3
    });

    document.body.querySelector('[data-slider-holder]').append(this.stepSlider.elem);


    let cartIcon = new CartIcon();

    document.body.querySelector('[data-cart-icon-holder]').append(cartIcon.elem);

    this.cart = new Cart(cartIcon);

    let response = await fetch('products.json');

    if (response.ok) {

      let json = await response.json();

      this.productsGrid = new ProductsGrid(json);

      document.querySelector('[data-products-grid-holder]').innerHTML = ''; // очистка содержимого элмента, куда мы вставляем список товаров
      document.querySelector('[data-products-grid-holder]').append(this.productsGrid.elem);

      this.productsGrid.updateFilter({
        noNuts: document.getElementById('nuts-checkbox').checked,
        vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
        maxSpiciness: this.stepSlider.value,
        category: this.ribbonMenu.value
      });

      // console.log(this.stepSlider.elem); // (*) почему здесь выводит норм
      this.addEventListeners();

    }
  
  }

  addEventListeners() {

    const nuts = document.body.querySelector('#nuts-checkbox');
    const vegeterian = document.body.querySelector('#vegeterian-checkbox');

    document.body.addEventListener('product-add', (event)=>{
      let productServer = event.detail;
      let product = this.productsGrid.products.find((product)=>product.id === productServer);

      this.cart.addProduct(product);

    });

    // (**) а здесь ошибка
    this.stepSlider.elem.addEventListener('slider-change',
      (event)=>{
        this.productsGrid.updateFilter({
          maxSpiciness: event.detail // значение остроты из события 'slider-change'
        });

      }
    );

    this.ribbonMenu.elem.addEventListener('ribbon-select',
      (event)=>{

        this.productsGrid.updateFilter({
          category: event.detail // категория из события 'ribbon-select'
        });

      }
    );

    nuts.addEventListener('change',
      (event)=>{
        this.productsGrid.updateFilter({
          noNuts: event.target.checked // новое значение чекбокса
        });

      }
    
    );

    vegeterian.addEventListener('change',
      (event)=>{
        this.productsGrid.updateFilter({
          vegeterianOnly: event.target.checked // новое значение чекбокса
        });
      }
    );

  }
}
