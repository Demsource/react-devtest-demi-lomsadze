import React, { Component } from "react";

export default class AttributeItem extends Component {
  render() {
    const {
      selection,
      item,
      data,
      inStock,
      existsCombination,
      clickHandler,
      overlayView,
    } = this.props;

    const isSelected = selection?.[data?.id] === item?.id;

    switch (data?.type) {
      case "text":
        return (
          <li
            key={item?.id}
            className={`text ${
              !inStock ||
              (existsCombination(item) && !isSelected) ||
              (overlayView && !isSelected)
                ? "disabled"
                : ""
            } ${isSelected ? "selected" : ""}`}
            onClick={() => {
              if (
                inStock &&
                !isSelected &&
                !existsCombination(item) &&
                !(overlayView && !isSelected)
              ) {
                clickHandler(data, item);
              }
            }}
          >
            {item?.value}
          </li>
        );
      case "swatch":
        return (
          <li
            key={item?.id}
            className={`swatch  ${
              !inStock ||
              (existsCombination(item) && !isSelected) ||
              (overlayView && !isSelected)
                ? "disabled"
                : ""
            }
            ${isSelected ? "selected" : ""}`}
            style={{ backgroundColor: item?.value }}
            onClick={() => {
              if (
                inStock &&
                !isSelected &&
                !existsCombination(item) &&
                !(overlayView && !isSelected)
              ) {
                clickHandler(data, item);
              }
            }}
          ></li>
        );
      default:
        return "No Attribute";
    }
  }
}
