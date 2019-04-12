import React from "react";
import PropTypes from "prop-types";
import { formatPrice } from "../../common/utils";
import { Label } from "./Label";

export default function PriceRange({ minPrice, maxPrice, ...otherProps }) {
  if (minPrice === maxPrice) {
    return <Label {...otherProps}>${formatPrice(minPrice)}</Label>;
  } else {
    return (
      <Label {...otherProps}>
        ${formatPrice(minPrice)} - ${formatPrice(maxPrice)}
      </Label>
    );
  }
}

PriceRange.propTypes = {
  ...Label.propTypes,
  minPrice: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  maxPrice: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};
