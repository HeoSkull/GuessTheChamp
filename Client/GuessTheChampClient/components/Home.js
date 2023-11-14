import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import ButtonMode from "../shared/ButtonMode.js";

export default function Home(props) {
  const navigateTo = (destination) => {
    props.navigation.navigate(destination);
  };

  return (
    <View style={styles.container}>
      <ButtonMode
        image={require("../assets/ButtonQuoteEmpty.png")}
        callback={() => navigateTo("Quote")}
        mode={"Quote"}
        description={"Get clues on every try"}
      ></ButtonMode>

      <ButtonMode
        image={require("../assets/ButtonAbilityEmpty.png")}
        callback={() => navigateTo("Ability")}
        mode={"Ability"}
        description={"One ability, one champion to find"}
      ></ButtonMode>

      <ButtonMode
        image={require("../assets/ButtonEmojiEmpty.png")}
        callback={() => navigateTo("Emoji")}
        mode={"Emoji"}
        description={"Guess with a set of emojis"}
      ></ButtonMode>

      <ButtonMode
        image={require("../assets/ButtonSplashEmpty.png")}
        callback={() => navigateTo("Splash")}
        mode={"Splash"}
        description={"Guess from an image section"}
      ></ButtonMode>
    </View>
  );
}

const screenW = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: screenW,
  },
});
