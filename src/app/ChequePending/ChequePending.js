import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  BackHandler,
  Alert,
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
import Moment from 'moment';

export default class ChequePending extends Component {
  constructor(props) {
    super(props);
    this.backButtonClick = this.backButtonClick.bind(this);
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
      rowIndex: '',
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
    this.setState({loading: true});
    var usersRef = firebase.database().ref('billDetails');
    usersRef.on('value', snapshot => {
      let data = snapshot.val();
      let billData = Object.values(data);
      this.setState({billData, loading: false});
    });
  }

  deleteData() {
    const {key} = this.state;
    this.setState({loading: true});
    let userRef = firebase.database().ref('billDetails/' + key);
    userRef.remove();
    this.setState({
      dialogUpdate: !this.state.dialogUpdate,
      loading: false,
      key: '',
    });
  }
  passCheque() {
    const {key} = this.state;
    this.setState({loading: true});
    firebase
      .database()
      .ref('billDetails/' + key)
      .update({
        chequeStatus: 'passed',
      });
    this.setState({
      dialog: !this.state.dialog,
      loading: false,
      key: '',
    });
  }
  getTotal() {
    const {billData, searchText, billDate} = this.state;
    let total;
    let cheque;

    let chequeData = billData.filter(row => {
      return row.type == 'cheque';
    });
    let pendingCheque = chequeData.filter(row => {
      return row.chequeStatus == 'pending';
    });
    if (billDate != '') {
      cheque = pendingCheque.filter(row => {
        return row.chequeDate <= billDate;
      });
      total = cheque.reduce(function(prev, cur) {
        return prev + parseInt(cur.chequeAmount);
      }, 0);
    }
    if (billDate == '') {
      cheque = pendingCheque;
      total = cheque.reduce(function(prev, cur) {
        return prev + parseInt(cur.chequeAmount);
      }, 0);
    }
    return total;
  }
  onSwipeOpen(rowIndex) {
    this.setState({
      rowIndex: rowIndex,
    });
  }
  onSwipeClose(rowIndex) {
    if (rowIndex === this.state.rowIndex) {
      this.setState({rowIndex: null});
    }
  }

  sortArray(pendingCheque) {
    const sortDates = (a, b) =>
      Moment(a.chequeDate).format('YYYYMMDD') -
      Moment(b.chequeDate).format('YYYYMMDD');

    const sortedDates = pendingCheque.sort(sortDates).reverse();
    return sortedDates;
  }

  renderDataList() {
    const {billData, searchText, billDate} = this.state;
    let cheque;
    let total;

    let chequeData = billData.filter(row => {
      return row.type == 'cheque';
    });
    let pendingCheque = chequeData.filter(row => {
      return row.chequeStatus == 'pending';
    });
    let sortedArray = this.sortArray(pendingCheque);
    if (billDate != '') {
      cheque = sortedArray.filter(row => {
        return row.chequeDate <= billDate;
      });
      total = cheque.reduce(function(prev, cur) {
        return prev + cur.chequeAmount;
      }, 0);
    }
    if (billDate == '') {
      cheque = sortedArray;
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
              renderItem={({item, index}) => (
                <SwipleListComponent
                  close={this.state.rowIndex !== index}
                  onClose={() => this.onSwipeClose(index)}
                  rowIndex={index}
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
                  billDate={item.chequeDate}
                  chequeAmount={item.chequeAmount}
                />
              )}
              keyExtractor={item => item.id}
            />
          </View>
        )}
      />
    );
  }
  render() {
    const {loading, dialogUpdate, dialog} = this.state;
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
    console.log('sasithass', this.state.rowIndex);
    return (
      <View style={styles.mainConteiner}>
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
          </View>
        </View>
        <View style={styles.innerContainer}>
          {totalView}
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
          <Dialog.Title>Pass Cheque</Dialog.Title>
          <Dialog.Description>
            Do you want to pass this cheque ?
          </Dialog.Description>
          <Dialog.Button
            label="Cancel"
            onPress={() => this.setState({dialog: !this.state.dialog})}
          />
          <Dialog.Button label="Yes" onPress={() => this.passCheque()} />
        </Dialog.Container>
      </View>
    );
  }
}
