import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../components/ProductCard/index.js';

export default class ProductGrid {
  #container = null
  filteredProducts = []
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.#render()
  }

  #html(){
    return `
    <div class="products-grid">
      <div class="products-grid__inner">
        <!--ВОТ ТУТ БУДУТ КАРТОЧКИ ТОВАРОВ-->
      </div>
    </div>
    `
  }
#render(){
  this.#container = createElement(this.#html())
  this.renderList(this.products)
}
renderList(productsList){
    productsList.map(item => {
    let card = new ProductCard(item)
    this.#container.querySelector('.products-grid__inner').append(card.elem)
  }
    )
}
get elem(){
  return this.#container
}
updateFilter(filters) {
  this.filters = Object.assign(this.filters, filters)

  let nuts =  this.filters.noNuts
  let veg = this.filters.vegeterianOnly
  let spicy =  this.filters.maxSpiciness
  let category =  this.filters.category
  
  this.filteredProducts = this.products.filter(item => (
      (!nuts || item["nuts"] !== nuts) &&
      (!veg || item["vegeterian"] == veg) &&
      (!category || item["category"] == category) &&
      (!spicy || item["spiciness"] <= spicy)
    ))

    this.#container.querySelector('.products-grid__inner').innerHTML =""
    this.renderList(this.filteredProducts)
    this.filteredProducts = []
    }




}