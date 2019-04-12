import React from "react";
import styled from "styled-components";

function IconSVG({ className, iconName }) {
  return (
    <svg className={className}>
      <use xlinkHref={"#" + iconName} />
    </svg>
  );
}

const Icon = styled(IconSVG)`
  width: ${props => props.width};
  height: ${props => props.height};
  stroke-width: 0;
  stroke: ${props => props.color};
  fill: ${props => props.color};
`;

export default Icon;
