//inventory of items for sale.
rawProducts = [
    {
        "id": 0,
        "name": "Product One",
        "price": 1.99
    }, 
    {
        "id": 1,
        "name": "Product Two",
        "price": 5.00
    }, 
    {
        "id": 2,
        "name": "Product Three",
        "price": 2.99
    }, 
    {
        "id": 3,
        "name": "Product Four",
        "price": 10.99
    } 
]

//our product class.
class Product {
    name;
    price;
    id;
    quantity = 1;

    constructor(args) {
        const {id, name, price} = args
        this.name = name;
        this.price = price;
        this.id = id;
    }

    setQuantity(newQuantity) {
        this.quantity = newQuantity;
    }
}

var basket = [];
const products = rawProducts.map(product => new Product(product));
document.addEventListener("DOMContentLoaded", function() { 
    renderProducts();
});

//** Basket functions **//

//trys to find existing item in basket to update quantity, if not its new and added to the basket.
function addItem(product) {
    var existingItem = basket.find(p => p.id == product.id);
    if (existingItem != undefined) {
        var newQuantity = (existingItem.quantity + 1);
        existingItem.setQuantity(newQuantity);
    } else {
        basket.push(product);
    }
    calculateTotal();
}

function removeItem(product) {
    var index = basket.findIndex(p => p.id == product.id);
    basket.splice(index, 1);
    calculateTotal();
}

//event listened for product quantity update.
function editBasketItemQuantity(product, quantity) {
    const value = parseInt(quantity);
    if (value == 0) {
        removeItem(product);
    } else {
        product.setQuantity(value)
        calculateTotal();
    }
}

function emptyBasket() {
    basket = [];
    calculateTotal();
}

function calculateTotal() {
    var currentCost = 0;
    basket.forEach(product => {
        currentCost += product.price * product.quantity;
    });
    //round our cost to 2 decimal places.
    currentCost = currentCost.toFixed(2);
    renderBasket(currentCost);
}

/*** OUR TEMPLATE RENDER FUNCTIONS ***/

//iterates over our products creating a div block for each.
function renderProducts() {
    const template = document.getElementById('product-item');
    const list = document.getElementById('product-list');

    products.forEach(product => {
        const clone = document.importNode(template.content, true);
        const div = clone.childNodes[1];
        const childNodes = div.children;

        childNodes[0].innerHTML = product.name;
        childNodes[1].innerHTML = "cost - " + "£" + product.price;
        childNodes[2].onclick = function() { addItem(product) };
        list.appendChild(clone);
    })
}

//iterates over the products in our basket and renders them out in a list with quantity and cost.
function renderBasket(cost) {

    //wipes our current basket.
    const basketList = document.getElementById("basket-list");
    while(basketList.firstChild) {
        basketList.removeChild(basketList.firstChild);
    }

    const template = document.getElementById('basket-item');
    const list = document.getElementById('basket-list');

    basket.forEach(product => {
        const clone = document.importNode(template.content, true);
        const childNodes = clone.children;

        childNodes[0].innerHTML = product.name;
        childNodes[2].value = product.quantity;
        childNodes[2].addEventListener('input', function() { editBasketItemQuantity(product, this.value) });
        list.appendChild(clone);
    });
    const total = document.getElementById('total');
    total.innerHTML = 'Total Cost: £' + cost;
}