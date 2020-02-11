import React, { useState, useContext } from "react"
import { useSelector } from "react-redux"
import { Link, navigate } from "gatsby"
import styled from "@emotion/styled"
import media from "@styles/media"

import ShoppingBagIcon from "@icons/ShoppingBag.Icon"
import ArrowLeftIcon from "@icons/ArrowLeft.Icon"
import Sticky from "@components/Sticky"
import { ShoppingBagContext } from "@components/ShoppingBag/ShoppingBag.Context"
import NavMobile from "@components/Nav/Nav.Mobile"

const navLinks = [
  { to: "/products", text: "SHOP ALL" },
  { to: "/about", text: "ABOUT US" },
]

const Header = ({ location, checkout }) => {
  const isTransparent =
    location.pathname === "/about" || location.pathname === "/"
  const { toggleShoppingBag } = useContext(ShoppingBagContext)
  const products = useSelector(state => state.products)
  let totalQuantity = 0
  products.forEach(p => {
    totalQuantity += p.quantity
  })

  return (
    <Sticky>
      <Section isTransparent={isTransparent}>
        {checkout ? (
          <>
            <BackButton onClick={() => window.history.back()}>
              <ArrowLeftIcon />
              BACK <span className="only-desktop">TO CART</span>
            </BackButton>
            <Logo>
              <Link to="/">Gatsby</Link>
            </Logo>
          </>
        ) : (
          <>
            <MediaQuery>
              <NavMobile />
            </MediaQuery>
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
            <Cart onClick={() => toggleShoppingBag()}>
              <ShoppingBagIcon />
              <Quantity>{totalQuantity}</Quantity>
            </Cart>{" "}
          </>
        )}
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

  ${p => p.isTransparent && ` background: transparent;`};

  ${media.phablet`
    padding: 0 2rem;
  `}
`

const BackButton = styled.button`
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.7;
  display: flex;
  align-items: center;
  text-transform: uppercase;

  .only-desktop {
    ${media.desktop`
      display: none;
    `}
  }
`
const Nav = styled.ul`
  display: flex;
  justify-content: space-between;

  ${media.tablet`
    display: none;
  `}
`
const NavItem = styled.li`
  color: ${p => p.theme.colors.headline};
  font-weight: bold;

  &:not(:last-child) {
    margin-right: 3rem;
  }
`

const Logo = styled.h1`
  color: ${p => p.theme.colors.headline};

  font-size: 4rem;
  font-weight: 500;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  ${media.phablet`
    font-size: 3.2rem;
  `}
`

const Cart = styled.button`
  margin-left: auto;
  position: relative;
`

const Quantity = styled.div`
  color: ${p => p.theme.colors.primary};
  font-weight: 600;
  font-size: 12px;
  position: absolute;
  top: 64%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const MediaQuery = styled.div`
  display: none;

  ${media.tablet` 
    display: block;
  `};
`
