import React, { Component } from "react";

export default class CartProductExtraActions extends Component {
  render() {
    const { navigate, id, cartProductId, deleteCartProduct, hideActions } =
      this.props;

    return (
      <div className="cp-extra-actions">
        <img
          src="/icons/eye.svg"
          alt="eye.svg"
          className="view"
          onClick={() => {
            hideActions && hideActions();
            navigate(`/${id}`);
          }}
        />
        <img
          src="/icons/trash-can.svg"
          alt="trash can.svg"
          className="delete"
          onClick={() => deleteCartProduct(cartProductId)}
        />
      </div>
    );
  }
}
