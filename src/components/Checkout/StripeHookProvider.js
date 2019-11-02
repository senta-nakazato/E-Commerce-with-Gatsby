import React, { useContext, createContext } from "react"
import { injectStripe } from "react-stripe-elements"

const Context = createContext()

export const useStripe = () => useContext(Context)

const HookProvider = ({ children, stripe }) => {
  return <Context.Provider value={stripe}>{children}</Context.Provider>
}

const StripeHookProvider = injectStripe(HookProvider)

export default StripeHookProvider
