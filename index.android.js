/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

// Core
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  StatusBar,
  NetInfo,
  View,
  Text,
} from 'react-native';

// 3rd Party
import { Router, Scene, Actions, ActionConst, Modal } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';

// App
import design from './src/styles/Design';
import firebaseApp from './src/services/Firebase';
import StatusModal from './src/components/StatusModal';
import Splash from './src/scenes/splash/Splash';
import Login from './src/scenes/login/Login';
import Home from './src/scenes/home/Home';

export default class bookie extends Component {
  constructor(props) {
    super(props);
    this._handleConnectionChange = this._handleConnectionChange.bind(this);
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener('change', this._handleConnectionChange);
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('change', this._handleConnectionChange);
  }

  _handleConnectionChange(isConnected) {
    if (isConnected) {
      Actions.pop('statusModal');
    } else {
      Actions.statusModal({
        message: 'Woah! You should really connect to the Internet.',
        statusType: 'error',
        autoDismiss: false
      });
    }
  };

  render() {
    const rightButton = () => (
      <View style={styles.rightButton}>
        <Icon name="ios-search" size={20} color="#333" style={styles.icon} />
        <Text style={styles.text}>Search</Text>
      </View>
    );
    return (
      <Router
        navigationBarStyle={styles.navBar}
        titleStyle={styles.titleStyle}>
        <Scene key="modal" component={Modal} >
          <Scene key="root">
            <Scene key="splash" component={Splash} title="Welcome" initial={true} hideNavBar />
            <Scene key="login" component={Login} title="Login" type={ActionConst.RESET} hideNavBar />
            <Scene key="home" component={Home} title="Explore" hideNavBar={false} renderRightButton={rightButton} />
          </Scene>
          <Scene key="statusModal" component={StatusModal} />
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
    backgroundColor: '#FFFFFF',
  },
  navBar: {
    height: 53,
    backgroundColor: '#FAFAFA',
    borderBottomWidth: 0,
  },
  titleStyle: {
    color: design.colors.primary,
  },
  rightButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingRight: 10,
  },
  text: {
    color: '#333',
  },
  icon: {
    marginTop: 0,
    marginRight: 10,
  },
});

AppRegistry.registerComponent('bookie', () => bookie);
