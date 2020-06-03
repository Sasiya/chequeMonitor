import React, {Component} from 'react';
import {Text, View} from 'react-native';
import ShowBills from '../app/ShowBills/ShowBills';

export default class BillDetails extends Component {
  render() {
    const {navigation} = this.props;
    return <ShowBills navigation={navigation} />;
  }
}
