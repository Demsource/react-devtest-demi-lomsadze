import React, { Component } from "react";
import withCurrencies from "../helpers/GraphQL/withCurrencies";

export class Currencies extends Component {
  render() {
    const {
      activeCurrency,
      setActiveCurrency,
      gqlProps,
      toggleCurrencies,
      updateCartProductsCurrency,
    } = this.props;

    if (gqlProps?.loading) {
      return <div>loading...</div>;
    }

    if (!gqlProps?.data?.currencies) {
      return <div>No currencies load</div>;
    }

    return (
      <>
        <div
          className="active-currency"
          onClick={() => this.props.toggleCurrencies()}
        >
          <span>{activeCurrency.symbol}</span>
          <img src="/icons/Vector.svg" alt="down arrow" />
        </div>
        <ul
          className="currencies-list"
          style={{ display: this.props.hiddenCurrencies ? "none" : "block" }}
        >
          {gqlProps.data.currencies.map(({ label, symbol }) => (
            <li
              key={label}
              onClick={() => {
                if (activeCurrency.label !== label) {
                  setActiveCurrency({ label, symbol });
                  updateCartProductsCurrency(label);
                }
                toggleCurrencies();
              }}
            >
              {symbol + " " + label}
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default withCurrencies(Currencies);
