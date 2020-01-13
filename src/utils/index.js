import { useRef, useEffect } from "react"
import throttle from "lodash/throttle"

export function formatPrice(price, currency = "JPY") {
  let numberFormat = new Intl.NumberFormat(["ja-JP"], {
    style: "currency",
    currency: currency,
    currencyDisplay: "symbol",
  })
  return numberFormat.format(price)
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
