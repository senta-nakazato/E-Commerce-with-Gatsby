import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import reducers from "./reducers"

function configureStore(preloadedState) {
  const store = createStore(reducers, preloadedState, applyMiddleware(thunk))
  // const store = createStore(reducers, preloadedState, applyMiddleware(thunk))

  return store
}

export default configureStore({})
