import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";

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
    });
  };

  useEffect(() => {
    getRandomQuote().then((quote) => {
      setQuote(quote);
    });
  }, [listChampions]);

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
            { display: count < 5 ? "none" : "flex" },
          ]}
        >
          <audio
            type="application/ogg"
            src={removeRevision(quote)}
            controls
          ></audio>
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

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 20,
  },

  quote: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    flexWrap: "wrap",
    maxWidth: 500,
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
