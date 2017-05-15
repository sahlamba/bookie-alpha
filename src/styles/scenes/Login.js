/* @flow */

import {
  StyleSheet,
} from 'react-native';

import design from '../Design';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appTitle: {
    color: '#666666',
    fontSize: design.font.title,
    marginBottom: 72,
  },
});

export default styles;
