import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';

export default class Drawer extends Component {
  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('CustomerList')}>
          <Text>Click me</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
