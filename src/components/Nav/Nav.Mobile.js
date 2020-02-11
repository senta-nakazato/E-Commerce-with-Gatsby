import * as React from "react"
import { useEffect, useRef, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import styled from "@emotion/styled"
import media from "@styles/media"
import { scrollable } from "@utils"

import NavList from "@components/Nav/Nav.List"
import NavToggle from "@components/Nav/Nav.Toggle"

const NavMobile = () => {
  const frameRef = useRef(null)
  const [showNav, setShowNav] = useState(false)

  const variants = {
    open: {
      pointerEvents: "auto",
      opacity: 1,
      x: "0%",
      transition: {
        duration: 0.4,
      },
    },
    closed: {
      pointerEvents: "none",
      opacity: 0,
      x: "-100%",
      transition: {
        duration: 0.4,
      },
    },
  }

  useEffect(() => {
    if (showNav) {
      scrollable("disable")

      function handleEscKeyPress(event) {
        if (event.key === "Escape") {
          setShowNav(false)
        }
      }

      window.addEventListener("keydown", handleEscKeyPress)

      return () => window.removeEventListener("keydown", handleEscKeyPress)
    } else {
      scrollable("enable")
    }
  }, [showNav])

  return (
    <Frame
      tabIndex={showNav ? 0 : -1}
      aria-hidden={!showNav}
      ref={frameRef}
      initial={false}
      animate={showNav ? "open" : "closed"}
    >
      <Mask isActive={showNav} onClick={() => setShowNav(!showNav)} />

      <NavToggle toggle={() => setShowNav(!showNav)} />

      <Nav variants={variants}>
        <NavList />
      </Nav>
    </Frame>
  )
}

export default NavMobile

const Frame = styled(motion.div)`
  position: relative;
  z-index: 1100;
`

const Nav = styled(motion.nav)`
  background: white;
  max-width: 40rem;
  padding: 8rem;
  padding-bottom: 4rem;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1500;
`

const Mask = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1500;
  margin: 0 auto;
  width: 100vw;
  height: 100vh;
  background: rgba(17, 18, 22, 0.2);
  pointer-events: ${p => (p.isActive ? "initial" : "none")};
  opacity: ${p => (p.isActive ? 1 : 0)};
  transition: opacity ${p => (p.isActive ? "0.7s" : "0")},
    ${p => (p.isActive ? "0.3s" : "0.2s")};
`
