import styled from "styled-components";
import { Form } from "formik";
import FormInput from "../../components/FormInput";
import { Label } from "../../components/Label";
import Button from "../../components/Button";

export const StyledForm = styled(Form)`
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  width: 100%;
`;

export const SubmitButton = styled(Button)`
  background: ${props => props.theme.accent};
  color: white;
  width: 100px;
  margin: 10px auto;
  font-weight: normal;

  :active {
    background: ${props => props.theme.accentLight};
  }
`;

export const Link = styled(Button)`
  color: ${props => props.theme.accent};
  background: transparent;

  :focus {
    background: transparent;
  }

  :active {
    background: transparent;
    color: ${props => props.theme.accentLight};
  }
`;

export const StyledFormInput = styled(FormInput)`
  margin: 15px 0;
`;

export const ErrorLabel = styled(Label).attrs(props => ({
  bold: false,
  textTheme: "accent"
}))``;
