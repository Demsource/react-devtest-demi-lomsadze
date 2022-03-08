import React, { Component } from "react";

export default class CartProductExtraActions extends Component {
  render() {
    const { navigate, id, cartProductId, deleteCartProduct } = this.props;

    return (
      <div className="extra-actions">
        <img
          src="/icons/eye.svg"
          className="view"
          onClick={() => navigate(`/${id}`)}
        />
        <img
          src="/icons/trash-can.svg"
          className="delete"
          onClick={() => deleteCartProduct(cartProductId)}
        />
      </div>
    );
  }
}
