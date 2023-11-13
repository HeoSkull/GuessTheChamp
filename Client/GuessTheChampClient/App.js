import React from "react";
import { StyleSheet } from "react-native";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";

import "./services/firebase.js";
import "./services/champions.js";

import { createCustomLayout } from "./components/Layout";
const Stack = createCustomLayout();

//Components
import Home from "./components/Home";

import Quote from "./components/HomeComponents/Quote";
import Emoji from "./components/HomeComponents/Emoji";
import Ability from "./components/HomeComponents/Ability";
import Splash from "./components/HomeComponents/Splash";

export default function App() {
  const navigationRef = useNavigationContainerRef();

  return (
    <NavigationContainer style={styles.container} ref={navigationRef}>
      <Stack.Navigator style={styles.navigator}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Quote" component={Quote} />
        <Stack.Screen name="Emoji" component={Emoji} />
        <Stack.Screen name="Ability" component={Ability} />
        <Stack.Screen name="Splash" component={Splash} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navigator: {
    flex: 1,
  },
});
