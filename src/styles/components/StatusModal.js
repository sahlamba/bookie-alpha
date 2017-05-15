/* @flow */

import {
  Dimensions,
  StyleSheet,
} from 'react-native';

import design from '../Design';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#444444',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: Dimensions.get('window').width,
  },
  typeError: {
    backgroundColor: '#DB4C2C',
  },
  typeSuccess: {
    backgroundColor: '#00AB6C',
  },
  typeInfo: {
    backgroundColor: design.colors.primary,
  },
  message: {
    flex: 8,
    fontWeight: 'bold',
    fontSize: design.font.small,
    color: '#FFFFFF',
    textAlign: 'center',
    padding: 15,
  },
  dismissButton: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  icon: {
    fontSize: design.font.small,
  },
});

export default styles;
