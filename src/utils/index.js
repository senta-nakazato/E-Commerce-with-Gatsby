import { useRef, useEffect, useState } from "react"
import theme from "../gatsby-plugin-theme-ui"

import throttle from "lodash/throttle"

export function formatPrice(price, currency = "JPY") {
  let numberFormat = new Intl.NumberFormat(["ja-JP"], {
    style: "currency",
    currency: currency,
    currencyDisplay: "symbol",
  })
  return numberFormat.format(price)
}

export function slugify(string) {
  const slug = string
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036F]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")

  return slug.replace(/\/\/+/g, "/")
}

// export function useScrollPosition() {
//   const [offset, setOffset] = useState(0)

//   useEffect(() => {
//     const handleScroll = throttle(() => setOffset(window.pageYOffset), 30)
//     window.addEventListener("scroll", handleScroll)

//     return () => window.removeEventListener("scroll", handleScroll)
//   }, [])

//   return offset
// }

// https://dev.to/n8tb1t/tracking-scroll-position-with-react-hooks-3bbj

const isBrowser = typeof window !== `undefined`

function getScrollPosition({ element, useWindow }) {
  if (!isBrowser) return { x: 0, y: 0 }

  const target = element ? element.current : document.body
  const position = target.getBoundingClientRect()

  return useWindow
    ? { x: window.scrollX, y: window.scrollY }
    : { x: position.left, y: position.top }
}

export function useScrollPosition(effect, deps, element, useWindow, wait) {
  const position = useRef(getScrollPosition({ useWindow }))

  let throttleTimeout = null

  const callBack = () => {
    const currPos = getScrollPosition({ element, useWindow })
    effect({ prevPos: position.current, currPos })
    position.current = currPos
    throttleTimeout = null
  }

  useEffect(() => {
    const handleScroll = () => {
      if (wait) {
        if (throttleTimeout === null) {
          throttleTimeout = setTimeout(callBack, wait)
        }
      } else {
        callBack()
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
  }, deps)
}

export const scrollable = action => {
  if (action.toLowerCase() === "enable") {
    document.body.style.cssText = null
  } else {
    document.body.style.overflow = "hidden"
    document.body.style.height = "100%"
  }
}

// https://dev.to/gabe_ragland/debouncing-with-react-hooks-jci

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value])

  return debouncedValue
}

export const getBreakpointFromTheme = name => {
  const breakpoint = theme.breakpoints.find(([label, _]) => label === name)
  return breakpoint[1]
}

export const getWindowDimensions = () => {
  if (typeof window !== "undefined") {
    const width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth

    const height =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight

    return {
      height,
      width,
    }
  }

  return {
    width: 0,
    height: 0,
  }
}

export function useResize() {
  const [dimensions, setDimensions] = useState({ width: 1280, height: 900 })

  useEffect(() => {
    setDimensions(getWindowDimensions())

    const handleResize = throttle(
      () => setDimensions(getWindowDimensions()),
      100
    )

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return dimensions
}
