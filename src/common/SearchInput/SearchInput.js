import React, {Component} from 'react';
import {Text, View, TextInput, TouchableOpacity} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import IconM from 'react-native-vector-icons/MaterialIcons';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default class SearchInput extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.icon}>
          <Icon size={hp('3.5%')} name="search" />
        </View>
        <TextInput
          placeholder="Search"
          placeholderTextColor="white"
          style={styles.TextInput}
          onChangeText={text => this.props.onChangeText(text)}
        />
      </View>
    );
  }
}
