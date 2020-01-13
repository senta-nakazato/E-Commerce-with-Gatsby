import React, { useContext } from "react"
import { Link } from "gatsby"
import styled from "@emotion/styled"

import ShoppingBagIcon from "@icons/ShoppingBag.Icon"
import Sticky from "@components/Sticky"
import PanelSlideIn from "@components/Panel/Panel.SlideIn"
import { PanelContext } from "@components/Panel/Panel.Context"

const navLinks = [
  { to: "/products", text: "SHOP ALL" },
  { to: "/about", text: "ABOUT US" },
]

const Header = ({ location }) => {
  const isHome = location.pathname === "/"
  const { togglePanel } = useContext(PanelContext)

  return (
    <Sticky>
      <Section isHome={isHome}>
        <Nav>
          {navLinks.map(nav => (
            <NavItem key={nav.to}>
              <Link to={nav.to}>{nav.text}</Link>
            </NavItem>
          ))}
        </Nav>
        <Logo>
          <Link to="/">Gatsby</Link>
        </Logo>
        <Cart onClick={() => togglePanel()}>
          <ShoppingBagIcon />
        </Cart>
      </Section>
    </Sticky>
  )
}

export default Header

const Section = styled.header`
  background: white;
  display: flex;
  align-items: center;
  height: 6rem;
  width: 100%;
  padding: 0 4rem;
  position: relative;
  z-index: 1000;

  ${p => p.isHome && ` background: transparent;`};
`
const Nav = styled.ul`
  display: flex;
  justify-content: space-between;
`
const NavItem = styled.li`
  color: ${p => p.theme.colors.primary} !important;
  font-weight: bold;import { ShoppingBag } from '@sections/ShoppingBag';


  &:not(:last-child) {
    margin-right: 2.4rem;
  }
`
const Logo = styled.h1`
  color: ${p => p.theme.colors.primary};

  font-size: 4rem;
  font-weight: 500;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const Cart = styled.button`
  margin-left: auto;
`
