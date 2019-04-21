import styled from "styled-components";
import PropTypes from "prop-types";

const DescriptionRenderer = styled.div.attrs(props => ({
  dangerouslySetInnerHTML: { __html: props.htmlText }
}))`
  * {
    max-width: 100%;
    word-break: break-word;
  }

  img {
    object-fit: cover;
  }
`;

DescriptionRenderer.propTypes = {
  htmlText: PropTypes.string
};

export default DescriptionRenderer;
