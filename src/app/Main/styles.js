import {StyleSheet} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export default StyleSheet.create({
  topStyle: {
    width: wp('100%'),
    height: hp('30%'),
    backgroundColor: '#7b16f0',
  },
  bottomStyle: {
    width: wp('100%'),
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    justifyContent: 'center',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#7b16f0',
  },
  iconHolder: {
    height: hp('10%'),
    width: hp('10%'),
    borderWidth: 1,
    margin: 7,
    marginTop: hp('7%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  iconRow: {
    marginTop: hp('10%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    width: wp('70%'),
    alignSelf: 'center',
  },
  cardArrangement: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: '70%',
    justifyContent: 'space-between',
  },
  lowercontainer: {
    width: wp('95%'),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    height: hp('5%'),
    width: wp('8%'),
  },
});
