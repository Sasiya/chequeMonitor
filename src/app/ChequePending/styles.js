import {StyleSheet} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export default StyleSheet.create({
  mainConteiner: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
  },
  innerContainer: {
    width: '92%',
    flex: 1,
    backgroundColor: '#EFEFEF',
  },
  upperPart: {
    width: '92%',
    alignItems: 'center',
  },
  dateContainer: {
    borderBottomWidth: hp('0.3%'),
    width: '92%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mainInput: {
    width: '85%',
  },
  searchContainer: {
    width: '92%',
  },
});
