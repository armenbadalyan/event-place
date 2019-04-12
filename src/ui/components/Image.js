import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

export default function Image({ src, alt }) {
  return (
    <ImageContainer>
      <EventImage src={src} alt={alt} />
    </ImageContainer>
  );
}

Image.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string
};

const ImageContainer = styled.div`
  width: 100%;
  padding-top: 50%;
  height: 0;
  position: relative;
`;

const EventImage = styled.img`
  position: absolute;
  max-width: 100%;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  object-fit: cover;
`;
