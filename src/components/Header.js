import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import logo from "../resources/images/logo.svg";
import { Mobile, Default } from "./Responsive";
import DotMenu from "./DotMenu";
import LoginOrLogout from "./LoginOrLogout";

export default function Header({ center }) {
  return (
    <StyledHeader>
      <Link to="/">
        <Logo src={logo} />
      </Link>
      {center}

      <div>
        <Mobile>
          <DotMenu />
        </Mobile>
        <Default>
          <LoginOrLogout />
        </Default>
      </div>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background: white;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 10px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
`;

const Logo = styled.img`
  height: 14px;
`;
