import React from 'react';
import Product from '../Product';
import _ from 'lodash';

const productsToRow = (products, index, onClickBuy) => {
    return (
        <div key={index} className="row hidden-md-up">
        {
            products.map((product) => {
                return <div key={product.id} className="col-md-3">
                    <Product onClickBuy={onClickBuy} data={product} />
                    <br />
                </div>
            })
        }
    </div>
    );
};

function Catalog(props) {
    return (
            <div className="container">
                {
                    _.chunk(props.data, 4).map((row, index) => {
                        return productsToRow(row, index, props.onClickBuy);
                    })
                }
            </div>
    );
}

export default Catalog;
