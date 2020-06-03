import {StyleSheet} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export default StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: hp('10%'),
    backgroundColor: 'white',
    borderRadius: 5,
    shadowOffset: {width: 10, height: 10},
    shadowColor: 'black',
    shadowOpacity: 1,
    elevation: 3,
    marginTop: hp('1.2%'),
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconHolder: {
    height: hp('7%'),
    width: wp('16%'),
    borderRightWidth: 1,
    borderRightColor: '#a8a8a8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerStyle: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    padding: hp('1%'),
    alignItems: 'center',
  },
  leftContent: {
    flexDirection: 'column',
  },
  shopText: {
    fontSize: hp('2.5%'),
    color: '#303030',
    fontWeight: 'bold',
  },
  billText: {
    fontSize: hp('1.9%'),
    color: '#4f4f4f',
  },
  amountStyle: {
    fontSize: hp('2.2%'),
    color: '#303030',
  },
});
