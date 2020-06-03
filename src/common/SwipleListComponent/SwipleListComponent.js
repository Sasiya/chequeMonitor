import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import ListComponent from '../ListComponent/ListComponent';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import styles from './styles';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconA from 'react-native-vector-icons/AntDesign';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Swipeout from 'react-native-swipeout';

const RightActions = ({progress, dragX, onPress}) => {
  return (
    <TouchableOpacity style={styles.rightAction} onPress={onPress}>
      <IconA name="delete" size={hp('5%')} color="black" />
    </TouchableOpacity>
  );
};

const LeftActions = ({progress, dragX, onPress}) => {
  return (
    <TouchableOpacity style={styles.LeftAction} onPress={onPress}>
      <Icon5 name="check-circle" size={hp('5%')} color="black" />
    </TouchableOpacity>
  );
};

export default class SwipleListComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sectionID: null,
      rowID: null,
    };
  }

  render() {
    var swipeoutBtns = [
      {
        text: 'Buttons',
      },
    ];
    return (
      <Swipeable
        close={true}
        overshootRight={false}
        overshootLeft={false}
        renderRightActions={(progress, dragX) => (
          <RightActions onPress={this.props.onPress} />
        )}
        renderLeftActions={(progress, dragX) => (
          <LeftActions onPress={this.props.onPressLeft} />
        )}
        // onSwipeableRightOpen={this.props.onswipe}
      >
        <ListComponent
          type={this.props.type}
          shopName={this.props.shopName}
          billDate={this.props.billDate}
          chequeAmount={this.props.chequeAmount}
          cashAmount={this.props.cashAmount}
          pendingAmount={this.props.pendingAmount}
        />
      </Swipeable>
    );
  }
}
