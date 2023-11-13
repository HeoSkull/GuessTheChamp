import React, { useEffect, useState } from "react";
import { Text, View, Image, StyleSheet } from "react-native";

import { listChampions } from "../../services/champions.js";
import { getRandomSplashArt } from "../../services/splash_art.js";

import Question from "../../shared/Question.js";
import InputChampion from "../../shared/InputChampion.js";
import ResetButton from "../../shared/ResetButton.js";
import ListGuessed from "../../shared/ListGuessed.js";

export default function Splash(props) {
  const [splashart, setSplashart] = useState({
    image: "",
    champion: "",
  });
  const [count, setCount] = useState(0);
  const [isCorrected, setIsCorrected] = React.useState(false);
  const [championSelected, setChampionSelected] = useState([]);

  const onSubmit = (champion) => {
    setChampionSelected([champion, ...championSelected]);
    setCount(count + 1);

    if (champion.name === splashart.champion) {
      setIsCorrected(true);
    }
  };

  const onReset = () => {
    setChampionSelected([]);
    setCount(0);
    setIsCorrected(false);
    getRandomSplashArt().then((splashart) => {
      setSplashart(splashart);
    });
  };

  useEffect(() => {
    getRandomSplashArt().then((splashart) => {
      setSplashart(splashart);
    });
  }, [listChampions]);

  return (
    <View>
      <Question>
        <Text style={styles.text}>Which Champion's Art</Text>
        <View style={styles.splashartWrapper}>
          <Image
            style={[
              styles.splashart,
              {
                transform: isCorrected
                  ? [{ scale: 1 }]
                  : [{ scale: Math.max(1, 4 - count * 0.25) }],
              },
            ]}
            source={{ uri: splashart.image }}
          />
        </View>
      </Question>

      <View
        style={[
          styles.input,
          { display: isCorrected ? "none" : "flex" },
        ]}
      >
        <InputChampion
          championSelected={championSelected}
          onSubmit={onSubmit}
        />
      </View>

      <View style={{ display: isCorrected ? "flex" : "none" }}>
        <ResetButton onReset={onReset} />
      </View>

      <View style={styles.listGuessed}>
        <ListGuessed
          championSelected={championSelected}
          answer={splashart.champion}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 20,
  },

  splashartWrapper: {
    marginTop: 20,
    width: 300,
    height: 300,
    borderRadius: 10,
    overflow: "hidden",
  },

  splashart: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },

  input: {
    alignItems: "center",
    position: "relative",
    zIndex: 1,
  },

  listGuessed: {
    marginTop: 20,
    position: "relative",
    zIndex: 0,
  },
});
