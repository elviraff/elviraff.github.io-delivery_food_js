import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  #parent = null;
  constructor(categories) {
    this.categories = categories;
    this.render();
    this.#clickButtons();
  };

  get elem(){
    return this.#parent
  };
  render(){
    this.#parent= createElement(this.#html())
  };
  #html(){
    return `
    <div class="ribbon">
      <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>  
      <nav class="ribbon__inner">`+
    this.categories.map(item => 
      `<a href="#" class="ribbon__item" data-id="${item.id}">${item.name}</a>`
    ).join("") + `</nav>
      <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    </div>`
  };
  #getScrollLeft = () => {
    return this.#parent.querySelector('.ribbon__inner').scrollLeft;
  };
  #getLeftButton = () => {
    return this.#parent.querySelector('.ribbon__arrow_left')
  }
  #disableLeftButton = () =>{
    this.#getLeftButton().style.display = 'none'
  }
  #enableLeftButton = () => {
    this.#getLeftButton().style.display = ''
  }
  #getRightButton = () => {
    return this.#parent.querySelector('.ribbon__arrow_right')
  }
  #disableRightButton = () =>{
    this.#getRightButton().style.display = 'none'
  }
  #getRibbonInner = () => {
    return this.#parent.querySelector('.ribbon__inner')
  }
  #clickButtons(){
    this.#getRightButton().addEventListener('click', this.#onRightButton)
    this.#getLeftButton().addEventListener('click', this.#onLeftButton)
    if (this.#getScrollLeft() == 0){
      this.#disableLeftButton()
    }
    this.#getRibbonInner().addEventListener('click', this.#onProductClick)
  };
  #onRightButton = () => {
    this.#getRibbonInner().scrollBy(350, 0);
    this.#enableLeftButton()
    if ((this.#getRibbonInner().scrollWidth-this.#getScrollLeft()-this.#getRibbonInner().clientWidth) == 0){
      this.#disableRightButton()
    }
  };
  #onLeftButton = () => {
    if (this.#getScrollLeft() == 0){
      this.#disableLeftButton()
    }
    this.#getRibbonInner().scrollBy(-350, 0);
  }
  #onProductClick = (event) => {
    const activeProduct = event.currentTarget.querySelector('.ribbon__item_active')
    const clickEvent = new CustomEvent('ribbon-select', {
      bubbles: true,
      detail: event.target.dataset.id
    })
    if (!activeProduct){
      event.target.classList.add('ribbon__item_active')
    }
    else {
      activeProduct.classList.remove('ribbon__item_active')
      event.target.classList.add('ribbon__item_active')
    }
    this.#parent.dispatchEvent(clickEvent);
  }
}


