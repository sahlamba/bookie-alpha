/* @flow */

import React, { Component } from 'react';
import {
  Alert,
  View,
  Image,
  Text,
} from 'react-native';

import FBSDK, { AccessToken } from 'react-native-fbsdk';
import firebase from 'firebase';
import { Actions, ActionConst } from 'react-native-router-flux';
import styles from '../../styles/scenes/Home';

const auth = firebase.auth();
const provider = firebase.auth.FacebookAuthProvider;

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {}
    };
  }

  componentWillMount() {
    AccessToken.getCurrentAccessToken()
      .then((token) => {
        if (!token) {
          return false;
        } else {
          const credential = provider.credential(token.accessToken);
          return auth.signInWithCredential(credential);
        }
      })
      .then((isConnected) => {
        if (isConnected) {
          let currentUser = {};
          currentUser.name = auth.currentUser.displayName;
          currentUser.email = auth.currentUser.email;
          currentUser.photoUrl = auth.currentUser.photoURL;
          currentUser.uid = auth.currentUser.uid;
          this.setState({currentUser});
        } else {
          console.log('Redirecting to login...');
          Actions.login();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{width: 100, height: 100, borderRadius: 50, marginBottom: 20}}
          source={{uri: this.state.currentUser.photoUrl}} />
        <Text style={{fontWeight: 'bold'}}>
          {this.state.currentUser.name}
        </Text>
        <Text>
          {this.state.currentUser.email}
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
