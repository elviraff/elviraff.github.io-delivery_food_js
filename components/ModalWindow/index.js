import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  #modal = null
  constructor() {
    this.render()
  }
#html(){
  return `
  <!--Корневой элемент Modal-->
    <div class="modal">
    <!--Прозрачная подложка перекрывающая интерфейс-->
    <div class="modal__overlay"></div>

      <div class="modal__inner">
        <div class="modal__header">
        <!--Кнопка закрытия модального окна-->
          <button type="button" class="modal__close">
            <img src="./assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>

          <h3 class="modal__title">
         
          </h3>
        </div>

        <div class="modal__body">
       
        </div>
      </div>

    </div>`
}
render(){
    this.#modal = createElement(this.#html())
}
open() {
  document.body.append(this.#modal)
  document.body.classList.add('is-modal-open')

  this.#modal.addEventListener('click', (event) => this.onClick(event))
  document.addEventListener('keydown', this.escape)
}
setTitle (title){
  this.#modal.querySelector('.modal__title').innerHTML = title
}
setBody (node) {
  const modalBody = this.#modal.querySelector('.modal__body')
  modalBody.innerHTML = ''
  modalBody.append(node)
}
close(){
  document.removeEventListener('keydown', this.escape);
  this.#modal.remove();
  document.body.classList.remove('is-modal-open')
}
onClick(event) {
  if (event.target.closest('.modal__close')){
    event.preventDefault();
    this.close();
  } 
}
escape = (event) => {
  if (event.code === 'Escape') {
    event.preventDefault();
    this.close()
  }
}
}
