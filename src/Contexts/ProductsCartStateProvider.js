import React, { Component } from "react";
import { createContext } from "react";
import productsIsEqual from "../helpers/compareProdsAttrs";

export const productsCartContext = createContext();

export default class ProductsCartStateProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productsCart: [],
    };

    this.handleAddition = this.handleAddition.bind(this);
    this.updateCartProduct = this.updateCartProduct.bind(this);
    this.deleteCartProduct = this.deleteCartProduct.bind(this);

    this.updateCartProductsCurrency =
      this.updateCartProductsCurrency.bind(this);
    this.resetCartProducts = this.resetCartProducts.bind(this);
  }

  handleAddition(addedProduct) {
    this.setState((prevCartState) => {
      const prevProducts = prevCartState.productsCart;

      let simplyAmountChange = false;
      let prevProductsChecked = prevProducts.map((product) => {
        if (productsIsEqual(product, addedProduct)) {
          simplyAmountChange = true;
          return {
            ...product,
            amount: product.amount + 1,
          };
        } else {
          return product;
        }
      });

      if (simplyAmountChange) return { productsCart: prevProductsChecked };

      return { productsCart: [...prevProducts, addedProduct] };
    });
  }

  updateCartProduct(updatedProduct) {
    this.setState((prevState) => ({
      productsCart: prevState.productsCart.map((inStateProduct) =>
        inStateProduct.id === updatedProduct.id &&
        inStateProduct.cartProductId === updatedProduct.cartProductId
          ? updatedProduct
          : inStateProduct
      ),
    }));
  }

  deleteCartProduct(deleteTargetProductId) {
    this.setState((prevState) => ({
      productsCart: prevState.productsCart.filter(
        (inStateProduct) =>
          inStateProduct.cartProductId !== deleteTargetProductId
      ),
    }));
  }

  updateCartProductsCurrency(currencyLabel) {
    this.setState((prevState) => ({
      productsCart: prevState.productsCart.map((inStateProduct) => {
        const basePrice = inStateProduct.payload.basePrices.filter(
          (basePrice) => basePrice.currency.label === currencyLabel
        )?.[0].amount;

        return {
          ...inStateProduct,
          currency: currencyLabel,
          price: basePrice,
        };
      }),
    }));
  }

  resetCartProducts() {
    this.setState({
      productsCart: [],
    });
  }

  render() {
    return (
      <productsCartContext.Provider
        value={{
          productsCart: this.state.productsCart,
          addToProductsCart: this.handleAddition,
          updateCartProduct: this.updateCartProduct,
          deleteCartProduct: this.deleteCartProduct,
          updateCartProductsCurrency: this.updateCartProductsCurrency,
          resetCartProducts: this.resetCartProducts,
        }}
      >
        {this.props.children}
      </productsCartContext.Provider>
    );
  }
}
