/* @flow */

import React, { Component } from 'react';
import {
  Alert,
  View,
  Text,
} from 'react-native';

import FBSDK, { AccessToken } from 'react-native-fbsdk';
import { Actions, ActionConst } from 'react-native-router-flux';
import styles from '../../styles/Test';

export default class Test extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    AccessToken.getCurrentAccessToken()
      .then((token) => {
        if (!token)
          Actions.login();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Welcome to home!
        </Text>
        <Text
          style={styles.text}
          onPress={Actions.login}>
          Click here to go to login.
        </Text>
      </View>
    );
  }
}
