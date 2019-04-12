import styled from "styled-components";
import PropTypes from "prop-types";

const Padding = styled.div`
  padding-top: ${props => props.top};
  padding-bottom: ${props => props.bottom};
  padding-left: ${props => props.left};
  padding-right: ${props => props.right};
`;

Padding.propsTypes = {
  top: PropTypes.string,
  bottom: PropTypes.string,
  left: PropTypes.string,
  right: PropTypes.string
};

export default Padding;
