import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Home from '../screens/Home';
import AddDetails from '../screens/AddDetails';
import BillDetails from '../screens/BillDetails';
import PendingCheques from '../screens/PendingCheques';
import PassedCheques from '../screens/PassedCheques';
import CashAndPending from '../screens/CashAndPending';
import Customers from '../screens/Customers';
import CustomerList from '../screens/CustomerList';

import {createDrawerNavigator} from 'react-navigation-drawer';
import Drawer from '../common/Drawer/Drawer';
const navOptionsHandler = navigation => ({
  header: null,
  tabBarVisible: false,
});

const HomeStack = createStackNavigator({
  First: {
    screen: Home,
    navigationOptions: navOptionsHandler,
    resetOnBlur: true,
  },
  AddDetails: {
    screen: AddDetails,
    navigationOptions: navOptionsHandler,
    resetOnBlur: true,
  },
  BillDetails: {
    screen: BillDetails,
    navigationOptions: navOptionsHandler,
    resetOnBlur: true,
  },
  PendingCheques: {
    screen: PendingCheques,
    navigationOptions: navOptionsHandler,
    resetOnBlur: true,
  },
  PassedCheques: {
    screen: PassedCheques,
    navigationOptions: navOptionsHandler,
    resetOnBlur: true,
  },
  CashAndPending: {
    screen: CashAndPending,
    navigationOptions: navOptionsHandler,
    resetOnBlur: true,
  },
  Customers: {
    screen: Customers,
    navigationOptions: navOptionsHandler,
    resetOnBlur: true,
  },
  CustomerList: {
    screen: CustomerList,
    navigationOptions: navOptionsHandler,
    resetOnBlur: true,
  },
});
HomeStack.navigationOptions = ({navigation}) => {
  let tabBarVisible = false;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};
const appDrawer = createDrawerNavigator(
  {
    drawer: HomeStack,
  },
  {contentComponent: Drawer, drawerWidth: '60%'},
);
export default createAppContainer(appDrawer);
