import React from "react";
import Responsive from "react-responsive";

export const Desktop = props => <Responsive {...props} minWidth={992} />;
export const Tablet = props => (
  <Responsive {...props} minWidth={576} maxWidth={991} />
);
export const Mobile = props => <Responsive {...props} maxWidth={575} />;
export const Default = props => <Responsive {...props} minWidth={576} />;
