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
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';

// Styles
import styles from '../styles/components/StatusModal';
import Icon from 'react-native-vector-icons/Ionicons';

export default class StatusModal extends Component {
  constructor(props) {
    super(props);
    this._statusType = this._statusType.bind(this);
    this._dismissModal = this._dismissModal.bind(this);
    this.state = {
      hide: false
    };
  }

  componentDidMount() {
    if (this.props.autoDismiss) {
      setTimeout(this._dismissModal, 3000); // 3 seconds
    }
  }

  _statusType(x) {
    if ((this.props.statusType == 'error' && x == 0) ||
        (this.props.statusType == 'success' && x == 1) ||
        (this.props.statusType == 'info' && x == 2)) {
      return true;
    } else {
      return false;
    }
  }

  _dismissModal() {
    this.setState({hide: true});
    Actions.pop('statusModal');
  }

  render() {
    if (this.state.hide) {
      return (
        <View></View>
      );
    } else if (this.props.autoDismiss) {
      return (
        <View style={[styles.container,
            this._statusType(0) && styles.typeError,
            this._statusType(1) && styles.typeSuccess,
            this._statusType(2) && styles.typeInfo]}>
          <Text style={styles.message}>
            {this.props.message}
          </Text>
        </View>
      );
    } else {
      return (
        <View style={[styles.container,
            this._statusType(0) && styles.typeError,
            this._statusType(1) && styles.typeSuccess,
            this._statusType(2) && styles.typeInfo]}>
          <Text style={styles.message}>
            {this.props.message}
          </Text>
          <TouchableHighlight style={styles.dismissButton} onPress={this._dismissModal}>
            <Icon name="ios-close" size={styles.icon} color="#FFFFFF" />
          </TouchableHighlight>
        </View>
      );
    }
  }
}
