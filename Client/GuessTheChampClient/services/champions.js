export let listChampions = [];

export const categories = ["abilities", "quotes", "splash_arts"];

const regexSpecialCharacters = /[&\/\\#,+()$~%.'":*?<>{}]/g;

/**
 * @returns  {Promise<string>} Promise object represents the list of champions
 */
export async function getVersion() {
  const response = await fetch(
    "https://ddragon.leagueoflegends.com/api/versions.json"
  );
  const json = await response.json();
  return json[0];
}

/**
 *
 * @returns {Promise<Object>} Promise object represents the list of champions
 */
export async function getChampions() {
  if (listChampions && listChampions.length > 0) return listChampions;

  const version = await getVersion();
  const response = await fetch(
    `http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`
  );
  const data = (await response.json()).data;

  const listChamps = [];

  for (const champion in data) {
    listChamps.push({
      name: data[champion].name,
      avatar: `http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${data[champion].image.full}`,
    });
  }
  listChampions = listChamps;
  return listChamps;
}

(async () => {
  listChampions = await getChampions();
})();

/**
 * @param {string} cName1
 * @param {string} cName2
 */
export function compareChampions(cName1, cName2) {
  const tempCName1 = cName1
    .toLowerCase()
    .replace(regexSpecialCharacters, "");
  const tempCName2 = cName2
    .toLowerCase()
    .replace(regexSpecialCharacters, "");

  return (
    tempCName1.includes(tempCName2) || tempCName2.includes(tempCName1)
  );
}

/**
 * @param {string} championName
 * @returns
 */
export function searchChampion(champion) {
  const championFound = listChampions.filter((c) => {
    return compareChampions(c.name, champion);
  });

  return championFound;
}
