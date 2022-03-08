import React, { Component } from "react";
import "../css/Attribute.css";
import cutOverlayViewItems from "../helpers/cutOverlayViewItems";
import haveGroup from "../helpers/haveGroup";
import AttributeItem from "./AttributeItem";

export class Attribute extends Component {
  constructor(props) {
    super(props);

    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(data, item) {
    document.getElementById("note")?.remove();
    this.props.updateSelection({
      ...this.props.selection,
      [data.id]: item.displayValue,
    });
  }

  render() {
    const { data, inStock, selection, groupSelections, overlayView } =
      this.props;

    const inProductsCart = this.props.productId && groupSelections;
    const existsCombination = (item) =>
      inProductsCart &&
      haveGroup(
        {
          ...selection,
          [data.id]: item.id,
          id: this.props.productId,
        },
        groupSelections
      );

    return (
      <>
        <h3>{data?.name}:</h3>
        <ul>
          {data?.items?.length
            ? !overlayView
              ? data.items.map((item, i) => (
                  <AttributeItem
                    key={`attribute-${i}`}
                    selection={selection}
                    item={item}
                    data={data}
                    inStock={inStock}
                    existsCombination={existsCombination}
                    clickHandler={this.clickHandler}
                  />
                ))
              : data.items.length <= 2
              ? data.items.map((item, i) => (
                  <AttributeItem
                    key={`attribute-${i}`}
                    selection={selection}
                    item={item}
                    data={data}
                    inStock={inStock}
                    existsCombination={existsCombination}
                    clickHandler={this.clickHandler}
                    overlayView={overlayView}
                  />
                ))
              : cutOverlayViewItems(data.items, selection).map(
                  (item, i) => (
                    <AttributeItem
                      key={`attribute-${i}`}
                      selection={selection}
                      item={item}
                      data={data}
                      inStock={inStock}
                      existsCombination={existsCombination}
                      clickHandler={this.clickHandler}
                      overlayView={overlayView}
                    />
                  )
                )
            : null}
        </ul>
      </>
    );
  }
}

export default Attribute;
