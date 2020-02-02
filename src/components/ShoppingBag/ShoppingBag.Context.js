import React, { createContext, useState } from "react"

export const ShoppingBagContext = createContext({
  showShoppingBag: false,
  toggleShoppingBag: event => {},
})

const ShoppingBagProvider = ({ children }) => {
  const [showShoppingBag, setShowShoppingBag] = useState(false)

  function toggleShoppingBag(event) {
    if (event) {
      event.preventDefault()
      event.stopPropagation()
    }

    setShowShoppingBag(prevShoppingBag => !prevShoppingBag)
  }

  return (
    <ShoppingBagContext.Provider value={{ showShoppingBag, toggleShoppingBag }}>
      {children}
    </ShoppingBagContext.Provider>
  )
}

export default ShoppingBagProvider
