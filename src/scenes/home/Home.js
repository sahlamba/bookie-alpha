/* @flow */

// Core
import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  AsyncStorage,
} from 'react-native';

// 3rd Party
import FBSDK, { AccessToken } from 'react-native-fbsdk';
import { Actions, ActionConst } from 'react-native-router-flux';
import firebase from 'firebase';

// Styles
import styles from '../../styles/scenes/Home';

// Constants
import config from '../../services/Config';
const auth = firebase.auth();
const provider = firebase.auth.FacebookAuthProvider;

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {}
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{width: 80, height: 80, borderRadius: 40, marginBottom: 20}}
          source={{uri: this.state.currentUser.photoUrl}} />
        <Text style={{fontWeight: 'bold'}}>
          {this.state.currentUser.name}
        </Text>
        <Text>
          {this.state.currentUser.email}
        </Text>
      </View>
    );
  }
}
