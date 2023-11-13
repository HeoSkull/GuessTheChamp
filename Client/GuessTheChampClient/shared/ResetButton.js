import React from "react";

import { Text, View, StyleSheet, Pressable } from "react-native";

export default function ResetButton(props) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.wrapper} onPress={props.onReset}>
        <Text style={styles.text}>Reset</Text>
      </Pressable>
    </View>
  );
}

const BackgroundColor = "#1E2328";
const BorderButtonColor = "#E5D347";
const BorderWidth = 2;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },

  wrapper: {
    width: 250,

    backgroundColor: BackgroundColor,
    borderWidth: BorderWidth,

    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
    borderColor: BorderButtonColor,
  },

  text: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
});
