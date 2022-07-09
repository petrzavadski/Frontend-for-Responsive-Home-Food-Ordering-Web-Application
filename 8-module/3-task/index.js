export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    // ваш код
    // product - объект

    if (typeof product !== 'object' || product === null) { return; }

    // Как определить, что что-то является простым объектом

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
      finded.count++;
      this.onProductUpdate(finded);
      // изменить кусок кода , чтобы onProductUpdate вызывался 1 раз
    }


  }

  updateProductCount(productId, amount) {
    // ваш код
    // productId  = cartItem.product.id
    // amount = 1  -> this.cartItems.count + amount
    // amount = -1 -> this.cartItems.count - amount

    const finded = this.cartItems.find(item => item.product.id == productId);
    if (finded === undefined) { return; }
    finded.count += amount;


    if (finded.count === 0) {
      const index = this.cartItems.indexOf(finded);

      this.cartItems.splice(index, 1);
    }

    this.onProductUpdate(finded);


  }

  isEmpty() {
    // ваш код
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    // ваш код

    // return this.cartItems.length;
    return this.cartItems.reduce((accum, item) => { return (accum + item.count); }, 0);

  }

  getTotalPrice() {
    // ваш код
    // дз
    return this.cartItems.reduce((accum, item) => { return (accum + item.product.price * item.count); }, 0);

  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}



