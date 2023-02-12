import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  updatePosition() {

    if (!this.elem.offsetHeight) {return;} // not visible

    if (!this.initialTopCoord) {
      this.initialTopCoord = this.elem.getBoundingClientRect().top + window.pageYOffset;
    }

    if (document.documentElement.clientWidth <= 767) {
      // mobile: cart is always fixed
      this.resetPosition();
      return;
    }

    let isHeaderCartScrolled = window.pageYOffset > this.initialTopCoord;

    if (isHeaderCartScrolled) {
      this.fixPosition();
    } else {
      this.resetPosition();
    }
  }

  fixPosition() {
    Object.assign(this.elem.style, {
      position: 'fixed',
      top: '50px',
      zIndex: 1e3,
      left: Math.min(
        // справа от содержимого (определяем по первому контейнеру в нашей вёрстке)
        document.querySelector('.container').getBoundingClientRect().right + 20,
        document.documentElement.clientWidth - this.elem.offsetWidth - 10
      ) + 'px'
    });
  }

  resetPosition() {
    Object.assign(this.elem.style, {
      position: '',
      top: '',
      left: '',
      zIndex: ''
    });
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
    // позицирование по Y

    let isMobile = document.documentElement.clientWidth <= 767;
    if (!this.initialTopCoord) {
      this.initialTopCoord = this.elem.getBoundingClientRect().top + window.pageYOffset;
    }

// Если условие выполняется, обнуляем стили к исходным
  if (document.documentElement.clientWidth <= 767) {
    Object.assign(this.elem.style, {
      position: '',
      top: '',
      left: '',
      zIndex: ''
    });
  } else
    if (this.elem.offsetWidth != 0  && this.elem.offsetHeight != 0){
      let topCoord = this.initialTopCoord;
          //позиционирование по X    
    let leftCoord = Math.min(
      document.querySelector('.container').getBoundingClientRect().right + 20,
      document.documentElement.clientWidth - this.elem.offsetWidth - 10
    ) + 'px'

      if (window.pageYOffset > topCoord){
        Object.assign(this.elem.style, {
          position: 'fixed',
          top: '50px',
          zIndex: 1e3,
          right: '10px',
          left: leftCoord
        });
        console.log(document.querySelector('.container').getBoundingClientRect().right, leftCoord)
      }
      else 
      Object.assign(this.elem.style, {
        position: '',
        top: '',
        left: '',
        zIndex: ''
      });
    }


  }
}
