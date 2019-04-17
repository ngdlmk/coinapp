import React, {useState} from "react"
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native"
import Searchbar from "../components/Searchbar"

const CryptoCoinsList = (props) => {
  const [searchCurrency, setSearchCurrency] = useState('')
  return (
    <View style={{flex: 1, backgroundColor: 'black', borderRadius: 10}}>
      <Searchbar placeholder="Search Crypto Currencies" changeText={(text) => setSearchCurrency(text)}/>
      <FlatList
        extraData={props.coins}
        style={{padding: 10}}
        data={props.coins}
        keyExtractor={item => item.symbol}
        renderItem={({item}) =>  item.name.toLowerCase().includes(searchCurrency) ? <ListItem 
                                    goDetails={() => props.goDetails(item)} 
                                    symbol={item.symbol} 
                                    name={item.name} 
                                    iconUrl={item.icon_url}
                                    current={props.liveCurrent[item.symbol]}
                                  /> : null}
      />
    </View>
  )
}

const ListItem = (props) => {
  return (
    <TouchableOpacity onPress={props.goDetails} style={{flex: 1, height: 100, marginTop: 10, backgroundColor: '#191919', flexDirection: 'column' }}>
      <View style={{height: 60, width: '100%', borderBottomColor: '#212121', borderBottomWidth: 1, flexDirection: 'row'}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: 'yellow', fontSize: 18, fontWeight: '400', marginLeft: 5}}>{props.symbol}</Text>
        </View>
        <View style={{flex: 5, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: '#fff', fontSize: 18, marginLeft: 20}}>{props.name}</Text>
        </View>
        <View style={{height: 60, width: 60, marginRight: 5, justifyContent: 'center', alignItems: 'center'}}>
          <Image style={{width: 40, height: 40}} source={{uri: props.iconUrl}} />
        </View>
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: '#00F000', fontSize: 18, marginLeft: 20}}>{props.current}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default CryptoCoinsList