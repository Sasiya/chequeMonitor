import React, {Component} from 'react';
import {Text, View} from 'react-native';
import Customer from '../app/Customer/Customer';
import CustomHeader from '../common/CustomHeader/CustomHeader';

export default class Customers extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <CustomHeader
          title={'Add Shops'}
          onPress={() => this.props.navigation.goBack()}
        />
        <Customer />
      </View>
    );
  }
}
