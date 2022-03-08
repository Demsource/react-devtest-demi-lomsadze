import React, { Component } from "react";

export default class EmptyCart extends Component {
  componentDidMount() {
    this.props.navigate("/");
  }

  render() {
    return <p className="no-products">No products in cart.</p>;
  }
}
