import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image,
  Alert,
  BackHandler,
} from 'react-native';
import styles from './styles';
import ListComponent from '../../common/ListComponent/ListComponent';
import firebase from 'react-native-firebase';
import SearchResults from 'react-filter-search';
import Toast from 'react-native-tiny-toast';
import SearchInput from '../../common/SearchInput/SearchInput';
import DatePicker from 'react-native-datepicker';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconM from 'react-native-vector-icons/MaterialIcons';
import Dialog from 'react-native-dialog';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default class ShowBills extends Component {
  constructor(props) {
    super(props);
    this.backButtonClick = this.backButtonClick.bind(this);
    this.state = {
      billData: [],
      billDate: '',
      loading: false,
      searchText: '',
      modal: false,
      pic: '',
      shop: '',
    };
  }

  backButtonClick() {
    this.setState({loading: false});
    if (this.props.navigation && this.props.navigation.goBack) {
      this.props.navigation.goBack(null);
      return true;
    }
    return false;
  }

  componentDidMount() {
    this.getdata();
    BackHandler.addEventListener('hardwareBackPress', this.backButtonClick);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backButtonClick);
  }

  getdata() {
    // alert('sasa')
    this.setState({loading: true});
    var usersRef = firebase.database().ref('billDetails');
    usersRef.on('value', snapshot => {
      let data = snapshot.val();
      let billData = Object.values(data);
      this.setState({billData, loading: false});
    });
  }
  imageFunction(image, shop) {
    this.setState({modal: !this.state.modal, pic: image, shop});
  }
  renderImage(image) {
    return (
      <Image
        style={{height: '90%', width: '90%', alignSelf: 'center'}}
        source={{
          uri: `data:image/gif;base64,${this.state.pic}`,
        }}
      />
    );
  }
  renderDataList() {
    let bills;

    const {billData, searchText, billDate} = this.state;
    if (billDate == '') {
      bills = billData;
    }
    if (billDate != '') {
      bills = billData.filter(row => {
        return billDate == row.billDate;
      });
    }
    return (
      <SearchResults
        value={searchText}
        data={bills}
        renderResults={results => (
          <View style={{width: '100%'}}>
            <FlatList
              data={results}
              showsVerticalScrollIndicator={false}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  onPress={() => this.imageFunction(item.image, item.shopName)}>
                  <ListComponent
                    type={item.type}
                    shopName={item.shopName}
                    billDate={item.billDate}
                    pendingAmount={item.pendingAmount}
                    chequeAmount={item.chequeAmount}
                    cashAmount={item.cashAmount}
                  />
                </TouchableOpacity>
              )}
              keyExtractor={item => item.id}
            />
          </View>
        )}
      />
    );
  }

  updatelist() {
    firebase
      .database()
      .ref('billDetails/-M3Zum9uSVAp8egRBS_8')
      .update({
        type: 'cash',
      });
  }
  render() {
    const {loading} = this.state;
    let toast;
    if (loading) {
      toast = Toast.showLoading('Loading...');
    }
    if (!loading) {
      Toast.hide(toast);
    }
    return (
      <View style={styles.mainContainer}>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            height: hp('20%'),
            backgroundColor: '#7b16f0',
            justifyContent: 'center',
          }}>
          <View style={styles.upperPart}>
            <View style={styles.dateContainer}>
              <DatePicker
                style={styles.mainInput}
                date={this.state.billDate}
                mode="date"
                placeholder="Select date"
                iconComponent={
                  <Icon5
                    size={hp('3.5%')}
                    color="black"
                    name="calendar"
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: hp('1%'),
                      marginLeft: 0,
                    }}
                  />
                }
                format="YYYY-MM-DD"
                minDate="2010-05-01"
                maxDate="2099-06-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    alignItems: 'flex-start',
                    position: 'absolute',
                    left: 0,
                    marginLeft: 0,
                  },
                  dateInput: {
                    borderWidth: 0,
                    // marginLeft: hp('-22.5%'),

                    alignItems: 'flex-start',
                    color: 'white',
                  },
                  placeholderText: {
                    color: 'white',
                    justifyContent: 'flex-start',
                    marginLeft: wp('9%'),
                  },
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={date => {
                  this.setState({billDate: date});
                }}
              />
              <TouchableOpacity onPress={() => this.setState({billDate: ''})}>
                <IconM size={hp('3%')} color="black" name="cancel" />
              </TouchableOpacity>
            </View>
            <View style={styles.searchContainer}>
              <SearchInput onChangeText={q => this.setState({searchText: q})} />
            </View>
          </View>
        </View>
        <View style={styles.innerContainer}>{this.renderDataList()}</View>
        <Dialog.Container
          onBackdropPress={() => this.setState({modal: false})}
          visible={this.state.modal}
          contentStyle={{height: '90%', width: '90%'}}>
          <Dialog.Title>{this.state.shop}</Dialog.Title>
          <View>
            {this.renderImage()}
            <Dialog.Button
              label="Cancel"
              onPress={() => this.setState({modal: !this.state.modal})}
            />
          </View>
        </Dialog.Container>
      </View>
    );
  }
}
