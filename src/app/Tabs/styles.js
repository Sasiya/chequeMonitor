import {StyleSheet} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export default StyleSheet.create({
  mainInput: {
    borderBottomWidth: 1,
    width: wp('57%'),
    height: hp('5.5%'),
    alignSelf: 'center',
  },
  inputText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputText2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp('3%'),
  },
  title: {
    color: '#525151',
  },
  pickerView: {
    borderBottomWidth: 1,
    marginBottom: hp('3%')
  },
  picker: {
    height: hp('6%'),
  },
});
