import React, {Component} from 'react';
import {Text, View, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import styles from './styles';
import SearchInput from '../../common/SearchInput/SearchInput';
import Toast from 'react-native-tiny-toast';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import DatePicker from 'react-native-datepicker';
import IconM from 'react-native-vector-icons/MaterialIcons';
import SwipleListComponent from '../../common/SwipleListComponent/SwipleListComponent';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Dialog from 'react-native-dialog';
import Moment from 'moment';
import firebase from 'react-native-firebase';
import SearchResults from 'react-filter-search';
import ListComponent from '../../common/ListComponent/ListComponent';

export default class CustomerView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      billDate: '',
      shopData: [],
      searchText: '',
    };
  }
  componentDidMount() {
    this.getdata();
  }

  getdata() {
    this.setState({loading: true});
    var usersRef = firebase.database().ref('shops');
    usersRef.on('value', snapshot => {
      let data = snapshot.val();
      let shopData = Object.values(data);
      this.setState({shopData, loading: false});
    });
  }
  renderData() {
    const {shopData, searchText} = this.state;
    return (
      <SearchResults
        value={searchText}
        data={shopData}
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
  render() {
    console.log('paka', this.state.shopData);
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
            <View style={styles.searchContainer}>
              <SearchInput onChangeText={q => this.setState({searchText: q})} />
            </View>
          </View>
        </View>
        <View style={styles.innerContainer}>{this.renderData()}</View>
        <Dialog.Container
          onBackdropPress={() => this.setState({modal: false})}
          visible={this.state.modal}
          contentStyle={{height: '90%', width: '90%'}}>
          <Dialog.Title>{this.state.shop}</Dialog.Title>
          <View>
            {/* {this.renderImage()} */}
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
