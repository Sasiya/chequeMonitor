import {StyleSheet} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export default StyleSheet.create({
  TextInput: {
    width: '100%',
    marginLeft: wp('2.5%'),
    color: 'white',
    alignSelf: 'flex-start'
  },
  mainContainer: {
    flexDirection: 'row',
    borderBottomWidth: hp('0.3%'),
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    overflow: 'hidden',
  },
  icon: {
    marginLeft: wp('9%'),
  },
});
