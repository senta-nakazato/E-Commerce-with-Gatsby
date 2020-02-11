import React from "react"
import { Link } from "gatsby"
import styled from "@emotion/styled"
import media from "@styles/media"

import FacebookIcon from "@icons/Facebook.Icon"
import InstagramIcon from "@icons/Instagram.Icon"
import Logo from "@components/Logo"

const navLinks = [
  { to: "/products", text: "SHOP ALL" },
  { to: "/about", text: "ABOUT US" },
]

const Footer = () => {
  return (
    <Section>
      <LogoWrapper>
        <HorizontalRule />
        <Link to="/">
          <Logo />
        </Link>
        <HorizontalRule />
      </LogoWrapper>
      <Grid>
        <Questions>
          <a href="mailto: support@gatsby.com" aria-label="Email">
            support@gatsby.com
          </a>
          <a href="tel: 072-2765-9672" aria-label="Tell">
            072-2765-9672
          </a>
        </Questions>
        <Social>
          <SNS>
            <div className="margin">
              <FacebookIcon />
            </div>
            <div className="margin">
              <InstagramIcon />
            </div>
          </SNS>
          <CopyRight>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </CopyRight>
        </Social>
        <Nav>
          {navLinks.map(nav => (
            <NavItem key={nav.to}>
              <Link to={nav.to}>{nav.text}</Link>
            </NavItem>
          ))}
        </Nav>
      </Grid>
    </Section>
  )
}

export default Footer

const Section = styled.footer`
  background: rgb(255, 255, 255);
  width: 100%;
  padding-bottom: 6rem;
  position: relative;
  z-index: 500;
  transform: translate3d(0px, 0px, 0px);
`
const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 4.8rem;
`

const HorizontalRule = styled.hr`
  height: 1px;
  background-color: black;
  flex: 1 1 0%;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns:
    [left] minmax(9%, 1fr) repeat(12, [col-start] minmax(0px, 70px) [col-end])
    minmax(9%, 1fr) [right];
  grid-column-gap: 1.5vw;

  ${media.tablet`
    grid-template-columns:
    [left] minmax(9%, 1fr) [col-start] 1fr [col-end] minmax(9%, 1fr) [right];
    grid-template-rows: repeat(3, 1fr);
    grid-row-gap: 2rem;
  `}
`
const Questions = styled.div`
  grid-column: 1 col-start / 4 col-end;
  text-align: center;
  display: flex;
  flex-direction: column;

  ${media.tablet`
    grid-column: col-start / col-end;
    grid-row: 2 / 3;    
  `}

  a {
    color: ${p => p.theme.colors.primary};
    margin-bottom: 14px;
  }

  a.disable {
    cursor: not-allowed;
    pointer-events: none;
  }
`

const Social = styled.div`
  grid-column: 5 col-start / 8 col-end;

  display: flex;
  flex-direction: column;

  ${media.tablet`
    grid-column: col-start / col-end;
    grid-row: 3 / 4;    
  `}
`

const SNS = styled.div`
  display: flex;
  justify-content: center;

  .margin {
    margin: 0 2rem;
  }
`

const CopyRight = styled.p`
  color: rgb(47, 47, 47);
  font-size: 12px;
  font-weight: 400;
  line-height: 1.92;
  margin: 2rem 0;
  text-align: center;

  a {
    color: ${p => p.theme.colors.primary};
    font-size: 14px;
    font-weight: 500;
  }
`

const Nav = styled.ul`
  grid-column: 9 col-start / 12 col-end;
  display: flex;
  flex-direction: column;

  ${media.tablet`
    grid-column: col-start / col-end;
    grid-row: 1 / 2;    
  `}
`

const NavItem = styled.li`
  color: ${p => p.theme.colors.primary};
  text-align: center;

  &:not(:last-child) {
    margin-bottom: 12px;
  }
`
