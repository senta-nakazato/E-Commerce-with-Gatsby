import React, { useRef, useState, useEffect, useMemo } from "react"
import {
  motion,
  useMotionValue,
  useViewportScroll,
  useTransform,
} from "framer-motion"
import { getBreakpointFromTheme, useResize, getWindowDimensions } from "@utils"

export const ParallaxBox = ({
  children,
  yOffset = 300,
  easing = [0.42, 0, 0.58, 1],
  ...rest
}) => {
  const { scrollY } = useViewportScroll()
  const ref = useRef()
  const breakpoint = getBreakpointFromTheme("desktop")
  const screenSize = useResize().width
  const [elementTop, setElementTop] = useState(0)
  const [elementBottom, setElementBottom] = useState(0)
  const [clientHeight, setClientHeight] = useState(0)

  useEffect(() => {
    if (!ref.current) return

    const setValues = () => {
      setElementTop(ref.current.offsetTop)
      setElementBottom(ref.current.offsetTop + ref.current.offsetHeight)
      setClientHeight(window.innerHeight)
    }

    setValues()
    document.addEventListener("load", setValues)
    window.addEventListener("resize", setValues)

    return () => {
      document.removeEventListener("load", setValues)
      window.removeEventListener("resize", setValues)
    }
  }, [ref, yOffset])

  const transformInitialValue = elementTop - clientHeight * 0.2
  const transformFinalValue = elementTop + yOffset * 3

  const yRange = [transformInitialValue, transformFinalValue]

  const y = useTransform(scrollY, yRange, [yOffset, 0], easing)

  const opacityRange = [0, 1, 1, 0]

  const yOpacityRange = [
    elementTop,
    elementBottom,
    elementBottom + clientHeight * 0.6,
    elementBottom + clientHeight,
  ]
  const opacity = useTransform(scrollY, yOpacityRange, opacityRange)
  console.log("screenSize", screenSize)
  console.log("breakpoint", breakpoint)
  console.log("ScreenSize > breakpoint", screenSize > breakpoint)

  return screenSize > breakpoint ? (
    <motion.div ref={ref} initial={{ y: 0 }} style={{ y, opacity }} {...rest}>
      {children}
    </motion.div>
  ) : (
    <div ref={ref}>{children}</div>
  )
}
