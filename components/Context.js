import React, { useState, useEffect } from "react"
import AsyncStorage from '@react-native-community/async-storage'

export const Context = React.createContext()
export const ContextProvider = props => {

  const [info, setInfo] = useState({
    isCurrencySelected: 'false',
    isCurrencyListOpen: false,
    requestList: true,
    requestLiveData: true
  })

  useEffect(() => {
    AsyncStorage.getItem('isCurrencySelected').then(res => {
      if(info.isCurrencySelected !== res) {
        if(res === 'true') {
          const appInfo = {...info}
          appInfo.isCurrencySelected = res
          setInfo(appInfo)
        }
      }
    })
  })

  const setState = (info) => {
    setInfo(info)
  }

  return (
    <Context.Provider value={{
      info: info,
      setState: setState
    }}
    >
      {props.children}
    </Context.Provider>
  )
}