import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  #parent = null
  slides = []
  carouselElement = null
  position = 0
  count = 0
  arrowRight = null
  arrowLeft = null
  lenght = 0

  constructor(slides) {
    this.slides = slides;
    this.render()
    this.slider()
    this.lenght = this.slides.length
    this.count = this.lenght - 1
  }
  render(){
  this.#parent = createElement(this.#html())
  for (let key of this.#parent.querySelectorAll('.carousel__button')) {
    key.addEventListener('click', this.#onButtonCarouselClick)
  }
  }

  slider(){
    this.carouselElement= this.#parent.querySelector(".carousel__inner")
    this.arrowRigth = this.#parent.querySelector(".carousel__arrow_right")
    this.arrowRigth.addEventListener('click', this.#onRightButton)
    this.arrowLeft = this.#parent.querySelector(".carousel__arrow_left")
    this.arrowLeft.addEventListener('click', this.#onLeftButton)
    this.arrowLeft.style.display = 'none' 
  }

  get elem(){
    return this.#parent
  };
  #html(){
    return `  
    <div class="carousel">
    <div class="carousel__arrow carousel__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </div>
    <div class="carousel__arrow carousel__arrow_left">
      <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
    </div>

    <div class="carousel__inner">`+
      this.slides.map(item =>
    `
    <div class="carousel__slide" data-id='${item.id}'>
      <img src="/assets/images/carousel/${item.image}" class="carousel__img" alt="slide">
      <div class="carousel__caption">
        <span class="carousel__price">€${item.price.toFixed(2)}</span>
        <div class="carousel__title">${item.name}</div>
        <button type="button" class="carousel__button">
        <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div>
    </div>
  `).join("")+`
  </div>`
};

  #onRightButton = () => {
    this.arrowLeft.style.display = ''
    this.position = Math.min(0, this.carouselElement.offsetWidth*(this.count-this.slides.length))
    this.carouselElement.style.transform = 'translateX('+ this.position + 'px)'
    if (this.count > 1) this.count--
    else this.arrowRigth.style.display = 'none'
  }

  #onLeftButton = () => {
    this.arrowRigth.style.display = ''
    this.position = Math.min(0, this.carouselElement.offsetWidth*((this.count+1)-this.slides.length))
    this.carouselElement.style.transform = 'translateX('+ this.position + 'px)'
    if (this.count < this.slides.length - 1) this.count++
    else this.arrowLeft.style.display = 'none'
  }
  #onButtonCarouselClick = (event) => {
    const clickEvent = new CustomEvent("product-add",  {
      bubbles: true,
      detail: event.currentTarget.closest('.carousel__slide').dataset.id
    });
    this.#parent.dispatchEvent(clickEvent);
  }
}
