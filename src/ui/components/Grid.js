import styled from "styled-components";

export const GridRow = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
`;

export const GridItem = styled.div`
  flex-basis: 33.33%;
  -ms-flex: auto;
  position: relative;
  padding-bottom: 30px;
  box-sizing: border-box;

  @media (max-width: 815px) {
    flex-basis: 50%;
  }
  @media (max-width: 555px) {
    flex-basis: 100%;
  }
`;

export const GridItem23 = styled.div`
  flex-basis: 66.66%;
  -ms-flex: auto;
  position: relative;
  box-sizing: border-box;
  min-width: 0;

  /*@media (max-width: 815px) {
    flex-basis: 50%;
  }*/
  @media (max-width: 555px) {
    flex-basis: 100%;
  }
`;

export const GridItem13 = styled.div`
  flex-basis: 33.33%;
  -ms-flex: auto;
  position: relative;
  box-sizing: border-box;
  min-width: 0;

  /*@media (max-width: 815px) {
    flex-basis: 50%;
  }*/
  @media (max-width: 555px) {
    flex-basis: 100%;
  }
`;
