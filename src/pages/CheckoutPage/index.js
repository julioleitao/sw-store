import React, { Component } from 'react';
import BackPageButton from '../../components/BackPageButton';
import CheckoutProducts from '../../components/CheckoutProducts';
import { Button, Card } from 'react-bootstrap';
import _ from 'lodash';
import axios from 'axios';
import centsToDollar from '../../helpers/money';

class CheckoutPage extends Component {

    back() {
        window.history.back();
    }

    render() {
        if (_.isEmpty(this.props.checkout)) {
            return <div className="container">
                <BackPageButton />
                <br />
                <br />
                <h3>O carrinho está vazio.</h3>
            </div>;
        }

        return <div className="container">
            <BackPageButton />
            <br />
            <br />
            <CheckoutProducts promotions={this.props.promotions}
                data={this.props.checkout}
                updateProductQuantity={this.props.updateProductQuantity}
                removeProductFromCheckout={this.props.removeProductFromCheckout} />
            <br />
            <br />
            <Button onClick={() => this.props.clearCheckout()} variant="light" className="float-left">
                <i className="glyphicon glyphicon-trash">&ensp;</i>
                LIMPAR CARRINHO
            </Button>
            <Card className="float-right" style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>TOTAL</Card.Title>
                    <Card.Text>
                        {centsToDollar(this.props.totalPrice)}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    }
}

export default CheckoutPage;
