import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  PermissionsAndroid,
} from 'react-native';
import {Tab, Tabs, TabHeading, Button} from 'native-base';
import styles from './styles';
import Tab1 from '../Tabs/Tab1';
import Tab2 from '../Tabs/Tab2';
import Tabs3 from '../Tabs/Tabs3';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import DatePicker from 'react-native-datepicker';
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';
import Toast from 'react-native-tiny-toast';
import ImagePicker from 'react-native-image-picker';

export default class InsertDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      select: '',
      currentTab: '',
      billNo: '',
      billDate: '',
      shopName: '',
      chequeNo: '',
      chequeDate: '',
      chequeAmount: 0,
      cashAmount: 0,
      pendingAmount: 0,
      accType: '',
      loading: false,
      filePath: '',
      fileData: '',
      fileUri: '',
      note: '',
    };
  }
  componentDidMount() {
    this.requestFineCamera();
    this.requestAccessStorage();
  }

  async requestFineCamera() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs access to your Camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Toast.show('You can use the camera', {duration: 1000});
      } else {
        alert('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  async requestAccessStorage() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'App needs access to your Storage ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Toast.show('You can use the Storage', {duration: 1000});
      } else {
        alert('Storage permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  postinData() {
    let type;
    let key = firebase
      .database()
      .ref('/billDetails')
      .push().key;
    const {
      select,
      billNo,
      billDate,
      shopName,
      chequeNo,
      chequeDate,
      chequeAmount,
      cashAmount,
      pendingAmount,
      accType,
      fileData,
      note,
    } = this.state;
    if (select == 0) {
      type = 'cheque';
      let data = {
        type: type,
        billNo: billNo,
        billDate: billDate,
        shopName: shopName,
        chequeNo: chequeNo,
        chequeAmount: chequeAmount,
        chequeDate: chequeDate,
        cashAmount: cashAmount,
        pendingAmount: pendingAmount,
        accType: accType,
        key: key,
        image: fileData,
        chequeStatus: 'pending',
        note: note,
      };
      if (
        billNo == '' ||
        billDate == '' ||
        shopName == '' ||
        chequeNo == '' ||
        chequeDate == '' ||
        accType == '' ||
        fileData == '' ||
        chequeAmount == 0
      ) {
        alert('Please fill required feilds');
      }
      if (
        billNo != '' &&
        billDate != '' &&
        shopName != '' &&
        chequeNo != '' &&
        chequeDate != '' &&
        accType != '' &&
        fileData != '' &&
        chequeAmount > 0 &&
        cashAmount == 0 &&
        pendingAmount == 0
      ) {
        this.setState({loading: true});
        firebase
          .database()
          .ref('/billDetails')
          .child(key)
          .set({
            ...data,
          })
          .then(data => {
            //success callback
            this.setState({loading: false});
            this.props.navigation.navigate('First');
            return Toast.show('Success');
          })
          .catch(error => {
            this.setState({loading: false});
            //error callback
            console.log('error ', error);
            return Toast.show('Check network');
          });
      }
    }

    if (select == 1) {
      type = 'cash';
      let data = {
        type: type,
        billNo: billNo,
        billDate: billDate,
        shopName: shopName,
        chequeNo: chequeNo,
        chequeAmount: chequeAmount,
        chequeDate: chequeDate,
        cashAmount: cashAmount,
        pendingAmount: pendingAmount,
        accType: '',
        key: key,
        image: fileData,
        chequeStatus: 'pending',
      };
      if (
        billNo == '' ||
        billDate == '' ||
        shopName == '' ||
        cashAmount == 0 ||
        fileData == ''
      ) {
        alert('Please fill required feilds');
      }
      if (
        billNo != '' &&
        billDate != '' &&
        shopName != '' &&
        cashAmount > 0 &&
        fileData != ''
      ) {
        this.setState({loading: true});
        firebase
          .database()
          .ref('/billDetails')
          .child(key)
          .set({
            ...data,
          })
          .then(data => {
            //success callback
            this.setState({loading: false});
            this.props.navigation.navigate('First');
            return Toast.show('Success');
          })
          .catch(error => {
            this.setState({loading: false});
            //error callback
            console.log('error ', error);
            return Toast.show('Check network');
          });
      }
    }
    if (select == 2) {
      type = 'pending';
      let data = {
        type: type,
        billNo: billNo,
        billDate: billDate,
        shopName: shopName,
        chequeNo: chequeNo,
        chequeAmount: chequeAmount,
        chequeDate: chequeDate,
        cashAmount: cashAmount,
        pendingAmount: pendingAmount,
        accType: '',
        key: key,
        image: fileData,
        chequeStatus: 'pending',
      };
      if (
        billNo == '' ||
        billDate == '' ||
        shopName == '' ||
        pendingAmount == 0 ||
        fileData == ''
      ) {
        alert('Please fill required feilds');
      }
      if (
        billNo != '' &&
        billDate != '' &&
        shopName != '' &&
        fileData != '' &&
        pendingAmount > 0
      ) {
        this.setState({loading: true});
        firebase
          .database()
          .ref('/billDetails')
          .child(key)
          .set({
            ...data,
          })
          .then(data => {
            //success callback

            this.setState({loading: false});
            this.props.navigation.navigate('First');
            Toast.show('Success');
          })
          .catch(error => {
            this.setState({loading: false});
            //error callback
            console.log('error ', error);

            return Toast.show('Check network');
          });
      }
    }
  }
  launchCamera() {
    this.requestFineCamera();
    this.requestAccessStorage();
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = {uri: response.uri};
        console.log('response', JSON.stringify(response));
        this.setState({
          filePath: response,
          fileData: response.data,
          fileUri: response.uri,
        });
      }
    });
  }

  render() {
    const {select, loading, fileData, filePath, fileUri} = this.state;
    const {navigation} = this.props;
    let toast;
    let color;

    if (fileData == '') {
      color = 'black';
    }
    if (fileData != '') {
      color = 'green';
    }
    if (loading) {
      toast = Toast.showLoading('Loading...');
    }
    if (!loading) {
      Toast.hide(toast);
    }
    console.log('filedata', fileData);
    console.log('filePath', filePath);
    console.log('fileUri', fileUri);
    return (
      <View style={styles.mainContainer3}>
        {/* <Toast
          visible={this.state.loading}
          position={50}
          loading={true}
          onHidden={() => {
            // onHidden
          }}>
          Loading
        </Toast> */}
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
          enabled
          keyboardVerticalOffset={-300}>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: 'center',
              minHeight: hp('20%'),
            }}>
            <View style={styles.topStyle} />
            <View style={styles.bottomStyle}>
              <TouchableOpacity
                style={styles.buttonMain}
                onPress={() => this.postinData()}>
                <Text style={styles.buttonMainText}>Save</Text>
              </TouchableOpacity>

              <View style={styles.UpperTextInput}>
                <View style={styles.inputText}>
                  <Text style={styles.title}>Bill number :</Text>
                  <TextInput
                    style={styles.mainInput}
                    onChangeText={text => this.setState({billNo: text})}
                    keyboardType="number-pad"
                  />
                </View>
                <View style={styles.inputText}>
                  <Text style={styles.title}>Shop name :</Text>
                  <TextInput
                    style={styles.mainInput}
                    onChangeText={text => this.setState({shopName: text})}
                  />
                </View>
                <View style={styles.inputText}>
                  <Text style={styles.title}>Bill date :</Text>
                  <DatePicker
                    style={styles.mainInput}
                    date={this.state.billDate}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate="2010-05-01"
                    maxDate="2099-06-01"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateIcon: {},
                      dateInput: {
                        borderWidth: 0,
                        alignItems: 'flex-start',
                      },
                      // ... You can check the source to find the other keys.
                    }}
                    onDateChange={date => {
                      this.setState({billDate: date});
                    }}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => this.launchCamera()}
                  style={{
                    alignItems: 'flex-end',
                    width: '100%',
                    marginLeft: -wp('2%'),
                    marginTop: hp('2%'),
                  }}>
                  <Icon name="camera" size={hp('5%')} color={color} />
                </TouchableOpacity>
              </View>
              <View style={styles.tabsContainer}>
                <Tabs
                  onChangeTab={({i}) => this.setState({select: i})}
                  tabContainerStyle={styles.tabContainer}
                  tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
                  tabStyle={{backgroundColor: '#5078F2'}}>
                  <Tab
                    heading="Cheque"
                    tabStyle={{backgroundColor: 'white'}}
                    activeTabStyle={{backgroundColor: 'white'}}
                    textStyle={{color: 'black'}}
                    activeTextStyle={{color: 'black', fontWeight: 'bold'}}>
                    <Tab1
                      getChequeNo={q => {
                        this.setState({chequeNo: q});
                      }}
                      getChequeAmount={q => {
                        this.setState({chequeAmount: q});
                      }}
                      getChequeDate={q => {
                        this.setState({chequeDate: q});
                      }}
                      setChequeDate={q => {
                        this.setState({chequeDate: q});
                      }}
                      setpicker={q => {
                        this.setState({accType: q});
                      }}
                      setNote={q => this.setState({note: q})}
                    />
                  </Tab>
                  <Tab
                    heading="Cash"
                    tabStyle={{backgroundColor: 'white'}}
                    activeTabStyle={{backgroundColor: 'white'}}
                    textStyle={{color: 'black'}}
                    activeTextStyle={{color: 'black', fontWeight: 'bold'}}>
                    <Tab2
                      setCashAmount={q => {
                        this.setState({cashAmount: q});
                      }}
                    />
                  </Tab>
                  <Tab
                    heading="Pending"
                    tabStyle={{backgroundColor: 'white'}}
                    activeTabStyle={{backgroundColor: 'white'}}
                    textStyle={{color: 'black'}}
                    activeTextStyle={{color: 'black', fontWeight: 'bold'}}>
                    <Tabs3
                      setPendingAmount={q => {
                        this.setState({pendingAmount: q});
                      }}
                    />
                  </Tab>
                </Tabs>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}
