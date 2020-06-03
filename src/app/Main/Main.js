import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity, FlatList} from 'react-native';
import styles from './styles';
import {
  faShareSquare,
  faMoneyBillWave,
  faLocationArrow,
  faRoute,
  faBoxes,
  faReceipt,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Icon5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconM from 'react-native-vector-icons/MaterialIcons';

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: [
        {id: 0, name: 'Insert Bills', nav: 'AddDetails'},
        {id: 1, name: 'View Bills', nav: 'BillDetails'},
        {id: 2, name: 'Pending Cheques', nav: 'PendingCheques'},
        {id: 3, name: 'Passed Cheques', nav: 'PassedCheques'},
        {id: 4, name: 'Cash and Pendings', nav: 'CashAndPending'},
      ],
    };
  }
  renderMenu() {
    const {item} = this.state;

    return (
      <FlatList
        data={item}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate(item.nav)}
            style={{
              height: hp('15%'),
              width: hp('15%'),
              margin: hp('0.5%'),
              borderRadius: hp('1%'),
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,

              elevation: 3,
            }}>
            <Text style={{alignSelf: 'center'}}>{item.name}</Text>
          </TouchableOpacity>
        )}
        //Setting the number of column
        numColumns={3}
        keyExtractor={(item, index) => index}
      />
    );
  }

  render() {
    console.log(this.state.item.length);
    return (
      <View style={styles.mainContainer}>
        <View style={styles.topStyle}>
          <Text onPress={() => this.props.navigation.openDrawer()}>sas</Text>
        </View>
        <View style={styles.bottomStyle}>
          <View style={styles.lowercontainer}>
            {this.renderMenu()}
            {/* <View style={styles.iconRow}>
              <TouchableOpacity
                style={styles.iconHolder}
                onPress={() => this.props.navigation.navigate('AddDetails')}>
                <Image
                  style={styles.imageStyle}
                  source={require('../../assets/insertdetails.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconHolder}
                onPress={() => this.props.navigation.navigate('BillDetails')}>
                <Image
                  style={styles.imageStyle}
                  source={require('../../assets/billshow.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconHolder}
                onPress={() =>
                  this.props.navigation.navigate('PendingCheques')
                }>
                <Image
                  style={styles.imageStyle}
                  source={require('../../assets/billshow.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconHolder}
                onPress={() => this.props.navigation.navigate('PassedCheques')}>
                <Image
                  style={styles.imageStyle}
                  source={require('../../assets/billshow.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconHolder}
                onPress={() =>
                  this.props.navigation.navigate('CashAndPending')
                }>
                <Image
                  style={styles.imageStyle}
                  source={require('../../assets/billshow.png')}
                />
              </TouchableOpacity>
              <View style={styles.iconHolder} />
            </View> */}
          </View>
        </View>
      </View>
    );
  }
}
