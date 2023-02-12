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
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>

          <h3 class="modal__title">
          Вот сюда нужно добавлять заголовок
          </h3>
        </div>

        <div class="modal__body">
        A сюда нужно добавлять содержимое тела модального окна
        </div>
      </div>

    </div>`
}
render(){
    this.#modal = createElement(this.#html())
}
open() {
  document.querySelector('body').append(this.#modal)
  document.querySelector('body').classList.add('is-modal-open')
  this.#modal.querySelector('.modal__close').addEventListener('click', () => this.close())
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
  this.#modal.remove()
  document.querySelector('body').classList.remove('is-modal-open')
}
escape = (event) => {
  if (event.code === 'Escape') {
    this.#modal.remove()
    document.querySelector('body').classList.remove('is-modal-open')
  }
}
}
