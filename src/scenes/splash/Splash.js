/* @flow */

// Core
import React, { Component } from 'react';
import {
  View,
  Text,
  NetInfo,
  AsyncStorage,
} from 'react-native';

// 3rd Pary
import { Actions, ActionConst } from 'react-native-router-flux';
import firebase from 'firebase';

// Styles
import styles from '../../styles/scenes/Splash';

// Config & Constants
import config from '../../services/Config';
const auth = firebase.auth();
const provider = firebase.auth.FacebookAuthProvider;

export default class Splash extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // Check for active net connection
    NetInfo.isConnected.fetch().then((isConnected) => {
      if (isConnected) {
        AsyncStorage.getItem(config.ACCESS_TOKEN_KEY)
          .then((token) => {
            if (token) {
              // Go to Home
              Actions.home({type: ActionConst.RESET});
            } else {
              // Redirect to Login
              Actions.login();
            }
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        Actions.statusModal({
          message: 'Woah! You should really connect to the Internet.'
        });
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.appTitle}>
          bookie
        </Text>
        <Text style={styles.loading}>
          We're loading your content, give us a moment!
        </Text>
      </View>
    );
  }
}
