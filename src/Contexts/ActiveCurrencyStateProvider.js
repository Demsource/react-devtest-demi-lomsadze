import React, { Component } from "react";
import { createContext } from "react";

export const currencyContext = createContext();

export default class ActiveCurrencyStateProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: "USD",
      symbol: "$",
    };
  }

  render() {
    return (
      <currencyContext.Provider
        value={{
          activeCurrency: this.state,
          setActiveCurrency: (obj) => {
            this.setState(obj);
          },
        }}
      >
        {this.props.children}
      </currencyContext.Provider>
    );
  }
}
