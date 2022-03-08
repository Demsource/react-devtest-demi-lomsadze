import "./css/App.css";
import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import ProductListingPage from "./Pages/ProductListingPage";
import ProductDescriptionPage from "./Pages/ProductDescriptionPage";
import Cart from "./Pages/Cart";
import Header from "./Components/Header";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="content">
          <Header />
          <Routes>
            <Route exact path="/" element={<ProductListingPage />} />
            <Route exact path="/:id" element={<ProductDescriptionPage />} />
            <Route exact path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
