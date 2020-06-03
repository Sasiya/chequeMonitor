import React, {Component} from 'react';
import {Text, View, PermissionsAndroid, Platform} from 'react-native';
import MainNavigations from './src/navigations/MainNavigations';
import Home from './src/screens/Home';
import firebase from 'react-native-firebase';

export default class App extends Component {
  componentDidMount() {
    // firebase.auth().onAuthStateChanged(user => {
    //   if (user) {
    //   } else {
    //     alert('aaa');
    //   }
    // });
    // console.log(firebase);
    let abc = firebase
      .auth()
      .signInWithEmailAndPassword('sasi@gmail.com', '15968ssk');

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
      } else {
        alert('no');
      }
    });
  }

  render() {
    return <MainNavigations />;
  }
}
