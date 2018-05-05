import React, { Component } from "react";
import { Button } from "semantic-ui-react";

export class Pez extends Component {
  render() {
    const { isActive, color, onClick } = this.props;

    return (
      <Button
        key={Math.random()}
        icon
        color={color}
        size="big"
        basic={!isActive}
        checked={isActive}
        onClick={(e, data) => {
          if (typeof onClick === "function") {
            onClick(e, data);
          }
        }}
      />
    );
  }
}
