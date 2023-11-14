import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Dimensions,
} from "react-native";
import { Audio } from "expo-av";

import { listChampions } from "../../services/champions.js";
import { getRandomQuote } from "../../services/quote.js";

import Question from "../../shared/Question.js";
import InputChampion from "../../shared/InputChampion.js";
import ResetButton from "../../shared/ResetButton.js";
import ListGuessed from "../../shared/ListGuessed.js";

export default function Quote(props) {
  const [quote, setQuote] = useState({
    champion: "",
    quote: "",
    audio: "",
  });
  const [sound, setSound] = React.useState();
  const [count, setCount] = useState(0);
  const [isCorrected, setIsCorrected] = React.useState(false);
  const [championSelected, setChampionSelected] = useState([]);

  // Remove revision from audio url for audio tag to work
  const removeRevision = (quote) => {
    if (quote === undefined) {
      return "";
    }

    if (quote.audio === undefined) {
      return "";
    }

    return quote.audio.split("/revision/")[0];
  };

  const loadSound = async (link) => {
    const { sound } = await Audio.Sound.createAsync(link);
    setSound(sound);
  };

  const playSound = async () => {
    await sound.playAsync();
  };

  const onSubmit = (champion) => {
    setChampionSelected([champion, ...championSelected]);
    setCount(count + 1);
    if (champion.name === quote.champion) {
      setIsCorrected(true);
    }
  };

  const onReset = () => {
    setChampionSelected([]);
    setCount(0);
    setIsCorrected(false);
    getRandomQuote().then((quote) => {
      setQuote(quote);
      loadSound(removeRevision(quote));
    });
  };

  useEffect(() => {
    getRandomQuote().then((quote) => {
      setQuote(quote);
      loadSound(removeRevision(quote));
    });
  }, [listChampions]);

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View>
      <Question>
        <Text style={styles.text}>Which Champion says</Text>
        <Text style={styles.quote}>
          {quote === undefined ? "" : quote.quote}
        </Text>
        <View
          style={[
            { marginTop: 10 },
            { display: isCorrected || count >= 5 ? "flex" : "none" },
          ]}
        >
          <Pressable onPress={playSound} style={styles.playButton}>
            <Text style={styles.text}>Play sound</Text>
          </Pressable>
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
          answer={quote.champion}
        />
      </View>
    </View>
  );
}

const BackgroundColor = "#1E2328";
const BorderButtonColor = "#E5D347";

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 20,
  },

  quote: {
    color: "white",
    fontSize: 30 * (windowWidth / 400 > 1 ? 1 : windowWidth / 400),
    fontWeight: "bold",
    flexWrap: "wrap",
    maxWidth: 500,
  },

  playButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: BackgroundColor,
    borderWidth: 2,
    borderColor: BorderButtonColor,
    padding: 10,
    borderRadius: 5,
  },

  input: {
    alignItems: "center",
    position: "relative",
    zIndex: 1,
  },

  listGuessed: {
    position: "relative",
    zIndex: 0,
    marginTop: 20,
  },
});
