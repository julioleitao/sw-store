import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import _ from 'lodash';
import centsToDollar from '../../helpers/money';

const getPromoName = (promotions, promotion_id) => {
    if (!promotion_id || _.isEmpty(promotions)) {
        return "-";
    }
    return _.find(promotions, (promotion) => promotion.id === promotion_id).name;
};

class CheckoutProducts extends Component {
    createProductRow = (product) =>
        <tr key={product.id}>
            <td >{product.name}</td>
            <td >
                <input onChange={e => this.props.updateProductQuantity(product, e.target.value)} style={{ width: "15%" }} defaultValue={product.quantity} min="1" type="number" />
            </td>
            <td >{centsToDollar(product.price)}</td>
            <td >
                {
                    getPromoName(this.props.promotions, product.promotion_id)
                }
            </td>
            <td>
                <input onClick={() => this.props.removeProductFromCheckout(product)} type="checkbox" />
            </td>
        </tr>;


    render() {
        return <div>
            <Table size="sm" responsive="sm" striped bordered hover>
                <thead>
                    <tr>
                        <th className="text-center">Produto</th>
                        <th className="text-center">Quantidade</th>
                        <th className="text-center">Preço Unitário</th>
                        <th className="text-center">Promoção</th>
                        <th className="text-center">Remover</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.data.map((produto) => this.createProductRow(produto))}
                </tbody>
            </Table>
            <br />

        </div>;
    }
}

export default CheckoutProducts;