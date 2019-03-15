import React, {Component} from 'react';
import Button from 'react-bootstrap/Button'

/**
 * Botão para retornar para uma página anterior baseado no 
 * histórico do usuário.
 */
class BackPageButton extends Component {
    back() {
        window.history.back();
    }

    render() {
        return <Button className="float-left" onClick={() => this.back()}>
            <i className="glyphicon glyphicon-circle-arrow-left">&ensp;</i>
                VOLTAR
            </Button>
    }
}

export default BackPageButton;
