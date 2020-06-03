import React, {Component} from 'react';
import {Text, View} from 'react-native';
import InsertDetails from '../app/InsertDetails/InsertDetails';
import CustomHeader from '../common/CustomHeader/CustomHeader';
export default class AddDetails extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <View style={{flex: 1}}>
        <CustomHeader
          title={'Add Bills'}
          onPress={() => this.props.navigation.goBack()}
        />

        <InsertDetails navigation={navigation} />
      </View>
    );
  }
}
