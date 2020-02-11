import React, { useState, useEffect } from "react"
import throttle from "lodash/throttle"
import { getBreakpointFromTheme, getWindowDimensions } from "@utils"

function useWindowSize() {
  // If we don't check for window a whole lot of crazy build bugs occur!
  if (typeof window !== "undefined") {
    const [windowSize, setWindowSize] = useState(getWindowDimensions())

    const handleResize = throttle(function() {
      setWindowSize(getWindowDimensions())
    })

    useEffect(() => {
      window.addEventListener("resize", handleResize)
      return () => {
        window.removeEventListener("resize", handleResize)
      }
    }, [])

    return windowSize
  }
  return 0
}

function MediaQuery({ maxWidth, minWidth, children }) {
  const { width: windowWidth } = useWindowSize()

  const on = maxWidth || minWidth
  const breakpoint = on ? getBreakpointFromTheme(on.toLowerCase()) : Infinity

  // maxWidth will render anything SMALLER than the breakpoint
  if (maxWidth && breakpoint > windowWidth) {
    return children
  }

  // minWidth will render anything GREATER than the breakpoint
  if (minWidth && breakpoint < windowWidth) {
    return children
  }

  return null
}

export default MediaQuery
