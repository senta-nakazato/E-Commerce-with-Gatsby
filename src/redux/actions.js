import actionTypes from "./actionTypes"

export const addToCart = product => ({
  type: actionTypes.ADD_PRODUCT_TO_CART,
  product: { ...product, quantity: product.quantity },
})

export const removeFromCart = index => ({
  type: actionTypes.REMOVE_PRODUCT_FROM_CART,
  index,
})
