import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Dimensions,
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

  const submit = () => {
    if (championFound.length === 0) {
      return;
    }

    onSubmit(championFound[0]);
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
            placeholderTextColor={TextColor}
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

const InputRatio = 350 / 70;
const windowWidth = Dimensions.get("window").width;
const InputWidth = windowWidth > 350 ? 270 : windowWidth * 0.8 - 10;
const percentScaled = InputWidth / 350 > 1 ? 1 : InputWidth / 350;
const InputHeight = InputWidth / InputRatio;
const InputBorderWidth = 3 * percentScaled;

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
    borderWidth: 0,
    backgroundColor: "transparent",

    textAlignVertical: "center",
    paddingLeft: 15 * percentScaled,

    fontSize: 25 * percentScaled,
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
    borderWidth: 0,
    backgroundColor: "transparent",
  },

  foundContainer: {
    top: InputHeight + InputBorderWidth * 2 + 10,
    width:
      InputWidth +
      InputBorderWidth * 2 +
      10 +
      InputHeight +
      InputBorderWidth * 2,
    position: "absolute",
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
