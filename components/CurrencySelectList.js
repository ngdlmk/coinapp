import React, {useContext, useState} from "react"
import { View, Text, FlatList, TouchableOpacity } from "react-native"
import AsyncStorage from '@react-native-community/async-storage'
import { connect } from "react-redux"
import currencies from "../currencies.json"
import { selectCurrency, fetchLiveData } from "../actions/coins"
import { fetchLiveDataRequest } from "../middleware/api"
import { Context } from "./Context"
import Searchbar from "../components/Searchbar";

const CurrencySelectList = (props) => {
  const context = useContext(Context)
  const [searchCurrency, setSearchCurrency] = useState('')
  const setCurrency = (code) => {
    props.selectCurrency({currency: code})
    const appInfo = {...context.info}
    appInfo.isCurrencyListOpen = false
    appInfo.isCurrencySelected = 'true'
    context.setState(appInfo)
    AsyncStorage.setItem('isCurrencySelected', 'true')
    AsyncStorage.setItem('currency', code)
    fetchLiveDataRequest(code, res => {
      props.fetchLiveData(res.rates)
    })
  }

  return (
    <View style={{flex: 1, backgroundColor: 'black', borderRadius: 10}}>
      <Searchbar changeText={(text) => setSearchCurrency(text)} placeholder="Search Currency" />
      <FlatList
        extraData={searchCurrency}
        style={{padding: 10}}
        data={currencies}
        keyExtractor={item => item.code}
        renderItem={({item}) =>  item.currency.toLowerCase().includes(searchCurrency) ? <ListItem setCurrency={() => setCurrency(item.code)} code={item.code} currency={item.currency} /> : null}
      />
    </View>
  )
}

const ListItem = (props) => {
  return (
    <TouchableOpacity onPress={props.setCurrency} style={{flex: 1, height: 50, marginTop: 10, backgroundColor: '#191919', flexDirection: 'row' }}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text style={{color: 'yellow', fontSize: 18, fontWeight: '400', marginLeft: 5}}>{props.code}</Text>
      </View>
      <View style={{flex: 5, justifyContent: 'center'}}>
        <Text style={{color: '#fff', fontSize: 18, marginLeft: 20}}>{props.currency}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default connect(
  null,
  {
    selectCurrency,
    fetchLiveData
  }
)(CurrencySelectList);