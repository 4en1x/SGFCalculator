import Home from './components/Home';
import Calculator from './components/Calculator';
import Graph from './components/Graph';
import Amortization from './components/Amortization';
import AboutUs from './components/AboutUs';

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import {createStackNavigator} from 'react-navigation';

export default Router = createStackNavigator({

    Home: {  screen: Home },
    Calculator: {  screen: Calculator },
    Graph: {  screen: Graph },
    Amortization: {  screen: Amortization },
    AboutUs: {  screen: AboutUs },

});
