/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
} from 'react-native';

import firebaseApp from './src/services/Firebase';
import { Scene, Router, ActionConst } from 'react-native-router-flux';

import Login from './src/components/login/Login';
import Test from './src/components/test/Test';

export default class bookie extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="test" component={Test} title="Test" initial={true} hideNavBar={false} />
          <Scene key="login" component={Login} title="Login" type={ActionConst.RESET} hideNavBar />
        </Scene>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  }
});

AppRegistry.registerComponent('bookie', () => bookie);
