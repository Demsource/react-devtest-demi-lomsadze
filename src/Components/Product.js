import React, { Component } from "react";
import withProduct from "../helpers/GraphQL/withProduct";
import "../css/PDP.css";
import Attribute from "./Attribute";

class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imagePreviewIndex: 0,
      productOptions: {},
    };

    this.updateProductOptions = this.updateProductOptions.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.isValidatedAttrFields = this.isValidatedAttrFields.bind(this);
  }

  componentDidMount() {
    this.props.gqlProps.refetch();
  }

  updateProductOptions(attrs) {
    this.setState({ productOptions: attrs });
  }

  addToCart(id, brand, name, price, currency, inStock) {
    if (inStock) {
      const product = {
        cartProductId: this.props.productsCart.length
          ? this.props.productsCart[this.props.productsCart.length - 1]
              .cartProductId + 1
          : 1,
        id,
        brand,
        name,
        price,
        totalPrice: price,
        currency,
        ...this.state.productOptions,
        amount: 1,
        payload: {
          baseAttrs: this.props.gqlProps?.data?.product?.attributes,
          basePrices: this.props.gqlProps?.data?.product?.prices,
          gallery: this.props.gqlProps?.data?.product?.gallery,
          inStock,
        },
      };
      this.props.addToProductsCart(product);
      this.props.navigate("/cart");
    }
  }

  isValidatedAttrFields() {
    const allSelection = this.props.gqlProps.data.product.attributes.map(
      (attr) => this.state.productOptions.hasOwnProperty(attr.id)
    );

    return !allSelection.includes(false);
  }

  render() {
    const { currentCurrency, gqlProps } = this.props;
    const product = gqlProps?.data?.product;

    if (gqlProps?.loading) {
      return <div>loading...</div>;
    }

    if (!product) {
      return <div className="no-product">Not such product</div>;
    }

    return (
      <div className="single-product-wrapper">
        <div className="gallery">
          <ul className="images">
            {product?.gallery.map((imageLink, i) => {
              if (!i) return "";

              return (
                <li
                  key={i}
                  onMouseOver={() => {
                    this.setState({ imagePreviewIndex: i });
                  }}
                >
                  <img src={imageLink} alt={"product: " + i} />
                  <div
                    className={`${!product?.inStock ? "out-of-stock" : "hide"}`}
                  ></div>
                </li>
              );
            })}
          </ul>
          <div className="image-preview">
            <img
              src={product?.gallery[this.state.imagePreviewIndex]}
              alt="product preview"
            />
            <div className={`${!product?.inStock ? "out-of-stock" : "hide"}`}>
              <p className="outstock-text">out of stock</p>
            </div>
          </div>
        </div>
        <div className="details">
          <h1>{product?.brand}</h1>
          <h2>{product?.name}</h2>
          <div className="attributes">
            {product?.attributes?.map((attribute) => (
              <Attribute
                key={attribute.id}
                data={attribute}
                inStock={product?.inStock}
                selection={this.state.productOptions}
                updateSelection={this.updateProductOptions}
              />
            ))}
          </div>
          <div className="price">
            <h3>price:</h3>
            <h4>
              {currentCurrency?.symbol +
                " " +
                product?.prices?.filter(
                  (price) => price?.currency?.label === currentCurrency?.label
                )[0]?.amount}
            </h4>
          </div>
          <div
            id="add-to-cart"
            className={!product?.inStock ? "disabled" : ""}
            onClick={() => {
              if (product?.inStock) {
                const noteEl = document.getElementById("note");
                if (this.isValidatedAttrFields()) {
                  noteEl && noteEl.remove();

                  const price = product?.prices?.filter(
                    (price) => price?.currency?.label === currentCurrency?.label
                  )[0]?.amount;

                  this.addToCart(
                    product.id,
                    product.brand,
                    product.name,
                    price,
                    currentCurrency?.label,
                    product?.inStock
                  );
                } else {
                  !noteEl &&
                    document
                      .getElementById("add-to-cart")
                      .insertAdjacentHTML(
                        "afterend",
                        '<strong id="note">Please select an attribute/attributes<strong>'
                      );
                }
              }
            }}
          >
            ADD TO CART
          </div>
          <div
            className="desc"
            dangerouslySetInnerHTML={{ __html: product?.description }}
          ></div>
        </div>
      </div>
    );
  }
}

export default withProduct(Product);
