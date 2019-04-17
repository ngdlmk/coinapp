import React, { Component } from "react"
import { View, StyleSheet } from "react-native"
import AsyncStorage from '@react-native-community/async-storage'
import { connect } from "react-redux"
import { selectCurrency } from "../actions/coins"
import Appbar from "../components/Appbar"
import CurrencySelectList from "../components/CurrencySelectList"
import CryptoCoinsList from "../components/CryptoCoinsList"
import { Context } from "../components/Context"
import { fetchCoins, fetchLiveData } from "../actions/coins"
import { fetchCryptoCoins, fetchLiveDataRequest } from "../middleware/api"

class Home extends Component {
  static contextType = Context

  componentDidMount() {
    fetchCryptoCoins(res => {
      this.props.fetchCoins(res)
    })

    AsyncStorage.getItem('currency').then(cur => {
      if(cur) {
        this.props.selectCurrency({currency: cur})
        fetchLiveDataRequest(cur, res => {
          this.props.fetchLiveData(res.rates)
        })
      }
    })
  }
  
  openDetails = (params) => {
    this.props.navigation.navigate("Details", params)
  }
  render() {
    const { isCurrencySelected, isCurrencyListOpen } = this.context.info
    const { coins, liveCurrent } = this.props
    return (
      <View style={{flex: 1}}>
        <Appbar title="Coin App" />
        <View style={{backgroundColor: '#0F0F0F', flex: 1}}>
          {
            isCurrencySelected === 'false' || isCurrencyListOpen === true ? <CurrencySelectList /> : <CryptoCoinsList coins={coins} liveCurrent={liveCurrent} goDetails={this.openDetails} />
          }
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  coins: state.coins,
  liveCurrent: state.liveCoinCurrent
});

export default connect(
  mapStateToProps,
  {
    selectCurrency,
    fetchCoins,
    fetchLiveData
  }
)(Home);