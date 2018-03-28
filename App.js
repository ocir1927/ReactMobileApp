/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Root } from "native-base";
import {
  Platform,
  StyleSheet
} from 'react-native';

import { RootNavigator } from './app/router'

import { Login } from './app/screens/login/login.js'

export const BASE_URL = "http://192.168.43.123:8080";

export default class App extends Component {
  render() {
    return (
      <Root>
        <RootNavigator />
      </Root>
    );
  }
}
