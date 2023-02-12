import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../components/ModalWindow/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    let cartItem  = {}
    if (product) {
    let newProduct = this.cartItems.find(item => item.product == product)
      if (newProduct){
        newProduct.count++
        cartItem = newProduct
      }
      else {
        cartItem  = {
          product: product,
          count: 1
        }
        this.cartItems.push(cartItem)
        }
      }
    this.onProductUpdate(cartItem)
  }

  updateProductCount(productId, amount) {
    let cartItem = {}
    let newProduct = this.cartItems.find(item => item.product.id == productId)
    if (newProduct){
      newProduct.count += amount
      cartItem = newProduct
    }
    if (cartItem.count == 0) {
      this.cartItems.pop(cartItem)
      cartItem = {}
    }

    this.onProductUpdate(cartItem)
  }

  isEmpty() {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    if (this.cartItems.length < 1) return true
    else return false
  }

  getTotalCount() {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    let totalCount = 0
    for (let item of this.cartItems) {
      totalCount += item.count
    }
    return totalCount
  }

  getTotalPrice() {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    let totalPrice = 0
    for (let item of this.cartItems) {
      totalPrice += item.count*item.product.price
    }
    return totalPrice
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
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
      this.modal = new Modal();
      this.modal.setTitle('Your order');
      this.modalBody = createElement(`<div></div`)
      this.cartItems.forEach(item => this.modalBody.append(this.renderProduct(item.product, item.count)))
      this.modalBody.append(this.renderOrderForm())
      this.modalBody.addEventListener("click", this.onModalBodyClick);
      this.modal.setBody(this.modalBody)
      // when modal is closed, we forget about it, don't update it any more
      // this.modal.elem.addEventListener('modal-close', () => {
      //   this.modal = null;
      //   this.modalBody = null;
      // });
      this.modal.open();
  }
  onModalBodyClick = (event) => {
  if (event.target.closest(".cart-counter__button")) {
    let productElem = event.target.closest("[data-product-id]");
    let productId = productElem.dataset.productId;
    this.modalBody.querySelector("form").onsubmit = (event) => this.onSubmit(event);
    this.updateProductCount(
      productId,
      event.target.closest(".cart-counter__button_plus") ? 1 : -1
    );
  }
}


  onProductUpdate({product, count}) {
    // ...ваш код
    this.cartIcon.update(this);
    if (!this.modal || !document.body.classList.contains('is-modal-open')) {
      return;
    }
    if(this.cartItems.length == 0){
      this.modal.close();
      return
    }
    if (count == 0){
      this.modalBody.querySelector(`[data-product-id]="${product.id}"]`).remove()
    }
    else {
      this.modalBody.querySelector(`[data-product-id="${product.id}"] .cart-counter__count`).innerHTML = count
      this.modalBody.querySelector(`[data-product-id="${product.id}"] .cart-product__price`).innerHTML = '€'+ (count * product.price).toFixed(2)
    }
    this.modalBody.querySelector('.cart-buttons__info-price').innerHTML = '€'+ this.getTotalPrice().toFixed(2)
    
  }

  async onSubmit(event) {
      event.preventDefault();
  
      this.modalBody
        .querySelector('button[type="submit"]')
        .classList.add("is-loading");
      let form = this.modalBody.querySelector('.cart-form');
      let userData = new FormData(form);
  
      await fetch('https://httpbin.org/post', { method: 'POST', body: userData });
  
      this.modal.setTitle("Success!");
      this.modalBody
        .querySelector('button[type="submit"]')
        .classList.remove("is-loading");
  
      this.cartItems = [];
      this.cartIcon.update(this);
  
      this.modalBody.innerHTML = `
        <div class="modal__body-inner">
          <p>
            Order successful! Your order is being cooked :) <br>
            We’ll notify you about delivery time shortly.<br>
            <img src="/assets/images/delivery.gif">
          </p>
        </div>
      
        `
    }
  

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }

}