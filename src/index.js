import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import "./css/reset.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import ProductsCartStateProvider from "./Contexts/ProductsCartStateProvider";
import ActiveCategoryStateProvider from "./Contexts/ActiveCategoryStateProvider";
import ActiveCurrencyStateProvider from "./Contexts/ActiveCurrencyStateProvider";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <ProductsCartStateProvider>
          <ActiveCategoryStateProvider>
            <ActiveCurrencyStateProvider>
              <App />
            </ActiveCurrencyStateProvider>
          </ActiveCategoryStateProvider>
        </ProductsCartStateProvider>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
