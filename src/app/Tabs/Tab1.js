import React, {Component} from 'react';
import {Text, View, TextInput, Picker} from 'react-native';
import styles from './styles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import DatePicker from 'react-native-datepicker';

export default class Tab1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      date: '',
    };
  }
  dateFunction(date) {
    this.props.setChequeDate(date);
    this.setState({date: date});
  }
  pickerFunction(value) {
    this.setState({account: value});
    this.props.setpicker(value);
  }
  render() {
    return (
      <View>
        <View style={styles.pickerView}>
          <Picker
            selectedValue={this.state.account}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) =>
              this.pickerFunction(itemValue)
            }>
            <Picker.Item color="#a6a6a6" label="Select a account" value="" />
            <Picker.Item label="Acc1" value="Acc1" />
            <Picker.Item label="Acc2" value="Acc2" />
            <Picker.Item label="Acc3" value="Acc3" />
          </Picker>
        </View>
        <View style={styles.inputText}>
          <Text style={styles.title}>Cheque Number :</Text>
          <TextInput
            style={styles.mainInput}
            onChangeText={text => this.props.getChequeNo(text)}
            keyboardType="number-pad"
          />
        </View>
        <View style={styles.inputText}>
          <Text style={styles.title}>Cheque Amount :</Text>
          <TextInput
            style={styles.mainInput}
            onChangeText={text => this.props.getChequeAmount(text)}
            keyboardType="number-pad"
          />
        </View>
        <View style={styles.inputText}>
          <Text style={styles.title}>Cheque Date :</Text>
          {/* <TextInput
            style={styles.mainInput}
            onChangeText={text => this.props.getChequeDate(text)}
          /> */}
          <DatePicker
            style={styles.mainInput}
            date={this.state.date}
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
              this.dateFunction(date);
            }}
          />
        </View>
        <View style={styles.inputText}>
          <Text style={styles.title}>Note :</Text>
          <TextInput
            style={styles.mainInput}
            onChangeText={text => this.props.setNote(text)}
            keyboardType="number-pad"
          />
        </View>
      </View>
    );
  }
}
