import React from "react"
import { Link } from "gatsby"
import { motion, useReducedMotion } from "framer-motion"
import styled from "@emotion/styled"

import SocialLinks from "@components/SocialLinks"

const navLinks = [
  { to: "/products", text: "SHOP ALL" },
  { to: "/about", text: "ABOUT US" },
]

const NavList = () => {
  const variants = {
    open: {
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.07,
      },
    },
    closed: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  }
  return (
    <>
      <List variants={variants}>
        {navLinks.map(item => (
          <NavItem key={item.to} text={item.text} to={item.to} />
        ))}
        <NavItem key="social">
          <SocialLinks />
        </NavItem>
      </List>
    </>
  )
}

export default NavList

const NavItem = ({ text, to, children }) => {
  const isReducedMotion = useReducedMotion()

  const variants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
    closed: {
      y: isReducedMotion ? 0 : 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
      },
    },
  }
  console.log("children", children)

  if (text) {
    return (
      <Item
        variants={variants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link to={to}>{text}</Link>
      </Item>
    )
  } else {
    return (
      <Item
        variants={variants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {children}
      </Item>
    )
  }
}

const List = styled(motion.ul)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 8rem;
`

const Item = styled(motion.li)`
  cursor: pointer;
  font-size: 2rem;
  list-style: none;
  margin-bottom: 20px;
`
