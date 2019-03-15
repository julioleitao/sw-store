import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './index.css';
import centsToDollar from '../../helpers/money';

const inPromotionLabel = (product) => {
    return !product.promotion_id ? "" : ` Em oferta`;
};

function Product(props) {
    return (<Card border="dark" style={{ width: '26rem' }}>
        <Card.Img variant="top" src="http://placehold.it/213x168" />
        <Card.Body>
            <Card.Title>{props.data.name}</Card.Title>
            <Card.Subtitle>
                <b>{centsToDollar(props.data.price)}{inPromotionLabel(props.data)}</b>
            </Card.Subtitle> H
            <Card.Text>
                Product #{props.data.id} description Lorem ipsum dolor sit amet,
                consectetur
      </Card.Text>
        </Card.Body>
            <Button onClick={() => props.onClickBuy(props.data)} className="btn-flat">
                <i className="glyphicon glyphicon-shopping-cart">&ensp;</i>
                COMPRAR
            </Button>
    </Card>);
}

export default Product;