import React, { useEffect } from "react";
import { Text, View, Image, StyleSheet } from "react-native";

import { listChampions } from "../../services/champions.js";
import { getRandomQuote } from "../../services/quote.js";

import InputChampion from "../../shared/InputChampion.js";

export default function Quote(props) {
  const [quote, setQuote] = React.useState({});
  const [count, setCount] = React.useState(0);
  const [championSelected, setChampionSelected] = React.useState([]);

  const removeRevision = (audio) => {
    if (audio === undefined) {
      return "";
    }
    return audio.split("/revision/")[0];
  };

  const onSubmit = (champion) => {
    setChampionSelected([champion, ...championSelected]);
    setCount(count + 1);
  };

  useEffect(() => {
    getRandomQuote().then((quote) => {
      setQuote(quote);
    });
  }, [listChampions]);

  return (
    <View>
      <View style={styles.questionContainer}>
        <View style={styles.questionWrapper}>
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
              src={removeRevision(quote.audio ?? "")}
              controls
            ></audio>
          </View>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <InputChampion
          championSelected={championSelected}
          onSubmit={onSubmit}
        />
      </View>

      <View>
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
                      champion.name === quote.champion
                        ? "green"
                        : "red",
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
      </View>
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

  text: {
    color: "white",
    fontSize: 20,
  },

  quote: {
    color: "white",
    fontSize: 20,
    flexWrap: "wrap",
  },

  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  guessChampionCardContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  guessChampionCardWrapper: {
    width: 250,

    backgroundColor: BackgroundColor,
    borderWidth: BorderWidth,
    borderColor: BorderInputColor,

    padding: 30,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",

    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});
