'use strict'

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native'

import Goal from './components/goal'

const styles = StyleSheet.create({
  container : {
    flex            : 1
  , justifyContent  : 'center'
  , alignItems      : 'center'
  , backgroundColor : '#101010'
  }
, welcome   : {
    fontSize  : 20
  , textAlign : 'center'
  , margin    : 10
  }
, instructions : {
    textAlign    : 'center'
  , color        : '#dedede'
  , marginBottom : 5
  }
})

const goalee = React.createClass({
  getInitialState(){
    return {
      goals : [{
        name : 'create components'
      , list : [
          'goal component'
        , 'new component'
        , 'check stuff component'
        ]
      }]
    }
  },

  handleNewCount(){
    this.setState({count: this.state.count + 1})
  },

  render() {

    let goals = []

    for (let i = 0; i < this.state.goals.length; i++){
      goals.push(
        <Goal
          name={this.state.goals[i].name}
          key={this.state.goals[i].name}
        />
      )
    },

    return (
      <View style={styles.container}>
        <Goal />
        <TouchableHighlight onpress={this.handleNewCount}>
          <Text>Increment</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

AppRegistry.registerComponent('goalee', () => goalee)

