import React, {useContext} from "react"
import { View, Text, StyleSheet, TouchableHighlight } from "react-native"
import { connect } from "react-redux"
import { Context } from "../components/Context"

const Appbar = (props) => {
  return (
    <View style={styles.appbar}>
      <View style={{flex: 1}}> 
        <Text style={styles.appbarText}>{props.title}</Text>
      </View>
      <CurrencySelector currency={props.selectedCurrency} />
    </View>
  )
}

const CurrencySelector = (props) => {
  
  const context = useContext(Context)
  const openCurrencyList = () => {
    const appInfo = {...context.info}
    appInfo.isCurrencyListOpen = true
    context.setState(appInfo)
  }

  return (
    <TouchableHighlight onPress={openCurrencyList} style={styles.currencySelector}>
      <Text style={styles.currencySelectorText}>{props.currency}</Text>
    </TouchableHighlight>
  )
}

const mapStateToProps = state => ({
  selectedCurrency: state.selectedCurrency.currency,
});

export default connect(
  mapStateToProps,
  null
)(Appbar);

const styles = StyleSheet.create({
  appbar: {
    height: 60, 
    backgroundColor: 'black', 
    alignItems: 'center',
    elevation: 5,
    flexDirection: 'row',
    borderBottomColor: '#333333', 
    borderBottomWidth: 2
  },
  appbarText: {
    marginLeft: 50,
    color: '#fff',
    fontSize: 20,
    fontWeight: '800'
  },
  currencySelectorText: {
    color: '#00F000', 
    fontSize: 14, 
    fontWeight: '500'
  },
  currencySelector: {
    padding: 5, 
    backgroundColor: '#2E3133', 
    borderRadius: 8, 
    borderWidth: 2, 
    borderColor: 'yellow', 
    marginRight: 20
  }
});