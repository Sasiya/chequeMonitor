import React, {Component} from 'react';
import {Text, View} from 'react-native';
import Main from '../app/Main/Main';

export default class Home extends Component {
  render() {
    const {navigation} = this.props;
    return <Main navigation={navigation} />;
  }
}
