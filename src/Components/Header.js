import React, { Component } from "react";
import { categoryContext } from ".././Contexts/ActiveCategoryStateProvider";
import withRouter from "../helpers/withRouter";
import "../css/Header.css";
import CategoriesList from "./CategoriesList";
import { currencyContext } from "../Contexts/ActiveCurrencyStateProvider";
import Currencies from "./Currencies";
import { productsCartContext } from "../Contexts/ProductsCartStateProvider";
import CartOverlay from "./CartOverlay";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hiddenCurrencies: true,
      hiddenCartOverlay: true,
    };

    this.currenciesRef = React.createRef();
    this.cartOverlayRef = React.createRef();

    this.toggleCurrencies = this.toggleCurrencies.bind(this);
    this.toggleCartOverlay = this.toggleCartOverlay.bind(this);
    this.hideActions = this.hideActions.bind(this);
  }

  handleClickOutsideActions = (event) => {
    if (
      (!this.state.hiddenCurrencies &&
        this.currenciesRef &&
        !this.currenciesRef?.current?.contains(event.target)) ||
      (!this.state.hiddenCartOverlay &&
        this.cartOverlayRef &&
        !this.cartOverlayRef?.current?.contains(event.target))
    ) {
      this.hideActions();
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.hiddenCartOverlay !== this.state.hiddenCartOverlay) {
      const body = document.querySelector("body");
      body.style.overflow = this.state.hiddenCartOverlay ? "auto" : "hidden";
    }

    if (!this.state.hiddenCurrencies || !this.state.hiddenCartOverlay) {
      document.addEventListener("click", this.handleClickOutsideActions);
    } else {
      document.removeEventListener("click", this.handleClickOutsideActions);
    }
  }

  toggleCurrencies() {
    this.setState((prevState) => ({
      hiddenCurrencies: !prevState.hiddenCurrencies,
      hiddenCartOverlay: true,
    }));
  }

  toggleCartOverlay() {
    this.setState((prevState) => ({
      hiddenCartOverlay: !prevState.hiddenCartOverlay,
      hiddenCurrencies: true,
    }));
  }

  hideActions() {
    this.setState({
      hiddenCurrencies: true,
      hiddenCartOverlay: true,
    });
  }

  render() {
    const { location, navigate } = this.props.router;
    return (
      <header>
        <categoryContext.Consumer>
          {(value) => (
            <CategoriesList
              activeCategory={value.activeCategory}
              setActiveCategory={value.setActiveCategory}
              location={location}
              navigate={navigate}
            />
          )}
        </categoryContext.Consumer>
        <img src="/icons/a-logo.svg" alt="store logo" />
        <ul className="actions">
          <productsCartContext.Consumer>
            {(productsCartValue) => {
              const {
                productsCart,
                updateCartProductsCurrency,
                updateCartProduct,
                deleteCartProduct,
                resetCartProducts,
              } = productsCartValue;

              return (
                <currencyContext.Consumer>
                  {(currencyValue) => {
                    return (
                      <>
                        <li className="currencies" ref={this.currenciesRef}>
                          <Currencies
                            hiddenCurrencies={this.state.hiddenCurrencies}
                            toggleCurrencies={this.toggleCurrencies}
                            hiddenCartOverlay={this.state.hiddenCartOverlay}
                            activeCurrency={currencyValue.activeCurrency}
                            setActiveCurrency={currencyValue.setActiveCurrency}
                            updateCartProductsCurrency={
                              updateCartProductsCurrency
                            }
                          />
                        </li>
                        <div
                          ref={this.cartOverlayRef}
                          className="cart-overlay-wrapper"
                        >
                          <CartOverlay
                            navigate={navigate}
                            location={location}
                            hiddenCartOverlay={this.state.hiddenCartOverlay}
                            toggleCartOverlay={this.toggleCartOverlay}
                            hideActions={this.hideActions}
                            activeCurrency={currencyValue.activeCurrency}
                            cartProducts={productsCart}
                            updateCartProduct={updateCartProduct}
                            resetCartProducts={resetCartProducts}
                            deleteCartProduct={deleteCartProduct}
                          />
                        </div>
                        {!this.state.hiddenCartOverlay && (
                          <div className="page-overlay"></div>
                        )}
                      </>
                    );
                  }}
                </currencyContext.Consumer>
              );
            }}
          </productsCartContext.Consumer>
        </ul>
      </header>
    );
  }
}

export default withRouter(Header);
