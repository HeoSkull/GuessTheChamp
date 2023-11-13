import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";

import {
  searchChampion,
  compareChampions,
} from "../services/champions";

export default function InputChampion(props) {
  const [champion, setChampion] = useState("");
  const [championFound, setChampionFound] = useState([]);

  const { championSelected = [] } = props;
  const { onSubmit = console.log } = props;

  const submit = (champion) => {
    if (champion === undefined) {
      onSubmit(championFound[0]);
    } else {
      onSubmit(champion);
    }
    setChampion("");
  };

  useEffect(() => {
    if (champion.length > 0) {
      const championFound = searchChampion(champion);

      championSelected.forEach((champion) => {
        const index = championFound.findIndex((cFound) =>
          compareChampions(cFound.name, champion.name)
        );

        if (index > -1) {
          championFound.splice(index, 1);
        }
      });

      setChampionFound(championFound);
    } else {
      setChampionFound([]);
    }
  }, [champion]);

  return (
    <View>
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            onChangeText={setChampion}
            type="text"
            placeholder="Type the champion name"
            maxLength={20}
            value={champion}
          />
        </View>

        <View style={{ marginLeft: 10 }}>
          <TouchableOpacity
            style={styles.buttonWrapper}
            onPress={submit}
          >
            <Image
              style={styles.buttonImage}
              source={require("../assets/submit.svg")}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.foundContainer}>
        <ScrollView style={styles.foundList}>
          {championFound.map((champion) => (
            <TouchableOpacity
              onPress={() => {
                submit(champion);
              }}
              style={styles.championContainer}
              key={champion.name}
            >
              <Image
                style={{ width: 50, height: 50 }}
                source={{ uri: champion.avatar }}
              />
              <Text style={styles.championName}>{champion.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const BackgroundColor = "#1E2328";
const BorderInputColor = "#06B5B3";
const BorderButtonColor = "#E5D347";

const TextColor = "#fff";

const InputHeight = 70;
const InputWidth = 350;
const InputBorderWidth = 4;

const styles = StyleSheet.create({
  inputContainer: {
    height: InputHeight + InputBorderWidth * 2,
    flexDirection: "row",
  },

  inputWrapper: {
    height: InputHeight + InputBorderWidth * 2,
    width: InputWidth + InputBorderWidth * 2,
    borderWidth: InputBorderWidth,
    borderColor: BorderInputColor,
  },

  input: {
    height: InputHeight,
    width: InputWidth,
    position: "absolute",
    border: "none",
    backgroundColor: "transparent",

    paddingLeft: 25,

    fontSize: 25,
    color: TextColor,
    backgroundColor: BackgroundColor,
  },

  buttonWrapper: {
    height: InputHeight + InputBorderWidth * 2,
    width: InputHeight + InputBorderWidth * 2,

    borderWidth: InputBorderWidth,
    borderColor: BorderButtonColor,
    backgroundColor: BackgroundColor,

    alignItems: "center",
    justifyContent: "center",

    borderRadius: 50,
  },

  buttonImage: {
    height: InputHeight / 2,
    width: InputHeight / 2,
    border: "none",
    backgroundColor: "transparent",
  },

  foundContainer: {
    marginTop: 10,
    flexDirection: "column",
    justifyContent: "space-between",
  },

  foundList: {
    backgroundColor: BackgroundColor,
    maxHeight: 400,
    overflow: "scroll",
  },

  championContainer: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: BackgroundColor,
  },

  championName: {
    marginLeft: 20,
    fontSize: 20,
    color: TextColor,
  },
});
