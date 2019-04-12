import styled from "styled-components";
import PropTypes from "prop-types";

export const Label = styled.div`
  font-size: ${props => props.size || "0.8em"};
  color: ${props => {
    const { textTheme = "dark" } = props;
    return props.theme[textTheme];
  }};
  text-transform: ${props => (props.uppercase ? "uppercase" : "none")};
  font-weight: ${props => (props.bold ? "bold" : "normal")};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

Label.propTypes = {
  fontSize: PropTypes.string,
  textTheme: PropTypes.string,
  uppercase: PropTypes.bool,
  bold: PropTypes.bool
};

export const MultiLabel = styled(Label)`
  white-space: normal;
  -webkit-line-clamp: ${props => props.lines || 1};
  -webkit-box-orient: vertical;
  display: -webkit-box;
`;

MultiLabel.propTypes = {
  ...Label.propTypes,
  lines: PropTypes.number
};
