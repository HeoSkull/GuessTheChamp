import React from "react";

import { View, StyleSheet } from "react-native";

export default function Question(props) {
  return (
    <View style={styles.questionContainer}>
      <View style={styles.questionWrapper}>{props.children}</View>
    </View>
  );
}

const BackgroundColor = "#1E2328";
const BorderInputColor = "#06B5B3";
const BorderWidth = 2;

const styles = StyleSheet.create({
  questionContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  questionWrapper: {
    backgroundColor: BackgroundColor,
    borderWidth: BorderWidth,
    borderColor: BorderInputColor,
    padding: 30,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
  },
});
