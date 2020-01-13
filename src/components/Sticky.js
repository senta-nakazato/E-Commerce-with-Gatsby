import React, { useState } from "react"
import { css } from "@emotion/core"
import styled from "@emotion/styled"
import { useScrollPosition } from "@utils"

const Sticky = ({ children }) => {
  const [isHidden, setIsHidden] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const target = document.getElementById("home-hero")
  const contentHeight = target ? target.clientHeight : "600"

  useScrollPosition(
    ({ prevPos, currPos }) => {
      setIsScrolled(Math.abs(currPos.y) > contentHeight)
      if (isScrolled) {
        currPos.y > prevPos.y ? setIsHidden(false) : setIsHidden(true)
      } else {
        setIsHidden(false)
      }
    },
    [isHidden, isScrolled],
    false,
    false,
    300
  )

  return (
    <Frame isHidden={isHidden} isScrolled={isScrolled}>
      {children}
    </Frame>
  )
}

export default Sticky

const Frame = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  width: 100%;
  background: transparent;
  transform: translate(0px, 0px);
  transition: all 300ms ease;
  visibility: visible;
  z-index: 1000;

  ${p =>
    p.isScrolled &&
    css`
      background: white;
    `};

  ${p =>
    p.isHidden &&
    css`
      visibility: hidden;
      transform: translate(0, -100%);
    `};

  &::after {
    content: attr(data-component);
  }
`
