import { db } from "./firebase.js";

import { collection, getDocs } from "firebase/firestore";
import { getChampions } from "./champions.js";

const category = "emojis";

export async function getRandomEmojis() {
  console.log("getRandomEmojis");

  const listChampions = await getChampions();

  const champion =
    listChampions[Math.floor(Math.random() * listChampions.length)]
      .name;

  const coll = collection(db, champion + "-" + category);
  console.log(champion + "-" + category);

  const querySnapshot = await getDocs(coll);

  if (querySnapshot.empty) {
    console.log(
      "No documents in collection" + champion + "-" + category
    );
    return await getRandomEmojis();
  }

  const random = Math.floor(Math.random() * querySnapshot.size);
  const randomDoc = querySnapshot.docs[random];

  const data = randomDoc.data();

  return {
    champion: champion,
    emoji: data.emoji,
  };
}
