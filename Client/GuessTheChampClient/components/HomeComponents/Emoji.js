import React, { useEffect } from "react";
import { Text, View, Image, StyleSheet, Alert, } from "react-native";
import Graphemer from "graphemer";

const splitter = new Graphemer();
/**
 * @param {*} emoji
 * @returns {string}
 */
const convertStringEmojiToArray = (emoji) => {
  if (!emoji) return "";
  console.log(splitter.splitGraphemes(emoji));
  return splitter.splitGraphemes(emoji);
};

import { listChampions } from "../../services/champions.js";
import { getRandomEmojis } from "../../services/emoji.js";

import Question from "../../shared/Question.js";
import InputChampion from "../../shared/InputChampion.js";
import ResetButton from "../../shared/ResetButton.js";
import ListGuessed from "../../shared/ListGuessed.js";

export default function Emoji(props) {
  const [emoji, setEmoji] = React.useState({
    emoji: "",
    champion: "",
  });
  const [emojiArray, setEmojiArray] = React.useState([]);
  const [isCorrected, setIsCorrected] = React.useState(false);
  const [count, setCount] = React.useState(0);
  const [championSelected, setChampionSelected] = React.useState([]);

  const onSubmit = (champion) => {
    setChampionSelected([champion, ...championSelected]);
    setCount(count + 1);

    if (champion.name === emoji.champion) {
      setIsCorrected(true);

      // Display an alert or popup congratulating the user
      Alert.alert(
        "Congratulations!",
        "You correctly guessed the champion's emoji!",
        [{ text: "OK", onPress: () => {} }]
      );
    } else {
      // Display an alert or popup indicating the wrong selection
      Alert.alert(
        "Incorrect Answer",
        `You guessed ${champion.name}, but the correct champion is ${emoji.champion}.`,
        [{ text: "OK", onPress: () => {} }]
      );
    }
  };

  const onReset = () => {
    setChampionSelected([]);
    setCount(0);
    setIsCorrected(false);
    getRandomEmojis().then((emoji) => {
      setEmoji(emoji);
      setEmojiArray(convertStringEmojiToArray(emoji.emoji));
    });
  };

  useEffect(() => {
    getRandomEmojis().then((emoji) => {
      setEmoji(emoji);
      setEmojiArray(convertStringEmojiToArray(emoji.emoji));
    });
  }, [listChampions]);

  return (
    <View>
      <Question>
        <Text style={styles.text}>Which Champion?</Text>
        <Text style={styles.emoji}>
          {emojiArray.map((emoji, index) => (
            <Text
              key={index}
              style={[
                styles.emojiString,
                {
                  display:
                    count >= index || isCorrected ? "flex" : "none",
                },
              ]}
            >
              {emoji}
            </Text>
          ))}
        </Text>
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
          answer={emoji.champion}
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

  emoji: {
    display: "flex",
    flexDirection: "row",
  },

  emojiString: {
    fontSize: 50,
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
