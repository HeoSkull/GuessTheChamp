import React from "react";

import { Text, View, Image, StyleSheet } from "react-native";

export default function ListGuessed(props) {
  const { championSelected, answer } = props;

  return (
    <>
      {championSelected.map((champion) => {
        return (
          <View
            style={styles.guessChampionCardContainer}
            key={champion.name}
          >
            <View
              style={[
                styles.guessChampionCardWrapper,
                {
                  backgroundColor:
                    champion.name === answer ? "#38FF6D" : "#FF3838",
                  borderColor:
                    champion.name === answer ? "#5EFF63" : "#FF5E5E",
                },
              ]}
            >
              <Image
                style={{ width: 50, height: 50 }}
                source={{ uri: champion.avatar }}
              />
              <Text style={styles.text}>{champion.name}</Text>
            </View>
          </View>
        );
      })}
    </>
  );
}

const BackgroundColor = "#1E2328";
const BorderWidth = 2;

const styles = StyleSheet.create({
  guessChampionCardContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },

  guessChampionCardWrapper: {
    width: 250,

    backgroundColor: BackgroundColor,
    borderWidth: BorderWidth,

    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",

    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    color: "white",
    fontSize: 20,
  },
});
