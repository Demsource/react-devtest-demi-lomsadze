import React, { Component } from "react";

export default class SingleProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productAdded: false,
    };
    this.addToCart = this.addToCart.bind(this);
    this.notifyProductAddition = this.notifyProductAddition.bind(this);
  }

  addToCart(id, brand, name, price, currency, inStock, attributes) {
    if (inStock) {
      let productOptions = {};
      attributes?.forEach((attribute) => {
        productOptions[attribute.id] = attribute.items[0].displayValue;
      });

      const product = {
        cartProductId: this.props.productsCart.length
          ? this.props.productsCart[this.props.productsCart.length - 1]
              .cartProductId + 1
          : 1,
        id,
        brand,
        name,
        price,
        currency,
        ...productOptions,
        amount: 1,
        payload: {
          baseAttrs: this.props?.product?.attributes,
          basePrices: this.props?.product?.prices,
          gallery: this.props?.product?.gallery,
          inStock,
        },
      };
      this.props.addToProductsCart(product);
      this.notifyProductAddition();
    }
  }

  notifyProductAddition() {
    this.setState({ productAdded: true });

    setTimeout(() => {
      this.setState({ productAdded: false });
    }, 1000);
  }

  render() {
    const { product, navigate } = this.props;
    const { label, symbol } = this.props.currentCurrency;

    return (
      <div
        key={product.id}
        className="product"
        onClick={() => {
          navigate(product.id);
        }}
      >
        <div className="imgWrapper">
          <img src={product.gallery?.[0]} alt={product.name} />
        </div>
        <img
          className="add-to-card-icon"
          src="/icons/Product Card-Elements-Circle Icon.svg"
          alt="add to card icon"
          onClick={(e) => {
            e.stopPropagation();
            this.notifyProductAddition();

            if (product?.inStock) {
              const price = product?.prices?.filter(
                (price) => price?.currency?.label === label
              )[0]?.amount;

              this.addToCart(
                product.id,
                product.brand,
                product.name,
                price,
                label,
                product?.inStock,
                product.attributes
              );
            }
          }}
        />
        <h2>{product.brand}</h2>
        <h3>{product.name}</h3>
        <h4>
          {symbol +
            " " +
            product.prices?.filter(
              (price) => price?.currency?.label === label
            )[0]?.amount}
        </h4>
        {!product.inStock && (
          <div className="out-of-stock">
            <p className="outstock-text">out of stock</p>
          </div>
        )}
        {this.state.productAdded && (
          <div className="plp-product-added">
            <p className="added-text">Added to the cart</p>
          </div>
        )}
      </div>
    );
  }
}
