import { SELECT_CURRENCY, FETCH_COINS, FETCH_LIVE_DATA } from "./types"

export const fetchCoins = coins => ({
  type: FETCH_COINS,
  payload: coins
})

export const selectCurrency = currency => ({
  type: SELECT_CURRENCY,
  payload: currency
})

export const fetchLiveData = data => ({
  type: FETCH_LIVE_DATA,
  payload: data
})
