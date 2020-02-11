import React from "react"
import { motion } from "framer-motion"
import styled from "@emotion/styled"

const Color = "#1F4836"

const NavToggle = ({ toggle }) => {
  return (
    <Button onClick={toggle}>
      <svg width="23" height="18" viewBox="0 0 23 18">
        <Path
          variants={{
            closed: { d: "M 2 2.5 L 20 2.5" },
            open: { d: "M 3 16.5 L 17 2.5" },
          }}
        />
        <Path
          variants={{
            closed: { d: "M 2 16.346 L 20 16.346" },
            open: { d: "M 3 2.5 L 17 16.346" },
          }}
        />
      </svg>
    </Button>
  )
}

export default NavToggle

const Path = props => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke={Color}
    strokeLinecap="round"
    {...props}
  />
)

const Button = styled.button`
  position: relative;
  z-index: 1600;
`
