import React, {Component} from 'react';
import {Text, View, TextInput} from 'react-native';
import styles from './styles';

export default class Tab2 extends Component {

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.inputText2}>
          <Text style={styles.title}>Cash Amount :</Text>
          <TextInput
            style={styles.mainInput}
            onChangeText={text => this.props.setCashAmount(text)}
            keyboardType="number-pad"
          />
        </View>
      </View>
    );
  }
}
