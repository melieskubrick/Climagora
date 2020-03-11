import React from 'react';
import {ActivityIndicator, StyleSheet, Dimensions, Text} from 'react-native';

import {Provider} from 'react-redux';
import store from '../store';

import Weather from '../components/weather';

export default function DetailClimates(props) {
  return (
    <Provider store={store}>
      <Weather woeid={props.woeid} title={props.title} />
    </Provider>
  );
}
