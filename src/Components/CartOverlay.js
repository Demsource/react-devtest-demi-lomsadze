import React, { Component } from "react";
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
      resetCartProducts,
      activeCurrency,
    } = this.props;

    return (
      <li className="cart-icon">
        <img
          src="/icons/Icon-Empty Cart.svg"
          alt="cart icon"
          onClick={() =>
            location.pathname !== "/cart"
              ? this.props.toggleCartOverlay()
              : navigate("/cart")
          }
        />
        {cartProducts.length ? (
          <div
            className="cart-products-count"
            onClick={() =>
              location.pathname !== "/cart"
                ? this.props.toggleCartOverlay()
                : navigate("/cart")
            }
          >
            <span>{cartProducts.length}</span>
          </div>
        ) : null}
        <div
          className="cart-overlay"
          style={{ display: this.props.hiddenCartOverlay ? "none" : "flex" }}
        >
          <p className="total-items">
            <strong>My bag,</strong>{" "}
            <span>{totalsAmountSum(cartProducts)} items</span>
          </p>
          <div className="cart-overlay-products">
            {cartProducts.length ? (
              cartProducts
                .slice(0, 3)
                .map((product) => (
                  <CartProduct
                    key={product.cartProductId}
                    product={product}
                    updateCartProduct={updateCartProduct}
                    overlayView={true}
                    currencySymbol={activeCurrency.symbol}
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
                  this.props.hideActions();
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
