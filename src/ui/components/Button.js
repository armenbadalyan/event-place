import React from "react";
import styled from "styled-components";

export default function Button(props) {
  const { label, children, ...otherProps } = props;
  return (
    <StyledButton {...otherProps}>
      {label}
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  background: none;
  border: none;
  padding: 10px;
  font-size: 1rem;
  color: ${props => props.theme.dark};
  font-weight: bold;
  cursor: pointer;

  :focus {
    outline: none;
  }

  :active {
    background: ${props => props.theme.light};
  }
`;
