import React, {useEffect} from 'react'
import {StatusBar} from 'react-native'
import { Provider } from 'react-redux'
import { ContextProvider } from "./components/Context"
import store from './store';
import { createStackNavigator, createAppContainer } from "react-navigation"
import Details from './pages/Details'
import Home from "./pages/Home"

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        header: null
      }
    },
    Details: {
      screen: Details,
      navigationOptions: {
        title: 'Details',
        headerStyle: {
          backgroundColor: 'black',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        }
      }
    }
  },
  {
    initialRouteName: "Home"
  }
)

const AppContainer = createAppContainer(AppNavigator);

export default () => {
    useEffect(() => {
      StatusBar.setBackgroundColor('black')
    })
    return (
              <Provider store={store}>
                <ContextProvider>
                  <AppContainer />
                </ContextProvider>
              </Provider>
            )
}

