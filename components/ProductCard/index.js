import createElement from '../../assets/lib/create-element.js'

export default class ProductCard {
  #product = {}
  #parent = null
  constructor(product) {
    this.#product = product;
    this.render()
  };
  render(){
    this.#parent = createElement(this.#html())
    this.#parent.querySelector('.card__button').addEventListener('click', this.#onButtonClick)
  };
  #onButtonClick = () => {
    const clickEvent = new CustomEvent("product-add", {
      bubbles: true,
      detail: this.#product.id
    });
    this.#parent.dispatchEvent(clickEvent);
  }

  get elem(){
    return this.#parent
  }
#html(){
  return `
  <div class="card">
    <div class="card__top">
        <img src="/assets/images/products/${this.#product.image}" class="card__image" alt="product">
        <span class="card__price">€${this.#product.price.toFixed(2)}</span>
    </div>
    <div class="card__body">
        <div class="card__title">${this.#product.name}</div>
        <button type="button" class="card__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
    </div>
  </div>
  `
  };
}