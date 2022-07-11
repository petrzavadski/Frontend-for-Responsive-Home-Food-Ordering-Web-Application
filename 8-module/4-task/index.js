import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
    this.onSubmit = this.onSubmit.bind(this);
    this.addEventListeners();
  }

  updateTotalSum() {
    // подсчет обшей суммы
    let sum = document.querySelector(`.cart-buttons__info-price`);

    if (sum !== null) {
      sum.textContent = `€${this.getTotalPrice().toFixed(2)}`;
    }
  }

  addProduct(product) {
    // метод добавляет товар (this.cartItems.product) в корзину (this.cartItems) 
    // product - объект

    if (typeof product !== 'object' || product === null) { return; }

    // Поиск товара в карзине (Cart.item) по id

    const finded = this.cartItems.find(a => a.product.id == product.id);



    if (finded === undefined) {
      //  если товара нет в карзине, то добавляем в CardItems (корзину ) в количестве 1 
      // CardItems - массив

      let item = {
        product,
        count: 1
      };

      this.cartItems.push(item);
      this.onProductUpdate(item);

    } else {
      //  если есть, то изменяет количество на +1 

      finded.count++;
      this.onProductUpdate(finded);
      // изменить кусок кода , чтобы onProductUpdate вызывался 1 раз
    }


  }

  updateProductCount(productId, amount) {
    // изменения общего количества productId на amount
    // если количество товара 0, то удаляем товар
    // productId  = cartItem.product.id
    // amount = 1  -> this.cartItems.count + amount
    // amount = -1 -> this.cartItems.count - amount

    const finded = this.cartItems.find(item => item.product.id == productId);
    if (finded === undefined) { return; }
    finded.count += amount;


    if (finded.count === 0) {

      // новая строка 


      const index = this.cartItems.indexOf(finded);

      this.cartItems.splice(index, 1);
    }

    this.onProductUpdate(finded);

    // новая строка
    // хотел внести сюда, проверку на отсутствви етоваров и закрытие окна, но оно не попадает в область видимости
    //  if (this.isEmpty()) {modal.close();}


  }

  isEmpty() {
    // Проверяет пустая ли корзина, в вслучае если полная -true, если нет - false
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    // подсчитывает общее количество едениц товара

    // return this.cartItems.length;
    return this.cartItems.reduce((accum, item) => { return (accum + item.count); }, 0);

  }

  getTotalPrice() {
    // подсчитывает общую сумму тораров в корзине

    return this.cartItems.reduce((accum, item) => { return (accum + item.product.price * item.count); }, 0);

  }

  renderProduct(product, count) {
    // позвращает верстку единицы товара product - объект товара, count - количество

    return createElement(`
    <div class="cart-product" data-product-id="${product.id}">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    // возвращает верстку формы оформления заказа
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
    2
  )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    // выводит модальное окно 
    let modal = new Modal();
    modal.setTitle('Your order');
    // modal.setBody(createElement('<div>Тело модального окна</div>'));

    let div = document.createElement('div');

    this.cartItems.forEach(cartItem => {


      let productEl = this.renderProduct(cartItem.product, cartItem.count);

      div.append(productEl);


    });

    this.productsListEl = div;

    div.append(this.renderOrderForm());

    modal.setBody(div);

    modal.open();

    this.modal = modal;


    this.productsListEl.addEventListener('click', (event) => {
      // console.log('cart - counter__button_minus');
      // updateProductCount(productId, amount) 

      if (event.target.classList.contains('cart-counter__button')) {

        let productId = event.target.parentElement.parentElement.parentElement.parentElement.getAttribute('data-product-id');

        let count = event.target.classList.contains('cart-counter__button_plus') ? 1 : -1;

        // (event.target.classList.contains('cart-counter__button_plus') ? updateProductCount(productId, -1) : updateProductCount(productId, 1) 



        this.updateProductCount(productId, count);

        // console.log(event.target.parentElement.parentElement.parentElement.parentElement.getAttribute('data-product-id'));

        // cart-form
        // новая строка
        if (this.isEmpty()) {modal.close();}

      }
    });

    // новая строка
    let cartForm = document.querySelector('.cart-form');
    // новая строка
    cartForm.addEventListener('submit', this.onSubmit);

  }

  productCountUpdate(cartItem) {
    // если количество товара в корзине = 0, тогда удаляем строку из модального окна, 
    // иначе вписываем количество из корзины cartItem.count

    let id = cartItem.product.id;
    
    if (cartItem.count == 0) {

      document.querySelector(`[data-product-id=${id}]`).remove();
      return;
    }
    let elem = document.querySelector(`[data-product-id=${id}] .cart-counter__count`);
    if (elem !== null) { elem.textContent = cartItem.count; }

    elem = document.querySelector(`[data-product-id=${id}] .cart-product__price`);
    if (elem !== null) { elem.textContent = `€${(cartItem.count * cartItem.product.price).toFixed(2)}`; } // *


  }

  onProductUpdate(cartItem) {


    // метод обновляет верстку при изменении количества товара
    this.productCountUpdate(cartItem);

    this.cartIcon.update(this);

    this.updateTotalSum();


  }

  async onSubmit(event) {
    // отправляет данные пользователя для размещения заказа
    //
    event.preventDefault();

    document.querySelector(`[type="submit"]`).classList.add('is-loading');

    let response = await fetch('https://httpbin.org/post', {
      method: 'POST',
      body: new FormData(document.querySelector('.cart-form'))
    });


    if (response.status === 200) {
    // новые строки

      console.log(this);
      this.modal.setTitle('Success!');

      this.cartItems = [];


      this.productsListEl.innerHTML = `<div class="modal__body-inner">
      <p>
        Order successful! Your order is being cooked :) <br>
        We’ll notify you about delivery time shortly.<br>
        <img src="/assets/images/delivery.gif">
      </p>
    </div>`;

    }


  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();

  }
}

