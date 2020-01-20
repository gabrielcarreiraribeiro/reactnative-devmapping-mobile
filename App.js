import React, { Fragment } from 'react';
import { StyleSheet, StatusBar, YellowBox } from 'react-native';

import Routes from './src/routes'

YellowBox.ignoreWarnings([
  "Unrecognized WebSocket"
])

export default function App() {
  return (
    <Fragment>
      <StatusBar barStyle="light-content" backgroundColor="#7D40E7"/>
      <Routes />
    </Fragment>
  );
}

const styles = StyleSheet.create({

});
