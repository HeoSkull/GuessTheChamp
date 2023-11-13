import React from "react";
import {
  Text,
  View,
  Image,
  Pressable,
  StyleSheet,
} from "react-native";

export default function ButtonMode(props) {
  const { image, mode, description, callback } = props;
  return (
    <View>
      <Pressable style={styles.pressable} onPress={callback}>
        <Image
          style={styles.headerImage}
          source={require(`../assets/${image}`)}
        />
        <View style={styles.textWrapper}>
          <Text style={styles.mode}>{mode}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    position: "relative",
    width: 389,
    height: 86,
    margin: 10,
    resizeMode: "contain",
    zIndex: 1,
  },

  textWrapper: {
    position: "absolute",
    top: 0,
    left: 115,
    width: 389,
    height: 86,
    zIndex: 2,
    justifyContent: "center",
    alignItems: "flex-start",
  },

  mode: {
    fontSize: 23,
    zIndex: 2,
    color: "white",
  },

  description: {
    fontSize: 14,
    zIndex: 2,
    color: "white",
  },
});
