import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
} from 'native-base';

export default class CustomHeader extends Component {
  render() {
    return (
      <Header
        style={{backgroundColor: '#7b16f0'}}
        androidStatusBarColor="#7b16f0">
        <Left>
          <Button transparent onPress={this.props.onPress}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>{this.props.title}</Title>
        </Body>
        <Right />
      </Header>
    );
  }
}
