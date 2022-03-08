import React, { Component } from "react";
import { currencyContext } from "../Contexts/ActiveCurrencyStateProvider";
import withRouter from "../helpers/withRouter";
import Products from "../Components/Products";

class ProductListingPage extends Component {
  render() {
    return (
      <div className="plp">
        <currencyContext.Consumer>
          {(value) => (
            <Products
              currentCurrency={value.activeCurrency}
              navigate={this.props.router.navigate}
            />
          )}
        </currencyContext.Consumer>
      </div>
    );
  }
}

export default withRouter(ProductListingPage);
