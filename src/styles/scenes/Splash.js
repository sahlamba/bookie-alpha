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
    color: '#444444',
    fontSize: design.font.title,
    marginBottom: design.font.small,
  },
  loading: {
    color: '#666666',
    fontSize: design.font.small,
  },
});

export default styles;
