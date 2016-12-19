import { createStore, combineReducers } from 'redux'

const pulseData = (state = [0], action) => {
  let last = state[ state.length - 1 ]
  switch (action.type) {
    case 'INCREMENT':
      return state.concat([++last])
    case 'DECREMENT':
      if (last !== 0) {
        return state.concat([--last])
      }
      break
    default:
      return state
  }
}

// store all reducers in one variable
const combinedReducers = combineReducers({
  pulseData
})

const store = createStore(combinedReducers)

export default store
