import axios from  'axios';

class Client {
    static emptyProduct = () => {
        return {
            "name": "",
            "price": "0.00",
            "promotion_id": undefined
        };   
    }
    
    static getPromotions = (callback) => {
        axios.get(`api/promotions`)
        .then(callback);
    }

    static getProducts = (callback) => {
        axios.get(`api/products`)
        .then(callback);
    }

    static postCheckout = (checkout, callback) => {
        axios.post(`/api/checkout`, { products: checkout }).then(callback);
    }

    static updateProduct = (product, callbackSucess, callbackError) => {
        axios.put(`api/products/${product.id}`, product)
        .then(callbackSucess, callbackError);
    }

    static postProduct = (product, callbackSucess, callbackError) => {
        axios.post(`api/products`, product)
        .then(callbackSucess, callbackError);
    }

    static deleteProduct = (product, callback) => {
        axios.delete(`api/products/${product.id}`)
        .then(callback);
    } 
}

export default Client;
