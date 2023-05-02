
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #333;
  color: #fff;
`;

const Logo = styled(Link)`
  font-size: 2rem;
  font-weight: bold;
  color: #fff;
  text-decoration: none;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
`;

const NavLink = styled(Link)`
  margin-right: 1.5rem;
  color: #fff;
  text-decoration: none;
  font-size: 1.2rem;

  &:hover {
    color: #f1c40f;
  }
`;

function Navbar() {
  return (
    <NavbarContainer>
      <Logo to="/login">RNW</Logo>
      <NavLinks>
        <NavLink to="/signup">Sign Up</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </NavLinks>
    </NavbarContainer>
  );
}

export default Navbar;
