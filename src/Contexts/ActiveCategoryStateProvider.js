import React, { Component } from "react";
import { createContext } from "react";

export const categoryContext = createContext();

export default class ActiveCategoryStateProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "all",
    };
  }

  render() {
    return (
      <categoryContext.Provider
        value={{
          activeCategory: this.state.category,
          setActiveCategory: (str) => {
            this.setState({ category: str });
          },
        }}
      >
        {this.props.children}
      </categoryContext.Provider>
    );
  }
}
