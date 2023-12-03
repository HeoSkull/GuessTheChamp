import React, { useEffect } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";

import { listChampions } from "../../services/champions.js";
import { getRandomAbilites } from "../../services/ability.js";

import Question from "../../shared/Question.js";
import InputChampion from "../../shared/InputChampion.js";
import ResetButton from "../../shared/ResetButton.js";
import ListGuessed from "../../shared/ListGuessed.js";

export default function Ability(props) {
  const [ability, setAbility] = React.useState({
    image: "",
    champion: "",
  });
  const [count, setCount] = React.useState(0);
  const [isCorrected, setIsCorrected] = React.useState(false);
  const [championSelected, setChampionSelected] = React.useState([]);

  const onSubmit = (champion) => {
    setChampionSelected([champion, ...championSelected]);
    setCount(count + 1);

    if (champion.name === ability.champion) {
      setIsCorrected(true);

      // Display an alert or popup congratulating the user
      Alert.alert(
        "Congratulations!",
        "You correctly guessed the champion's skill!",
        [{ text: "OK", onPress: () => {} }]
      );
    } else {
      // Display an alert or popup indicating the wrong selection
      Alert.alert(
        "Incorrect Answer",
        `You selected ${champion.name}, but the correct champion is ${ability.champion}.`,
        [{ text: "OK", onPress: () => {} }]
      );
    }
  };

  const onReset = () => {
    setChampionSelected([]);
    setCount(0);
    setIsCorrected(false);
    getRandomAbilites().then((ability) => {
      setAbility(ability);
    });
  };

  useEffect(() => {
    getRandomAbilites().then((ability) => {
      setAbility(ability);
    });
  }, [listChampions]);

  return (
    <View>
      <Question>
        <Text style={styles.text}>Which Champion's Skill</Text>
        <Image
          style={styles.ability}
          source={{ uri: ability.image }}
        />
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
          answer={ability.champion}
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

  ability: {
    width: 100,
    height: 100,
    marginTop: 15,
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
