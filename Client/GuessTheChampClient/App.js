import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import React, { Component } from 'react';
import Home from './Components/HomeComponent'
import Quote from './Components/QuoteComponent'
import Emoji from './Components/EmojiComponent';
import { createStackNavigator } from "@react-navigation/stack";

class App extends Component {
  // render() {
  //   return (
  //     <Quote />
  //   );
  // }
  render(){
  return (
    <NavigationContainer>
      <Quote/>
    </NavigationContainer>
  );
  }
  }
export default App; 
