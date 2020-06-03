import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import styles from './styles';
import ListComponent from '../../common/ListComponent/ListComponent';
import firebase from 'react-native-firebase';
import SearchInput from '../../common/SearchInput/SearchInput';
import SearchResults from 'react-filter-search';
import Toast from 'react-native-tiny-toast';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconM from 'react-native-vector-icons/MaterialIcons';
import DatePicker from 'react-native-datepicker';
import SwipleListComponent from '../../common/SwipleListComponent/SwipleListComponent';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Dialog from 'react-native-dialog';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';

var radio_props = [
  {label: 'Cash  ', value: 'cash'},
  {label: 'Pending', value: 'pending'},
];

export default class CashPending extends Component {
  constructor(props) {
    super(props);
    // this.backButtonClick = this.backButtonClick.bind(this);
    this.state = {
      billData: [],
      loading: false,
      searchText: '',
      billDate: '',
      dialogUpdate: false,
      key: '',
      dialog: false,
      total: '',
      abc: null,
      value: 'cash',
      pending: '',
      setToCheque: '',
    };
  }
  componentDidMount() {
    this.getdata();
  }
  getdata() {
    this.setState({loading: true});
    var usersRef = firebase.database().ref('billDetails');
    usersRef.on('value', snapshot => {
      let data = snapshot.val();
      let billData = Object.values(data);
      this.setState({billData, loading: false});
    });
  }

  renderDataList() {
    const {billData, searchText, billDate, value} = this.state;
    let cheque;
    let total;
    let amount;
    let comp;
    console.log('billData', billData);
    // let chequeData = billData.filter(row => {
    //   return row.type == 'cheque';
    // });
    if (value == 'cash') {
      comp = <ListComponent />;
    }
    if (value == 'pending') {
      comp = <SwipleListComponent />;
    }
    let data = billData.filter(row => {
      return row.type == value;
    });

    if (billDate != '') {
      cheque = data.filter(row => {
        return row.billDate == billDate;
      });
      total = cheque.reduce(function(prev, cur) {
        return prev + cur.chequeAmount;
      }, 0);
    }
    if (billDate == '') {
      cheque = data;
      total = cheque.reduce(function(prev, cur) {
        return prev + cur.chequeAmount;
      }, 0);
    }
    // console.log(total);
    return (
      <SearchResults
        value={searchText}
        data={cheque}
        renderResults={results => (
          <View style={{width: '100%'}}>
            <FlatList
              data={results}
              showsVerticalScrollIndicator={false}
              renderItem={({item, index}) => {
                // console.log('itm', item.pendingAmount);
                if (item.type == 'pending') {
                  return (
                    <SwipleListComponent
                      onPress={() =>
                        this.setState({
                          dialogUpdate: !this.state.dialogUpdate,
                          key: item.key,
                        })
                      }
                      onPressLeft={() =>
                        this.setState({
                          dialog: !this.state.dialog,
                          key: item.key,
                          pending: item.pendingAmount,
                        })
                      }
                      type={item.type}
                      shopName={item.shopName}
                      billDate={item.billDate}
                      pendingAmount={item.pendingAmount}
                      // chequeAmount={item.chequeAmount}
                      cashAmount={item.cashAmount}
                    />
                  );
                }
                if (item.type == 'cash') {
                  return (
                    <ListComponent
                      onPress={() =>
                        this.setState({
                          dialogUpdate: !this.state.dialogUpdate,
                          key: item.key,
                        })
                      }
                      onPressLeft={() =>
                        this.setState({
                          dialog: !this.state.dialog,
                          key: item.key,
                        })
                      }
                      type={item.type}
                      shopName={item.shopName}
                      billDate={item.billDate}
                      pendingAmount={item.pendingAmount}
                      // chequeAmount={item.chequeAmount}
                      cashAmount={item.cashAmount}
                    />
                  );
                }
              }}
              keyExtractor={item => item.id}
            />
          </View>
        )}
      />
    );
  }
  setToCash() {
    const {key, pending} = this.state;
    this.setState({loading: true});
    firebase
      .database()
      .ref('billDetails/' + key)
      .update({
        type: 'cash',
        pendingAmount: '',
        cashAmount: pending,
      });
    this.setState({
      dialog: !this.state.dialog,
      loading: false,
      key: '',
      pending: '',
    });
  }
  render() {
    const {loading, dialogUpdate, dialog, value} = this.state;
    console.log('sas', this.state.pending);
    let toast;
    let totalView = <View />;
    if (this.state.billDate != '') {
      totalView = (
        <ListComponent
          type={'cheque'}
          shopName={'Total amount to pay'}
          chequeAmount={this.getTotal()}
          billDate={this.state.billDate}
        />
      );
    }
    if (loading) {
      toast = Toast.showLoading('Loading...');
    }
    if (!loading) {
      Toast.hide(toast);
    }
    return (
      <View style={styles.mainConteiner}>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            height: hp('23%'),
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
                    top: 4,
                    marginLeft: 0,
                  },
                  dateInput: {
                    borderWidth: 0,
                    marginLeft: hp('-22.5%'),
                    color: 'white',
                  },
                  placeholderText: {
                    color: 'white',
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
            <View
              style={{
                marginTop: hp('2%'),
              }}>
              <RadioForm
                labelColor={'white'}
                selectedlabelColor={'white'}
                formHorizontal={true}
                animation={false}
                radio_props={radio_props}
                initial={0}
                onPress={value => {
                  this.setState({value: value});
                }}
              />
            </View>
          </View>
        </View>
        <View style={styles.innerContainer}>
          {/* {totalView} */}
          {this.renderDataList()}
        </View>

        <Dialog.Container visible={dialogUpdate}>
          <Dialog.Title>Cheque delete</Dialog.Title>
          <Dialog.Description>
            Do you want to delete this data ?
          </Dialog.Description>
          <Dialog.Button
            label="Cancel"
            onPress={() =>
              this.setState({dialogUpdate: !this.state.dialogUpdate})
            }
          />
          <Dialog.Button label="Delete" onPress={() => this.deleteData()} />
        </Dialog.Container>
        <Dialog.Container visible={dialog}>
          <Dialog.Title>Pending Payment</Dialog.Title>
          <Dialog.Description>Set this payment to ?</Dialog.Description>
          <Dialog.Button
            label="Cancel"
            onPress={() => this.setState({dialog: !this.state.dialog})}
          />
          <Dialog.Button label="Cash" onPress={() => this.setToCash()} />
          <Dialog.Button label="Cheque" onPress={() => this.pendingCheque()} />
        </Dialog.Container>
        <Dialog.Container visible={dialog}>
          <Dialog.Title>Pending Payment</Dialog.Title>
          <Dialog.Description>Set this payment to ?</Dialog.Description>
          <Dialog.Button
            label="Cancel"
            onPress={() => this.setState({dialog: !this.state.dialog})}
          />
          <Dialog.Button label="Cash" onPress={() => this.setToCash()} />
          <Dialog.Button label="Cheque" onPress={() => this.pendingCheque()} />
        </Dialog.Container>
      </View>
    );
  }
}
