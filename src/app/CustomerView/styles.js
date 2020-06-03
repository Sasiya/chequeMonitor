import {StyleSheet} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#EFEFEF',
    alignItems: 'center',
  },
  innerContainer: {
    flex: 1,
    backgroundColor: '#EFEFEF',
    alignItems: 'center',
    width: '92%',
  },
  searchContainer: {
    width: '92%',
  },
  mainInput: {
    width: '85%',
    // height: hp('5.5%'),
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
  
});
