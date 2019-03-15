import React, { Component } from 'react';
import { Button, Form, Card } from 'react-bootstrap';
import _ from 'lodash';
import CurrencyInput from 'react-currency-input';

class ProductForm extends Component {
    constructor(props) {
        super(props)
    }

    handleRegister = () => {
        this.props.handlersProduct.addProduct();
    }

    handleChange(e) {
        this.props.handlersProduct.handleChange(e);
    }

    render = () => {
        return <Card>
            <Card.Body>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control name={"name"} onChange={(e) => this.handleChange(e)} value={this.props.product.name} type="text" placeholder="Nome do produto" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Preço R$</Form.Label>
                        &nbsp;
                        <CurrencyInput name={"price"} onChangeEvent={(e) => this.handleChange(e)} value={this.props.product.price} />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Promoção</Form.Label>
                        <Form.Control name={"promotion_id"} onChange={(e) => this.handleChange(e)} value={this.props.product.promotion_id} as="select">
                            <option value={""}>-</option>
                            {
                            this.props.promotions.map((promotion) => {
                                return <option value={promotion.id} key={promotion.id}>{promotion.name}</option>
                            })
                            }
                        </Form.Control>
                    </Form.Group>
                </Form>

                <Button onClick={() => this.handleRegister()} variant="primary">Salvar</Button>
            </Card.Body>
        </Card>;
    }
}


export default ProductForm;
