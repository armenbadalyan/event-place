import React from "react";
import PropTypes from "prop-types";
import { withTheme } from "styled-components";
import Button from "./Button";
import Icon from "./Icons";

class IconButton extends React.Component {
  render() {
    const { iconName, color, theme, ...otherProps } = this.props;
    return (
      <Button {...otherProps}>
        <Icon
          width="1.5rem"
          height="1.5rem"
          iconName={iconName}
          color={theme.dark}
        />
      </Button>
    );
  }
}

IconButton.propTypes = {
  ...Button.propTypes,
  iconName: PropTypes.string
};

export default withTheme(IconButton);
