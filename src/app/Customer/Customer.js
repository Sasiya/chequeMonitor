import React, {Component} from 'react';
import {
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import styles from './styles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import firebase from 'react-native-firebase';

export default class Customer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shpName: '',
      shpAdd: '',
      shpNum: '',
      shpnic: '',
    };
  }

  postData() {
    const {shpName, shpAdd, shpNum, shpnic} = this.state;
    let key = firebase
      .database()
      .ref('/billDetails')
      .push().key;
    let data = {
      shpName: shpName,
      shpAdd: shpAdd,
      shpNum: shpNum,
      shpnic: shpnic,
      key: key,
    };
    firebase
      .database()
      .ref('/shops')
      .child(key)
      .set({
        ...data,
      })
      .then(data => {
        //success callback
        console.log('Success');
      })
      .catch(error => {
        //error callback
        console.log('error ', error);
      });
  }

  render() {
    console.log('object', this.state.shpnic);
    return (
      <View style={styles.mainContainer3}>
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
                onPress={() => this.postData()}>
                <Text style={styles.buttonMainText}>Save</Text>
              </TouchableOpacity>

              <View style={styles.UpperTextInput}>
                <View style={styles.inputText}>
                  <Text style={styles.title}>Shop name :</Text>
                  <TextInput
                    style={styles.mainInput}
                    onChangeText={text => this.setState({shpName: text})}
                    keyboardType="number-pad"
                  />
                </View>
                <View style={styles.inputText}>
                  <Text style={styles.title}>Shop address :</Text>
                  <TextInput
                    style={styles.mainInput}
                    onChangeText={text => this.setState({shpAdd: text})}
                  />
                </View>
                <View style={styles.inputText}>
                  <Text style={styles.title}>Number :</Text>
                  <TextInput
                    style={styles.mainInput}
                    onChangeText={text => this.setState({shpNum: text})}
                  />
                </View>
                <View style={styles.inputText}>
                  <Text style={styles.title}>Shop nicname :</Text>
                  <TextInput
                    style={styles.mainInput}
                    onChangeText={text => this.setState({shpnic: text})}
                  />
                </View>
              </View>

              <View style={{height: hp('30%')}} />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}
