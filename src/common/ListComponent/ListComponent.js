import React, {Component} from 'react';
import {Text, View, Image} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import {formatMoney} from '../../helpers';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default class ListComponent extends Component {
  render() {
    const {
      type,
      shopName,
      billDate,
      pendingAmount,
      cashAmount,
      chequeAmount,
    } = this.props;
    let icon = <View />;
    let amount = '';
    if (type == 'cheque') {
      amount = chequeAmount;
      icon = (
        <View style={styles.iconHolder}>
          <Image
            style={{height: hp('6%'), width: wp('9.5%'), alignSelf: 'center'}}
            source={require('../../assets/cheq.png')}
          />
        </View>
      );
    }
    if (type == 'cash') {
      amount = cashAmount;
      icon = (
        <View style={styles.iconHolder}>
          <Icon name="money" size={hp('5%')} color="#737373" />
        </View>
      );
    }
    if (type == 'pending') {
      amount = pendingAmount;
      icon = (
        <View style={styles.iconHolder}>
          <Icon5 name="dna" size={hp('5%')} color="#737373" />
        </View>
      );
    }
    return (
      <View style={styles.mainContainer}>
        {icon}
        <View style={styles.innerStyle}>
          <View style={styles.leftContent}>
            <Text style={styles.shopText}>{shopName}</Text>
            <Text style={styles.billText}>{billDate}</Text>
          </View>
          <View>
            <Text style={styles.amountStyle}>Rs. {formatMoney(amount)}</Text>
          </View>
        </View>
      </View>
    );
  }
}
