import React from 'react';
import Catalog from '../../components/Catalog';
import _ from 'lodash';

function CatalogView(props) {
  if (_.isEmpty(props.products)) {
    return <h3>A loja está sem produtos no catágolo.</h3>;
  }
  return <Catalog onClickBuy={props.onClickBuy} data={props.products} />;
}

export default CatalogView;
