import React, { Component } from "react";
import "../css/CartProduct.css";
import "../css/CartProductExtraActions.css";
import Attribute from "./Attribute";
import attributesIsEqual from "../helpers/compareProdsAttrs";
import CartProductExtraActions from "./CartProductExtraActions";

export default class CartProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imagePreviewIndex: 0,
      productOptions: {},
      productDisplayImageCount: 0,
    };

    this.updateProductOptions = this.updateProductOptions.bind(this);
    this.componentStateUpdate = this.componentStateUpdate.bind(this);
  }

  componentDidMount() {
    this.componentStateUpdate();
  }

  componentDidUpdate() {
    let newProductOptions = {};

    this.props.product?.payload?.baseAttrs.forEach((attr) => {
      newProductOptions[attr.id] = this.props.product[attr.id];
    });

    if (!attributesIsEqual(this.state.productOptions, newProductOptions)) {
      this.componentStateUpdate();
    }
  }

  componentStateUpdate() {
    let newProductOptions = {};

    this.props.product?.payload?.baseAttrs.forEach((attr) => {
      newProductOptions[attr.id] = this.props.product[attr.id];
    });

    this.setState((prevState) => ({
      productOptions: { ...newProductOptions },
    }));
  }

  updateProductOptions(newOptions) {
    const updatedProduct = {
      ...this.props.product,
      ...newOptions,
    };

    this.props.updateCartProduct(updatedProduct);
  }

  slideProductImage(dirrection) {
    const gallery = this.props.product?.payload?.gallery;

    if (gallery.length) {
      switch (dirrection) {
        case "left":
          this.setState((prevState) => ({
            productDisplayImageCount:
              prevState.productDisplayImageCount > 0
                ? prevState.productDisplayImageCount - 1
                : gallery.length - 1,
          }));
          break;

        case "right":
          this.setState((prevState) => ({
            productDisplayImageCount:
              prevState.productDisplayImageCount !== gallery.length - 1
                ? prevState.productDisplayImageCount + 1
                : 0,
          }));
          break;
        default:
          this.setState({ productDisplayImageCount: 0 });
      }
    }
  }

  render() {
    const { deleteCartProduct, hideActions } = this.props;

    const { id, cartProductId, brand, name, price, amount, payload } =
      this.props.product;

    return (
      <div className="cart-product-wrapper">
        <div className="cp-90">
          <div className="cart-product">
            <div className="main-info">
              <h2>{brand}</h2>
              <h3>{name}</h3>
              <h4>
                {this.props?.currencySymbol} {price}
              </h4>
              <div className="attributes">
                {payload?.baseAttrs?.length ? (
                  !this.props?.overlayView ? (
                    payload.baseAttrs.map((attribute) => (
                      <Attribute
                        key={attribute.id}
                        data={attribute}
                        inStock={payload?.inStock}
                        selection={this.state.productOptions}
                        updateSelection={this.updateProductOptions}
                        groupSelections={this.props?.groupSelections}
                        productId={id}
                      />
                    ))
                  ) : (
                    <Attribute
                      key={payload.baseAttrs[0].id}
                      data={payload.baseAttrs[0]}
                      inStock={payload?.inStock}
                      selection={this.state.productOptions}
                      updateSelection={this.updateProductOptions}
                      groupSelections={this.props?.groupSelections}
                      productId={id}
                      overlayView={this.props.overlayView}
                    />
                  )
                ) : null}
              </div>
            </div>
            <div className="amount-and-slider">
              <div className="amount-info">
                <img
                  src="/icons/plus-square.svg"
                  alt="plus square"
                  onClick={() =>
                    this.updateProductOptions({
                      ...this.props.product,
                      amount: amount + 1,
                    })
                  }
                />
                <div className="counter">{amount}</div>
                <img
                  src="/icons/minus-square.svg"
                  alt="minus square"
                  onClick={() =>
                    amount > 1 &&
                    this.updateProductOptions({
                      ...this.props.product,
                      amount: amount - 1,
                    })
                  }
                  className={amount === 1 ? "disabled" : ""}
                />
              </div>
              <div className="gallery-slider">
                <div className="slider-wrapper">
                  {this.props?.groupSelections &&
                    payload?.gallery?.length > 1 && (
                      <img
                        className="arrow left-arrow"
                        src="/icons/chevron-left.svg"
                        alt="left arrow"
                        onClick={() => this.slideProductImage("left")}
                      />
                    )}
                  <img
                    className="product-display-image"
                    src={
                      payload?.gallery?.[this.state.productDisplayImageCount]
                    }
                    alt="product display"
                  />
                  {this.props?.groupSelections &&
                    payload?.gallery?.length > 1 && (
                      <img
                        className="arrow right-arrow"
                        src="/icons/chevron-left.svg"
                        alt="right arrow"
                        onClick={() => this.slideProductImage("right")}
                      />
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <CartProductExtraActions
          navigate={this.props.navigate}
          id={id}
          cartProductId={cartProductId}
          deleteCartProduct={deleteCartProduct}
          hideActions={hideActions}
        />
      </div>
    );
  }
}
