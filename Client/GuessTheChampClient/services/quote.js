import { db } from "./firebase.js";

import {
  collection,
  query,
  getDocs,
  where,
} from "firebase/firestore";

import { getChampions } from "./champions.js";

const category = "quotes";

export async function getRandomQuote() {
  console.log("getRandomQuote");

  const listChampions = await getChampions();

  const champion =
    listChampions[Math.floor(Math.random() * listChampions.length)]
      .name;

  const coll = collection(db, champion + "-" + category);
  console.log(champion + "-" + category);

  const q = query(
    coll,
    where("type", "in", ["Movement", "First Encounter"]),
    where("category", "in", [
      "First Move",
      "Moving",
      "Long Move",
      "First Encounter ",
    ])
  );

  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    console.log("No documents in collection");
    return;
  }

  const random = Math.floor(Math.random() * querySnapshot.size);
  const randomDoc = querySnapshot.docs[random];

  const data = randomDoc.data();

  return {
    champion: champion,
    quote: data.quote,
    audio: data.audio,
  };
}
