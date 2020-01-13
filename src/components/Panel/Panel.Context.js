import React, { createContext, useState } from "react"

export const PanelContext = createContext({
  showPanel: false,
  togglePanel: event => {},
})

const PanelProvider = ({ children }) => {
  const [showPanel, setShowPanel] = useState(false)

  function togglePanel(event) {
    if (event) {
      event.preventDefault()
      event.stopPropagation()
    }

    if (true) {
      setShowPanel(prevContact => !prevContact)
    } else {
      return null
    }
  }

  return (
    <PanelContext.Provider value={{ showPanel, togglePanel }}>
      {children}
    </PanelContext.Provider>
  )
}

export default PanelProvider
