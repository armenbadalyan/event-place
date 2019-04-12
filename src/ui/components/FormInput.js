import React from "react";
import styled from "styled-components";

export default function FormInput({
  field,
  form: { touched, errors },
  ...props
}) {
  return <Input type="text" {...field} {...props} />;
}

export const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.dark};
  background: transparent;
  padding-bottom: 4px;

  :focus {
    border-bottom: 1px solid ${({ theme }) => theme.accent};
    outline: none;
  }
`;
