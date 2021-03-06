import { combineReducers } from "redux"
import actionTypes from "./actionTypes"

const setItem = products => {
  if (typeof window !== "undefined") {
    localStorage.setItem("products", JSON.stringify(products))
  }
}

const updateQuantity = (p, quantity) => {
  return p.quantity
    ? { ...p, quantity: p.quantity + quantity }
    : { ...p, quantity: quantity }
}

let initialState = []

if (typeof window !== "undefined" && localStorage.getItem("products")) {
  const products = JSON.parse(localStorage.getItem("products"))
  initialState = [...products]
}

const products = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_PRODUCT_TO_CART:
      const productInCart = state.find(p => p.id === action.product.id)
      if (!productInCart) {
        setItem([...state, action.product])
        return [...state, action.product]
      }

      const products = state.map(p => {
        if (p.id === action.product.id) {
          return updateQuantity(p, action.product.quantity)
        }
        return p
      })
      setItem(products)
      return products

    case actionTypes.REMOVE_PRODUCT_FROM_CART:
      state.splice(action.index, 1)
      setItem([...state])
      return [...state]

    default:
      return state
  }
}

const reducers = combineReducers({ products })

export default reducers
