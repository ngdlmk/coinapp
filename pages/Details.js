import React, {Component} from "react"
import { View, Text, StyleSheet, Image } from "react-native";
import { Grid, YAxis, BarChart } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { Tab, Tabs, Icon } from 'native-base'
import { DateTime } from "luxon"
import { connect } from "react-redux"
import { fetchHistoricalData, requestLiveData } from "../middleware/api"

class Details extends Component  {
  state = {
    wData: [],
    mData: [],
    liveData: {
      first: 0,
      last: 0
    }
  }
  
  interval = 0

  componentDidMount() {
    this.reqData()
    this.fetchLiveData(res => {
      this.setState({
        liveData: {
          first: res,
          last: res
        }
      })
    })


    this.interval = setInterval(() => {
      this.fetchLiveData(res => {
        const first = this.state.liveData.last
        this.setState({
          liveData: {
            first: first,
            last: res
          }
        })
      })
    }, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  componentDidUpdate() {
    console.log(this.state.liveData)
  }

  arrDate = (count) => {
    const dates = []
    const day = DateTime.local().day
    const month = DateTime.local().month
    const year = DateTime.local().year
    let date = DateTime.local(year, month, day).toISODate()
    dates.push(date)
    for(let i=0; i<count; i++) {
        date = DateTime.fromISO(date).minus({day: 1}).toISODate()
        dates.push(date)
    }
    return dates
  }

  reqData = () => {
    const dates = this.arrDate(30)
    const mCurs = []
    const wCurs = []
    const symbol = this.props.navigation.state.params.symbol
    const currency = this.props.selectedCurrency
    let counter = 0
    dates.map(date => {
      fetchHistoricalData(date, symbol, currency, res => {
        if(counter < 7) {
          wCurs.push(res.rates[symbol])
        }
        mCurs.push(res.rates[symbol])
        counter++
      })
    })
    this.setState({
      wData: wCurs,
      mData: mCurs
    })
  }

  fetchLiveData = (callback) => {
    const currency = this.props.selectedCurrency
    const symbol = this.props.navigation.state.params.symbol
    requestLiveData(currency, symbol, res => {
      callback(res.rates[symbol])
    })
  }

  calcChange = (first, last) => {
    let perc = 0
    const diff = last - first
    if(diff !== 0) {
      perc = diff * 100 / first
    }
    return perc
  }

  render() {
    const { first, last } = this.state.liveData
    const perc = this.calcChange(first, last)
    let icon = 'minus'
    let fontColor = '#fff'
    if(first === last) {
      icon = 'minus'
      fontColor = '#fff'
    }
    if(first > last) {
      icon = 'arrow-down'
      fontColor = 'red'
    }
    if(first < last) {
      icon = 'arrow-up'
      fontColor = 'green'
    }
    //arrow-up
    const { icon_url, symbol, name } = this.props.navigation.state.params
    return (
      <View style={styles.container}>
        <Tabs>
          <Tab heading="Live Mode" tabStyle={{backgroundColor: 'black'}} activeTabStyle={{backgroundColor: 'black'}} textStyle={{color: '#828282'}}>
            <View style={{flex: 1, paddingTop: 50, backgroundColor: 'black', borderTopColor: '#333333', borderTopWidth: 2, alignItems: 'center'}}>
              <View style={{height: '40%', width: '90%', flexDirection: 'column', backgroundColor: '#262626', borderRadius: 10, alignItems: 'center'}}>
                <View style={{height: 60, width: '96%', alignItems: 'center', borderBottomColor: '#404040', borderBottomWidth: 2, flexDirection: 'row'}}>
                  <Image style={{width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: '#fff'}} source={{uri: icon_url}} />
                  <Text style={{color: '#fff', marginLeft: 20, fontSize: 18, fontWeight: '600'}}>{name}</Text>
                </View>
                <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{color: '#fff', marginLeft: 20, fontSize: 20, fontWeight: '600'}}>1{symbol} = {this.state.liveData.last} {this.props.selectedCurrency}</Text>
                  <View style={{width: '100%', flexDirection: 'row'}}>
                    <Text style={{color: fontColor, marginLeft: 20, fontSize: 20, fontWeight: '600'}}>%{perc}</Text>
                    <Icon type='FontAwesome' name={icon} style={{color: fontColor}} fontSize={30} />
                  </View>
                </View>
              </View>
            </View>
          </Tab>
          <Tab heading="Weekly Mode" tabStyle={{backgroundColor: 'black'}} activeTabStyle={{backgroundColor: 'black'}} textStyle={{color: '#828282'}}>
          <View style={{flex: 1, paddingTop: 50, backgroundColor: 'black', borderTopColor: '#333333', borderTopWidth: 2, alignItems: 'center', justifyContent: 'center' }}>
              <View style={{height: '70%', width: '90%', flexDirection: 'column', backgroundColor: '#262626', borderRadius: 10}}>
                <View style={{height: '90%', width: '100%', flexDirection: 'row'}}>
                <YAxis
                    style={{marginLeft: 10}}
                    data={ this.state.wData }
                    contentInset={{ top: 20, bottom: 20 }}
                    svg={{
                        fill: 'white',
                        fontSize: 10,
                    }}
                    numberOfTicks={ 8 }
                    formatLabel={ value => value}
                  />
                  <BarChart
                    style={{ flex: 1, marginLeft: 5, marginRight: 5 }}
                    data={ this.state.wData }
                    contentInset={{ top: 30, bottom: 30 }}
                    svg={{ fill: 'rgba(0, 126, 138, 0.8)' }}
                  >
                  <Grid/>
                  </BarChart>
                </View>
              </View>
            </View>
          </Tab>
          <Tab heading="Monthly Mode" tabStyle={{backgroundColor: 'black'}} activeTabStyle={{backgroundColor: 'black'}} textStyle={{color: '#828282'}}>
          <View style={{flex: 1, paddingTop: 50, backgroundColor: 'black', borderTopColor: '#333333', borderTopWidth: 2, alignItems: 'center', justifyContent: 'center' }}>
              <View style={{height: '70%', width: '90%', flexDirection: 'column', backgroundColor: '#262626', borderRadius: 10}}>
                <View style={{height: '90%', width: '100%', flexDirection: 'row'}}>
                <YAxis
                    style={{marginLeft: 10}}
                    data={ this.state.mData }
                    contentInset={{ top: 30, bottom: 30 }}
                    svg={{
                        fill: 'white',
                        fontSize: 10,
                    }}
                    numberOfTicks={ 8 }
                    formatLabel={ value => value}
                  />
                  <BarChart
                    style={{ flex: 1, marginLeft: 5, marginRight: 5 }}
                    data={ this.state.mData }
                    contentInset={{ top: 30, bottom: 30 }}
                    svg={{ fill: 'rgba(0, 126, 138, 0.8)' }}
                  >
                  <Grid/>
                  </BarChart>
                </View>
              </View>
            </View>
          </Tab>
        </Tabs>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  selectedCurrency: state.selectedCurrency.currency,
});

export default connect(
  mapStateToProps,
  null
)(Details);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  }
});