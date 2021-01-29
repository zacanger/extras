import React, {View, Text} from 'react-native'

const Goal = React.createClass({
  render(){
    return (
      <View>
        <Text>{this.props.name}</Text>
      </View>
    )
  }
})

export default Goal

