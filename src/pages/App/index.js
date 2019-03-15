import React, { Component } from 'react';
import './index.css';
import _ from 'lodash';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Main from '../Main';
import axios from 'axios';
import Client from '../../services/client';

/**
 * TODO refatorar para camada de negócio a lógica no App.
 */

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			products: [],
			checkout: [],
			total: 0,
			totalPrice: 0,
			promotions: [],
			product: _.clone(Client.emptyProduct())
		}
	}

	componentDidMount = () => {
		this.updateProducts();
		Client.getPromotions(res => {
			const promotions = res.data.data;
			this.setState({ promotions });
		});
	}

	totalQuantity = (checkout) => {
		const counts = _.map(checkout, (product) => product.quantity)
		return _.sum(counts);
	}

	updateProducts = () => {
		Client.getProducts(res => {
			const products = res.data.data;
			this.setState({ products, checkout: [], total: 0, totalPrice: 0, product: _.clone(Client.emptyProduct()) });
		});
	}

	updateTotalPrice = (checkout) => {
		Client.postCheckout(checkout, res => {
			this.setState({ totalPrice: res.data.data.total });
		});
	}

	addToCheckout = (product) => {
		this.setState((state, props) => {
			let checkout = state.checkout;
			let index = _.findIndex(checkout, (item) => item.id === product.id);

			if (index === -1) {
				checkout.push({ ...product, quantity: 0 })
				index = checkout.length - 1;
			}
			checkout[index].quantity++;


			toast.info("PRODUTO ADICIONADO AO CARRINHO!", {
				position: toast.POSITION.TOP_RIGHT
			});


			const total = this.totalQuantity(checkout);

			this.updateTotalPrice(checkout);
			return {
				checkout: checkout, total: total
			};
		})
	}

	clearCheckout = () => {
		this.setState({ checkout: [], total: 0, totalPrice: 0 });
	}

	removeProductFromCheckout = (removeProduct) => {
		this.setState((state, props) => {
			const checkout = _.reject(state.checkout, (product) => product.id === removeProduct.id);

			const total = this.totalQuantity(checkout);
			this.updateTotalPrice(checkout);
			return {
				checkout: checkout, total: total
			};
		});
	}

	addNewProduct = (product) => {
		this.setState((state, props) => {
			const products = state.products;
			products.push(product);

			return { products: products, product: _.clone(Client.emptyProduct()) };
		});
	}

	handlersProduct = {
		addProduct: () => {
			let product = this.state.product;
			let { name, price, promotion_id } = product;
			price = parseInt(parseFloat(price) * 100);
			product.price = price;

			if (product.id) {
				Client.updateProduct(product, res => {
					this.updateProducts();
				}, res => {
					toast.error("REGISTRO INVÁLIDO", {
						position: toast.POSITION.TOP_RIGHT
					});
				});
			} else {
				Client.postProduct({ name, price, promotion_id }, res => {
					this.addNewProduct(res.data.data);
				}, res => {
					toast.error("REGISTRO INVÁLIDO", {
						position: toast.POSITION.TOP_RIGHT
					});
				});
			}
		},
		removeProduct: (product) => {
			Client.deleteProduct(product, res => {
				this.updateProducts();
			})
		},
		updateProduct: (product) => {
			const editProduct = _.clone(product);
			editProduct.price = product.price / 100;
			this.setState((state, props) => {
				return {
					product: editProduct
				}
			});
		},
		handleChange: ({ target }) => {
			const { name, value } = target;
			this.setState((state, props) => {
				const { product } = state;
				product[name] = value;
				return { product };
			});
		}
	}

	updateProductQuantity = (updateProduct, value) => {
		this.setState((state, props) => {
			const checkout = state.checkout;

			const index = _.findIndex(checkout, product => product.id === updateProduct.id);
			checkout[index].quantity = parseInt(value);

			const total = this.totalQuantity(checkout);
			this.updateTotalPrice(checkout);
			return {
				checkout: checkout, total: total
			};

		});
	}

	render() {
		return (
			<div className="App">
				<Main promotions={this.state.promotions} product={this.state.product} handlersProduct={this.handlersProduct} totalPrice={this.state.totalPrice} updateProductQuantity={this.updateProductQuantity} removeProductFromCheckout={this.removeProductFromCheckout} quantity={this.state.total} onClickBuy={this.addToCheckout} products={this.state.products} checkout={this.state.checkout} clearCheckout={this.clearCheckout} />
				<ToastContainer autoClose={1500} />
			</div>
		);
	}
}

export default App;
