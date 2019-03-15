import React from 'react'
import { Switch, Route } from 'react-router-dom'
import CatalogView from '../CatalogView'
import CheckoutPage from '../CheckoutPage'
import CatalogAdminPage from "../CatalogAdminPage"
import ShopNavBar from '../../components/ShopNavBar';

const Main = (propsParent) =>
    <main>
        <ShopNavBar quantity={propsParent.quantity}/>
        <Switch>
            <Route path="/"
                exact={true}
                render={(props) => <CatalogView {...props} 
                onClickBuy={propsParent.onClickBuy} 
                products={propsParent.products} />} />
            <Route path="/checkout"
                exact={true}
                render={(props) => <CheckoutPage {...props} 
                totalPrice={propsParent.totalPrice} 
                updateProductQuantity={propsParent.updateProductQuantity} 
                promotions={propsParent.promotions} 
                removeProductFromCheckout={propsParent.removeProductFromCheckout} 
                clearCheckout={propsParent.clearCheckout} 
                checkout={propsParent.checkout} />} />
            <Route path="/catalog-admin"
                exact={true}
                render={(props) => <CatalogAdminPage {...props} 
                product={propsParent.product}
                handlersProduct={propsParent.handlersProduct} 
                promotions={propsParent.promotions} 
                products={propsParent.products} />} />
        </Switch>
    </main>


export default Main
