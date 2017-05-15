/* @flow */

// Core
import React, { Component } from 'react';
import {
  View,
  Text,
  AsyncStorage,
} from 'react-native';

// 3rd Pary
import FBSDK, { LoginButton, AccessToken } from 'react-native-fbsdk';
import { Actions, ActionConst } from 'react-native-router-flux';
import firebase from 'firebase';

// Styles
import styles from '../../styles/scenes/Login';

// Config & Constants
import config from '../../services/Config';
const reqdPermissions = ["email", "public_profile"];
const auth = firebase.auth();
const provider = firebase.auth.FacebookAuthProvider;

export default class Login extends Component {
  constructor(props) {
    super(props);
    this._getAccessTokenFromFB = this._getAccessTokenFromFB.bind(this);
    this._login = this._login.bind(this);
    this._logout = this._logout.bind(this);
  }

  _login(error, result) {
    if (error) {
      Actions.statusModal({
        message: 'Oops! There was a problem logging into Facebook. Try again later.',
        statusType: 'error',
        autoDismiss: false
      });
    } else if (result.isCancelled) {
      Actions.statusModal({
        message: 'You need to log into Facebook to start using the app.',
        statusType: 'info',
        autoDismiss: true
      });
    } else {
      this._getAccessTokenFromFB();
    }
  }

  _logout() {
    AsyncStorage.removeItem(config.ACCESS_TOKEN_KEY)
      .then(() => {
        Actions.login();
        Actions.statusModal({
          message: 'You were successfully logged out!',
          statusType: 'success',
          autoDismiss: true
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  _getAccessTokenFromFB() {
    AccessToken.getCurrentAccessToken()
      .then((token) => {
        if (token) {
          // Save Access Token to Async Storage
          AsyncStorage.setItem(config.ACCESS_TOKEN_KEY, token.accessToken)
            .then(() => {
              // Go to Home
              Actions.home({type: ActionConst.RESET});
            })
            .catch((err) => {
              console.error(err);
            });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.appTitle}>
          bookie
        </Text>
        <LoginButton
          readPermissions={reqdPermissions}
          onLoginFinished={this._login}
          onLogoutFinished={this._logout} />
      </View>
    );
  }
}
