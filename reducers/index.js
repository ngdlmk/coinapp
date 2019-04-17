import { combineReducers } from "redux";
import { selectCurrencyReducer, coinsReducer, fetchLiveData } from './coins'

export default combineReducers({
  coins: coinsReducer,
  selectedCurrency: selectCurrencyReducer,
  liveCoinCurrent: fetchLiveData
});