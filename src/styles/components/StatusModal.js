/* @flow */

import {
  Dimensions,
  StyleSheet,
} from 'react-native';

import design from '../Design';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DB4C2C',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: Dimensions.get('window').width,
    padding: 20,
  },
  errorMessage: {
    fontWeight: 'bold',
    fontSize: design.font.small,
    color: '#FFFFFF',
  }
});

export default styles;
