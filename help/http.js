import axios from "axios";
const url = "https://englishquiz-5c905-default-rtdb.firebaseio.com/";

export async function storeWord(userId, wordData) {
  const response = await axios.post(url + `/word/${userId}.json`, wordData);
  const id = response.data.name; // Firebase'den dönen id

  return id; // id ve bugün tarihini nesne olarak döndür
}

export async function getWords(userId) {
  const response = await axios.get(url + `/word/${userId}.json`);
  const words = [];
  for (const key in response.data) {
    const wordObj = {
      id: key,
      ingilizcekelime: response.data[key].ingilizcekelime,
      turkcekelime: response.data[key].turkcekelime,
      date: response.data[key].date,
      //   date: new Date(),
    };
    words.push(wordObj); // wordObj'yi words dizisine ekleyin
  }
  return words;
}

export function updateWord(userId, id, wordData) {
  return axios.put(url + `/word/${userId}/${id}.json`, wordData);
}
export function deleteWordHttp(userId, id) {
  return axios.delete(url + `/word/${userId}/${id}.json`);
}
