import { FETCH_COINS, SELECT_CURRENCY, FETCH_LIVE_DATA } from "../actions/types"

const defaultState = []

export const coinsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_COINS:
      return action.payload
    default:
      return state
  }
}

const currencyState = {currency: 'USD'}
export const selectCurrencyReducer = (state = currencyState, action) => {
  switch (action.type) {
    case SELECT_CURRENCY:
      return action.payload
    default:
      return state
  }
}

const liveState = {}
export const fetchLiveData = (state = liveState, action) => {
  switch (action.type) {
    case FETCH_LIVE_DATA:
      console.log(action.payload)
      return action.payload
    default:
      return state
  }
}