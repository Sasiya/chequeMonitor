import {StyleSheet} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export default StyleSheet.create({
  mainContainer: {
    height: hp('100%'),
    width: wp('92%'),
    alignSelf: 'center',
    backgroundColor: 'white',
  },
  mainContainer2: {
    height: hp('100%'),
    width: wp('100%'),
    alignSelf: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: hp('2%'),
  },
  mainInput: {
    borderBottomWidth: 1,
    width: wp('65%'),
    height: hp('5.5%'),
    alignSelf: 'center',
  },
  inputText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp('2')
  },
  title: {
    color: '#525151',
  },
  tabContainer: {
    elevation: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: hp('6%'),
    backgroundColor: 'red',
  },
  tabBarUnderlineStyle: {
    backgroundColor: '#7b16f0',
    borderBottomWidth: 0,
  },
  tabView: {
    height: hp('100%'),
    marginTop: hp('5%'),
  },
  topStyle: {
    width: wp('100%'),
    height: hp('18%'),
    backgroundColor: '#7b16f0',
  },
  bottomStyle: {
    width: wp('100%'),
    flex: 1,
    backgroundColor: 'white',
  },
  mainContainer3: {
    flex: 1,
    backgroundColor: '#7b16f0',
  },
  buttonContainer: {
    justifyContent: 'center',
    width: '100%',
    backgroundColor: 'red',
  },
  nativeBaseButton: {
    justifyContent: 'center',
    position: 'absolute',
    bottom: hp('5%'),
    width: '92%',
    borderColor: '#7b16f0',
    alignSelf: 'center',
  },
  buttonTextStyle: {
    color: '#7b16f0',
  },
  mainView2: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  UpperTextInput: {
    marginTop: hp('7%'),
    width: '92%',
    alignSelf: 'center',
  },
  tabsContainer: {
    marginTop: hp('3%'),
    width: '92%',
    alignSelf: 'center',
    backgroundColor: 'green',
    height: hp('10%'),
  },
  buttonMain: {
    height: hp('8%'),
    width: wp('92%'),
    borderColor: '#7b16f0',
    position: 'absolute',
    bottom: hp('0%'),
    marginBottom: hp('1%'),
    borderWidth: 2,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonMainText: {
    fontSize: hp(3),
    color: '#7b16f0',
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('100%'),
  },
  indicator: {
    height: '10%',
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(142, 142, 142, 0.62)',
  },
});
