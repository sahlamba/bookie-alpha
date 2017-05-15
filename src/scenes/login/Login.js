/* @flow */

// Core
import React, { Component } from 'react';
import {
  Alert,
  View,
  Text,
} from 'react-native';

// 3rd Pary
import FBSDK, { LoginButton, AccessToken } from 'react-native-fbsdk';
import { Actions, ActionConst } from 'react-native-router-flux';
import firebase from 'firebase';

// Styles
import styles from '../../styles/scenes/Login';

// Constants
const reqdPermissions = ["email", "public_profile"];
const auth = firebase.auth();
const provider = firebase.auth.FacebookAuthProvider;

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  login(error, result) {
    if (error) {
      Alert.alert("Error!", "Login failed! Error: " + result.error, [
        {
          text: 'OK', onPress: () => console.log('OK pressed.')
        }
      ]);
    } else if (result.isCancelled) {
      Alert.alert("Login was cancelled.", "", [
        {
          text: 'OK', onPress: () => console.log('OK pressed.')
        }
      ]);
    } else {
      Alert.alert("Login successful!", "", [
        {
          text: 'OK', onPress: () => console.log('OK pressed.')
        }
      ]);
      this.getAccessToken();
    }
  }

  logout() {
    Alert.alert("Successfully logged out!", "", [
      {
        text: 'OK', onPress: () => console.log('OK pressed.')
      }
    ]);
  }

  getAccessToken() {
    AccessToken.getCurrentAccessToken()
      .then((token) => {
        const credential = provider.credential(token.accessToken);
        return auth.signInWithCredential(credential);
      })
      .then((userCredData) => {
        console.log('Connected to Firebase.');
        Actions.test({type: ActionConst.RESET});
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
          onLoginFinished={this.login}
          onLogoutFinished={this.logout} />
        <Text
          style={{margin: 36}}
          onPress={() => {Actions.test({type: ActionConst.RESET})}}>
          Go to Test page.
        </Text>
      </View>
    );
  }
}
