import React, { Component } from "react";
import withCategory from "../helpers/GraphQL/withCategory";
import "../css/PLP.css";

class Products extends Component {
  render() {
    const { gqlProps } = this.props;
    const { label, symbol } = this.props.currentCurrency;

    if (gqlProps?.loading) {
      return <div>loading...</div>;
    }

    if (!gqlProps?.data?.category?.products.length) {
      return <div>No products load</div>;
    }

    return (
      <>
        <h1>{gqlProps.data.category.name}</h1>
        <div className="products">
          {gqlProps.data.category.products.map((product) => (
            <div
              key={product.id}
              className="product"
              onClick={() => {
                this.props.navigate(product.id);
              }}
            >
              <div className="imgWrapper">
                <img src={product.gallery?.[0]} alt={product.name} />
              </div>
              <img
                className="add-to-card-icon"
                src="/icons/Product Card-Elements-Circle Icon.svg"
                alt="add to card icon"
              />
              <h2>{product.name}</h2>
              <h3>
                {symbol +
                  " " +
                  product.prices?.filter(
                    (price) => price?.currency?.label === label
                  )[0]?.amount}
              </h3>
              <div className={`${!product.inStock ? "out-of-stock" : "hide"}`}>
                <p className="outstock-text">out of stock</p>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default withCategory(Products);
