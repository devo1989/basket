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