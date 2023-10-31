import React, { Component, useState } from "react";
import { Pressable, StyleSheet, View, Text, Card, Image } from "react-native";
import { Navigation, useNavigation } from "@react-navigation/native";
import Quote from "./QuoteComponent";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

class Home extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Image style={{ width: 350, height: 150, }} source={require("../assets/logo.png")} />
        <Text style={{ fontSize: 20 }}>Guess League of Legends champions</Text>
      

        <View>
          <Image style={{ width: 350, height: 70, }} source={require("../assets/ButtonQuoteEmpty.png")} />
          <View
            style={styles.text}
            position="absolute"
            onPress={() => {
              
              const navigate = useNavigation();
              navigate("Quote");
            }}
          >
            <Text >Quote</Text>
            <Text>Guess with in-game quotes</Text>
          </View>
        </View>

        <View>
          <Image style={{ width: 350, height: 70, }} source={require("../assets/ButtonAbilityEmpty.png")} />
          <View
              style={styles.text}
              position="absolute"
            >
              <Text>Ability</Text>
              <Text>One ability, one champion to find</Text>
            </View>
        </View>
        <View>
          <Image style={{ width: 350, height: 70, }} source={require("../assets/ButtonEmojiEmpty.png")} />
          <View
              style={styles.text}
              position="absolute"
            
            >
              <Text>Emoji</Text>
              <Text>Guess with a set of emojis</Text>
            </View>
        </View>
      
        <View>
          <Image style={{ width: 350, height: 70, }} source={require("../assets/ButtonSplashEmpty.png")} />
          <View
            style={styles.text}
            position="absolute"
          >
            <Text >Splash</Text>
            <Text >Guess from an image section</Text>
          </View>
        </View>
      
     
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  
  
  
  text: {
    marginLeft: '23%',
    justifyContent: "flex-end",
    color: "#FF0000",
  },
});



export default Home;
