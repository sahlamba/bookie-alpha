/* @flow */

// Core
import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
} from 'react-native';

// 3rd Pary
import FBSDK, { LoginButton, AccessToken } from 'react-native-fbsdk';
import { Actions, ActionConst } from 'react-native-router-flux';
import firebase from 'firebase';

// Styles
import styles from '../styles/components/StatusModal';

export default class StatusModal extends Component {
  constructor(props) {
    super(props);
    this.dismissModal = this.dismissModal.bind(this);
    this.state = {
      hide: false
    };
  }

  dismissModal() {
    this.setState({hide: true});
  }

  render() {
    if (this.state.hide) {
      return (
        <View></View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.errorMessage}>
            {this.props.message}
          </Text>
        </View>
      );
    }
  }
}
