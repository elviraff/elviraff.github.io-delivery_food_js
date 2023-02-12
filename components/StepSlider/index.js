import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  #container = null
  stepsElem = ''
  leftRelative = 0
  constructor({ steps, value = 0 }) {
    this.steps = steps
    this.value = value
    this.render()
  };

  get elem() {
    return this.#container
  };
  render(){
    this.#container = createElement(this.#html())
    this.perc = this.value/(this.steps-1)*100
    this.#changeSlider()
    this.#container.ondragstart =  () => false
    this.#container.addEventListener('pointerdown', this.moveSlider)
    this.#container.addEventListener('click', this.#onSlider)
  };
  #html(){
    for (let i = 1; i <= this.steps; i++){
      this.stepsElem += `<span></span>`
    }
   return `
    <div class="slider">
      <!--Ползунок слайдера с активным значением-->
      <div class="slider__thumb" style="left: 50%;">
      <span class="slider__value">2</span>
      </div>

      <!--Заполненная часть слайдера-->
      <div class="slider__progress" style="width: 50%;"></div>

      <!--Шаги слайдера-->
      <div class="slider__steps">`+ this.stepsElem +`
      </div>
    </div>`
  };
  moveSlider = () => {
    const onMove = (event) => {
      let left= event.clientX -this.#container.getBoundingClientRect().left
      let leftRelative = left / this.#container.offsetWidth

      if (leftRelative < 0) {
        leftRelative = 0
      }
      if (leftRelative > 1) {
        leftRelative = 1
      }
      this.perc = leftRelative *100
      this.value = Math.round(leftRelative * (this.steps - 1))

      this.#container.classList.add('slider_dragging')
      this.#changeSlider()
    }

    document.addEventListener('pointermove', onMove)
    document.addEventListener('pointerup', () => {
      document.removeEventListener('pointermove', onMove);
      this.#container.classList.remove('slider_dragging');
      const dragChange = new CustomEvent('slider-change', {
        bubbles: true,
        detail: this.value
      })
      this.#container.dispatchEvent(dragChange);
    }, { once: true})
  }
  #changeSlider = () =>{
    this.#container.querySelector('.slider__value').innerHTML = this.value
    this.#container.querySelector('.slider__thumb').style.left = `${this.perc}%`
    this.#container.querySelector('.slider__progress').style.width = `${this.perc}%`
    this.sliderSteps = this.#container.querySelector('.slider__steps')
    if (!this.sliderSteps.querySelector('.slider__step-active')) {
      this.sliderSteps.childNodes[this.value].classList.add('slider__step-active')
      }
    else {
      this.sliderSteps.querySelector('.slider__step-active').classList.remove('slider__step-active')
      this.sliderSteps.childNodes[this.value].classList.add('slider__step-active')
      }
    }

    #onSlider = (event) => {
      const width = this.#container.offsetWidth
      const segmentsLenght = width/(this.steps-1)
      let point= event.clientX -this.#container.getBoundingClientRect().left
      this.value = Math.round(point/segmentsLenght)
      this.perc = this.value/(this.steps-1)*100

      this.#changeSlider()
  
      const sliderChange = new CustomEvent('slider-change', {
        bubbles: true,
        detail: this.value
      })
      this.#container.dispatchEvent(sliderChange);
    }

}
