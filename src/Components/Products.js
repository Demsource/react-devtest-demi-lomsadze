import React, { Component } from "react";
import withCategory from "../helpers/GraphQL/withCategory";
import "../css/PLP.css";
import SingleProduct from "./SingleProduct";
import { productsCartContext } from "../Contexts/ProductsCartStateProvider";

class Products extends Component {
  render() {
    const { gqlProps } = this.props;

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
          <productsCartContext.Consumer>
            {(value) => {
              return gqlProps.data.category.products.map((product, i) => (
                <SingleProduct
                  key={i + "-" + product.id}
                  navigate={this.props.navigate}
                  product={product}
                  currentCurrency={this.props.currentCurrency}
                  productsCart={value.productsCart}
                  addToProductsCart={value.addToProductsCart}
                  gqlProps={this.props.gqlProps}
                />
              ));
            }}
          </productsCartContext.Consumer>
        </div>
      </>
    );
  }
}

export default withCategory(Products);
