import React from "react";
import { Menu, Item, MenuProvider } from "react-contexify";
import IconButton from "./IconButton";
import LoginOrLogout from "./LoginOrLogout";
import "react-contexify/dist/ReactContexify.min.css";

export default function DotMenu(props) {
  return (
    <>
      <MenuProvider id="dotMenu" event="onClick">
        <IconButton iconName="menu" />
      </MenuProvider>
      <AuthMenu />
    </>
  );
}

const AuthMenu = () => (
  <Menu id="dotMenu">
    <Item>
      <LoginOrLogout />
    </Item>
  </Menu>
);
