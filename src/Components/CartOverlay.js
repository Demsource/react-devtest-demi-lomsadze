import React, { Component } from "react";
import "../css/CartProductExtraActions.css";
import totalsAmountSum from "../helpers/totalsAmountSum";
import totalsPriceSum from "../helpers/totalsPriceSum";
import CartProduct from "./CartProduct";

export default class CartOverlay extends Component {
  render() {
    const {
      navigate,
      location,
      cartProducts,
      updateCartProduct,
      deleteCartProduct,
      resetCartProducts,
      activeCurrency,
      hiddenCartOverlay,
      toggleCartOverlay,
      hideActions,
    } = this.props;

    return (
      <li className="cart-icon">
        <img
          src="/icons/Icon-Empty Cart.svg"
          alt="cart icon"
          onClick={() =>
            location.pathname !== "/cart"
              ? toggleCartOverlay()
              : navigate("/cart")
          }
        />
        {cartProducts.length ? (
          <div
            className="cart-products-count"
            onClick={() =>
              location.pathname !== "/cart"
                ? toggleCartOverlay()
                : navigate("/cart")
            }
          >
            <span>{totalsAmountSum(cartProducts)}</span>
          </div>
        ) : null}
        <div
          className="cart-overlay"
          style={{ display: hiddenCartOverlay ? "none" : "flex" }}
        >
          <p className="total-items">
            <strong>My bag,</strong>{" "}
            <span>{totalsAmountSum(cartProducts)} items</span>
          </p>
          <div className="cart-overlay-products">
            {cartProducts.length ? (
              cartProducts
                .slice(0, 3)
                .map((product, i) => (
                  <CartProduct
                    key={"product-item-" + i}
                    navigate={navigate}
                    product={product}
                    updateCartProduct={updateCartProduct}
                    overlayView={true}
                    currencySymbol={activeCurrency.symbol}
                    deleteCartProduct={deleteCartProduct}
                    hideActions={hideActions}
                  />
                ))
            ) : (
              <p className="no-products">No products in cart.</p>
            )}
          </div>
          <p className="total-price">
            <span>Total</span>
            <strong>
              {totalsPriceSum(cartProducts)} {activeCurrency.symbol}
            </strong>
          </p>
          {cartProducts.length ? (
            <div className="more-actions">
              <div
                className="btn view-bag"
                onClick={() => {
                  hideActions();
                  setTimeout(() => {
                    navigate("/cart");
                  }, 100);
                }}
              >
                View Bag
              </div>
              <div
                className="btn overlay-checkout"
                onClick={() => {
                  resetCartProducts();
                  navigate("/");
                  navigate(0);
                }}
              >
                Check Out
              </div>
            </div>
          ) : null}
        </div>
      </li>
    );
  }
}
