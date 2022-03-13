import React, { Component } from "react";
import withProduct from "../helpers/GraphQL/withProduct";
import "../css/PDP.css";
import Attribute from "./Attribute";
import DOMPurify from "dompurify";

class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imagePreviewIndex: 0,
      productOptions: {},
      noteAttrSelection: false,
      productAdded: false,
    };

    this.updateProductOptions = this.updateProductOptions.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.isValidatedAttrFields = this.isValidatedAttrFields.bind(this);
    this.deleteAttrNote = this.deleteAttrNote.bind(this);
    this.notifyProductAddition = this.notifyProductAddition.bind(this);
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
      this.notifyProductAddition();
    }
  }

  isValidatedAttrFields() {
    const allSelection = this.props.gqlProps.data.product.attributes.map(
      (attr) => this.state.productOptions.hasOwnProperty(attr.id)
    );

    return !allSelection.includes(false);
  }

  deleteAttrNote() {
    this.setState({ noteAttrSelection: false });
  }

  notifyProductAddition() {
    this.setState({ productAdded: true });

    setTimeout(() => {
      this.setState({ productAdded: false });
    }, 1000);
  }

  render() {
    const { currentCurrency, gqlProps } = this.props;
    const product = gqlProps?.data?.product;

    const safeDescriptionHTML = DOMPurify.sanitize(product?.description);

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
                </li>
              );
            })}
          </ul>
          <div className="image-preview">
            <img
              src={product?.gallery[this.state.imagePreviewIndex]}
              alt="product preview"
            />
            {!product?.inStock && (
              <div className="out-of-stock">
                <p className="outstock-text">out of stock</p>
              </div>
            )}
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
                deleteAttrNote={this.deleteAttrNote}
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
          {this.state.productAdded && (
            <strong id="added">Product has been added to the cart</strong>
          )}
          <div
            id="add-to-cart"
            className={!product?.inStock ? "disabled" : ""}
            onClick={() => {
              if (product?.inStock) {
                if (this.isValidatedAttrFields()) {
                  this.deleteAttrNote();

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
                  this.setState({ noteAttrSelection: true });
                }
              }
            }}
          >
            ADD TO CART
          </div>
          {this.state.noteAttrSelection && (
            <strong id="note">Please select an attribute/attributes</strong>
          )}
          <div
            className="desc"
            dangerouslySetInnerHTML={{ __html: safeDescriptionHTML }}
          ></div>
        </div>
      </div>
    );
  }
}

export default withProduct(Product);
