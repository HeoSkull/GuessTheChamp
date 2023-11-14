import React from "react";
import {
  Text,
  View,
  Image,
  Pressable,
  StyleSheet,
  Dimensions,
} from "react-native";

const windowWidth = Dimensions.get("window").width;

export default function ButtonMode(props) {
  const { image, mode, description, callback } = props;

  return (
    <View>
      <Pressable style={styles.pressable} onPress={callback}>
        <Image style={styles.headerImage} source={image} />
        <View style={styles.textWrapper}>
          <Text style={styles.mode}>{mode}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </Pressable>
    </View>
  );
}

//width / height
const ratio = 389 / 86;
const width = windowWidth - 20 > 389 ? 389 : windowWidth - 20;
const percentScaled = width / 389 > 1 ? 1 : width / 389;

const styles = StyleSheet.create({
  pressable: {
    justifyContent: "center",
  },

  headerImage: {
    position: "relative",
    width: width,
    height: width / ratio,
    margin: 10,
    resizeMode: "contain",
    zIndex: 1,
  },

  textWrapper: {
    position: "absolute",
    top: 0,
    left: width * 0.3,
    width: width * 0.7,
    height: width / ratio,
    paddingTop: 10,
    zIndex: 2,
    justifyContent: "center",
    alignItems: "flex-start",
  },

  mode: {
    fontSize: 25 * percentScaled,
    zIndex: 2,
    color: "white",
  },

  description: {
    fontSize: 15 * percentScaled,
    zIndex: 2,
    color: "white",
  },
});
