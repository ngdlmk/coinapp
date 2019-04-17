import React from "react";
import { View, TextInput } from "react-native"
import { Icon } from "native-base"

const Searcbar = (props) => {
  return (
    <View style={{backgroundColor: '#191919', borderRadius: 4, height: 40, marginLeft: 20, marginRight:20, marginTop: 10, marginBottom: 10, flexDirection: 'row'}}>
      <View style={{justifyContent: 'center', marginLeft: 16}}>
        <Icon type='FontAwesome' name="search" style={{color: "#fff"}} fontSize={16} />
      </View>
      <View style={{justifyContent: 'center', marginLeft: 16, width: '100%'}}>
        <TextInput onChangeText={props.changeText} placeholderTextColor="#fff" placeholder={props.placeholder} style={{ height: 40, color: 'white', fontSize: 14 }} underlineColorAndroid='rgba(0,0,0,0)' />
      </View>
    </View>
  )
}

export default Searcbar