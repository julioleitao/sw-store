import React, { Component } from 'react';
import { Table} from 'react-bootstrap';
import _ from 'lodash';
import ProductForm from '../../components/ProductForm'
import axios from 'axios';
import centsToDollar from '../../helpers/money';

const getPromoName = (promotions, promotion_id) => {
    if (!promotion_id || _.isEmpty(promotions)) {
        return "-";
    }
    return _.find(promotions, (promotion) => promotion.id === promotion_id).name;
};

const productToRow = (promotions, product, props) => {
    return <tr key={product.id}>
        <td  className="text-center">
            <span>{product.name}</span>
        </td>
        <td className="text-center">
            <span>{centsToDollar(product.price)}</span>
        </td>
        <td className="text-center">
            <span>{getPromoName(promotions, product.promotion_id)}</span>
        </td>
        <td className="text-center">
        <input onClick={(e) => props.handlersProduct.updateProduct(product)} value={false} type="checkbox"/>            
        </td>
        <td className="text-center">
        <input onClick={() => props.handlersProduct.removeProduct(product)} type="checkbox"/>            
        </td>
    </tr>
};

class CatalogAdminPage extends Component {

    render = () => {
        if (_.isEmpty(this.props.products)) {
            return <div className="container">
                <h3>O catálogo está vazio.</h3>
                <ProductForm handlersProduct={this.props.handlersProduct} product={this.props.product} promotions={this.props.promotions}/>
            </div>;
        }

        return <div className="container">
            <ProductForm handlersProduct={this.props.handlersProduct} product={this.props.product} promotions={this.props.promotions}/>
            <Table size="sm" responsive="sm" striped bordered hover>
                <thead>
                    <tr>
                        <th className="text-center">Produto</th>
                        <th className="text-center">Preço Unitário</th>
                        <th className="text-center">Promoção</th>
                        <th className="text-center">Editar</th>
                        <th className="text-center">Remover</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.products.map((produto) => productToRow(this.props.promotions, produto, this.props))
                    }
                </tbody>
            </Table>
            <br />

        </div>
    }
}

export default CatalogAdminPage;
