import React, { Component } from 'react';
import { Nav, Navbar, Form, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const carStatus = (quantity) => {
    let label = "MEU CARRINHO";
    if (quantity !== 0) {
        label = `${label} (${quantity})`
    }

    return label;
};

class ShopNavBar extends Component {
    render() {
        return (<Navbar fixed="top" bg="light" variant="light">
            <LinkContainer to="/">
                <Navbar.Brand>SW Store</Navbar.Brand>
            </LinkContainer>
            <Nav className="mr-auto">
                <LinkContainer to="/catalog-admin">
                    <Nav.Link>Administrar catálogo</Nav.Link>
                </LinkContainer>
            </Nav>
            <Form inline>
                <LinkContainer to="/checkout">
                    <Button size="large" variant="primary">
                        <i className="glyphicon glyphicon-shopping-cart">&ensp;</i>
                        {carStatus(this.props.quantity)}
                    </Button>
                </LinkContainer>
            </Form>
        </Navbar>);
    }
}

export default ShopNavBar;