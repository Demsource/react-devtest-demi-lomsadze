import React, { Component } from "react";
import { currencyContext } from "../Contexts/ActiveCurrencyStateProvider";
import { productsCartContext } from "../Contexts/ProductsCartStateProvider";
import withRouter from "../helpers/withRouter";
import Product from "../Components/Product";

class ProductDescriptionPage extends Component {
  render() {
    return (
      <div className="pdp">
        {
          <productsCartContext.Consumer>
            {(productsCartValue) => (
              <currencyContext.Consumer>
                {(value) => (
                  <Product
                    productsCart={productsCartValue.productsCart}
                    addToProductsCart={productsCartValue.addToProductsCart}
                    currentCurrency={value.activeCurrency}
                    navigate={this.props.router.navigate}
                  />
                )}
              </currencyContext.Consumer>
            )}
          </productsCartContext.Consumer>
        }
      </div>
    );
  }
}

export default withRouter(ProductDescriptionPage);
