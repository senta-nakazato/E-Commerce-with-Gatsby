import React, { useEffect, useRef, useContext } from "react"
import styled from "@emotion/styled"
import { motion } from "framer-motion"

import { ShoppingBagContext } from "./ShoppingBag.Context"
import ShoppingBag from "./ShoppingBag"

import media from "@styles/media"
import { scrollable } from "@utils"
import BackArrowIcon from "@icons/BackArrow.Icon"

// const components = {
//   shoppingBag: PhotoStory,
//   productDetail: VideoStory,
// }

const ShoppingBagSlideIn = () => {
  const { showShoppingBag, toggleShoppingBag } = useContext(ShoppingBagContext)
  const frameRef = useRef(null)

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
      x: "100%",
      transition: {
        duration: 0.4,
      },
    },
  }

  function handleEscKeyPress(event) {
    if (event.key === "Escape") {
      toggleShoppingBag(event)
    }
  }

  useEffect(() => {
    if (showShoppingBag) {
      scrollable("disable")

      function handleEscKeyPress(event) {
        if (event.key === "Escape") {
          toggleShoppingBag(event)
        }
      }

      window.addEventListener("keydown", handleEscKeyPress)

      return () => window.removeEventListener("keydown", handleEscKeyPress)
    } else {
      scrollable("enable")
    }
  }, [showShoppingBag])

  return (
    <Frame
      tabIndex={showShoppingBag ? 0 : -1}
      aria-hidden={!showShoppingBag}
      ref={frameRef}
      initial={false}
      animate={showShoppingBag ? "open" : "closed"}
    >
      <Mask isActive={showShoppingBag} onClick={toggleShoppingBag} />

      <SlideIn variants={variants}>
        <CloseContainer
          onClick={toggleShoppingBag}
          animation={showShoppingBag}
          data-a11y="false"
        >
          <BackArrowIcon />
        </CloseContainer>

        <ShoppingBag />
      </SlideIn>
    </Frame>
  )
}

export default ShoppingBagSlideIn

const Frame = styled(motion.div)`
  position: relative;
  z-index: 1100;
`

const Mask = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  background: rgba(17, 18, 22, 0.2);
  pointer-events: ${p => (p.isActive ? "initial" : "none")};
  opacity: ${p => (p.isActive ? 1 : 0)};
  transition: opacity ${p => (p.isActive ? "0.7s" : "0")},
    ${p => (p.isActive ? "0.3s" : "0.2s")};
`

const SlideIn = styled(motion.div)`
  background: white;
  max-width: 50rem;
  padding: 8rem;
  padding-bottom: 4rem;
  height: 100vh;
  width: auto;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1500;
`

const CloseContainer = styled.button`
  position: absolute;
  top: 2rem;
  left: 2rem;

  ${media.tablet`
    display: none;
  `}

  &:hover::after {
    background: rgba(0, 0, 0, 0.03);
    transform: scale(1);
  }

  &[data-a11y="true"]:focus {
    border: 2px solid ${p => p.theme.colors.purple};
  }
`

const ShoppingBagWrapper = styled.div`
  width: 32rem;
`
