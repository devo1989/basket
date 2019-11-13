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