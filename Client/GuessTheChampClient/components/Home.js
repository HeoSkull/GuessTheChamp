import React from "react";
import { View, StyleSheet } from "react-native";
import ButtonMode from "../shared/ButtonMode.js";

export default function Home(props) {
  const navigateTo = (destination) => {
    props.navigation.navigate(destination);
  };

  return (
    <View style={styles.container}>
      <ButtonMode
        image={"ButtonQuoteEmpty.png"}
        callback={() => navigateTo("Quote")}
        mode={"Quote"}
        description={"Get clues on every try"}
      ></ButtonMode>

      <ButtonMode
        image={"ButtonAbilityEmpty.png"}
        callback={() => navigateTo("Ability")}
        mode={"Ability"}
        description={"One ability, one champion to find"}
      ></ButtonMode>

      <ButtonMode
        image={"ButtonEmojiEmpty.png"}
        callback={() => navigateTo("Emoji")}
        mode={"Emoji"}
        description={"Guess with a set of emojis"}
      ></ButtonMode>

      <ButtonMode
        image={"ButtonSplashEmpty.png"}
        callback={() => navigateTo("Splash")}
        mode={"Splash"}
        description={"Guess from an image section"}
      ></ButtonMode>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
