import React, { Component } from "react";
import withCategoriesList from "../helpers/GraphQL/withCategoriesList";

export class CategoriesList extends Component {
  render() {
    const { activeCategory, setActiveCategory, location, navigate, gqlProps } =
      this.props;

    if (gqlProps?.loading) {
      return <div>loading...</div>;
    }

    if (!gqlProps?.data?.categories) {
      return <div>No list load</div>;
    }

    return (
      <ul className="categories">
        {gqlProps.data.categories.map(({ name }) => (
          <li
            key={name}
            className={activeCategory === name ? "active-cat" : ""}
            onClick={() => {
              setActiveCategory(name);
              location.pathname !== "/" && navigate("/");
            }}
          >
            {name}
          </li>
        ))}
      </ul>
    );
  }
}

export default withCategoriesList(CategoriesList);
