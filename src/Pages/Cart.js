import React, { Component } from "react";
import "../css/Cart.css";
import { productsCartContext } from "../Contexts/ProductsCartStateProvider";
import CartProduct from "../Components/CartProduct";
import withRouter from "../helpers/withRouter";
import { currencyContext } from "../Contexts/ActiveCurrencyStateProvider";
import totalsPriceSum from "../helpers/totalsPriceSum";
import CartProductExtraActions from "../Components/CartProductExtraActions";
import EmptyCart from "../Components/EmptyCart";
import totalsAmountSum from "../helpers/totalsAmountSum";

class Cart extends Component {
  render() {
    const { navigate } = this.props.router;

    return (
      <div className="cart">
        <h1>Cart</h1>
        <currencyContext.Consumer>
          {(currencyValue) => (
            <productsCartContext.Consumer>
              {(productsCartValue) => {
                const {
                  productsCart,
                  updateCartProduct,
                  deleteCartProduct,
                  resetCartProducts,
                } = productsCartValue;

                if (!productsCart.length)
                  return <EmptyCart navigate={navigate} />;

                let groupSelections = {};

                productsCart?.forEach((product, i) => {
                  product?.payload?.baseAttrs?.forEach((attr) => {
                    groupSelections[product.id] = {
                      ...groupSelections[product.id],
                      ["group-" + (i + 1)]: {
                        ...groupSelections[product.id]?.["group-" + (i + 1)],
                        [attr.id]: product[attr.id],
                      },
                    };
                  });
                });

                const CartProducts = productsCart?.map((product, i) => {
                  return (
                    <div
                      className="cart-product-wrapper"
                      key={`${product.id}-${i}`}
                    >
                      <div className="cp-90">
                        <CartProduct
                          product={product}
                          updateCartProduct={updateCartProduct}
                          groupSelections={groupSelections}
                          currencySymbol={currencyValue.activeCurrency.symbol}
                        />
                      </div>
                      <CartProductExtraActions
                        navigate={navigate}
                        id={product.id}
                        cartProductId={product.cartProductId}
                        deleteCartProduct={deleteCartProduct}
                      />
                    </div>
                  );
                });

                return (
                  <>
                    {CartProducts}

                    {productsCart.length ? (
                      <div className="cart-checkout">
                        <div className="sum">
                          {totalsAmountSum(productsCart)} items{" "}
                          {totalsPriceSum(productsCartValue.productsCart)}{" "}
                          {currencyValue.activeCurrency.symbol} in total.
                        </div>
                        <div
                          className="btn"
                          onClick={() => {
                            resetCartProducts();
                            navigate("/");
                            navigate(0);
                          }}
                        >
                          CHECK OUT
                        </div>
                      </div>
                    ) : null}
                  </>
                );
              }}
            </productsCartContext.Consumer>
          )}
        </currencyContext.Consumer>
      </div>
    );
  }
}

export default withRouter(Cart);
