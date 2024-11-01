import { createContext, useReducer, useState } from "react";

// Context'in varsayılan değeri
export const WordsContext = createContext({
  words: [],
  score: 0,
  addWord: (wordData) => {},
  deleteWord: (id) => {},
  setWords: (words) => {},
  updateWord: (id, wordData) => {},
});

// Reducer fonksiyonu
function wordReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];
    case "DELETE":
      return state.filter((word) => word.id !== action.payload);
    case "SET":
      return Array.isArray(action.payload) ? action.payload : [];
    case "UPDATE":
      const updatableWordIndex = state.findIndex(
        (word) => word.id === action.payload.id
      );
      const updatedWords = [...state];
      updatedWords[updatableWordIndex] = {
        ...state[updatableWordIndex],
        ...action.payload.data,
      };
      return updatedWords;
    default:
      return state;
  }
}

function WordContextProvider({ children }) {
  const [wordState, dispatch] = useReducer(wordReducer, []);
  const [score, setScore] = useState(0);

  function addWord(wordData) {
    dispatch({ type: "ADD", payload: wordData });
  }

  function deleteWord(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function setWords(words) {
    dispatch({ type: "SET", payload: words });
  }

  function updateWord(id, wordData) {
    dispatch({ type: "UPDATE", payload: { id, data: wordData } });
  }

  const value = {
    words: wordState,
    addWord,
    score,
    deleteWord,
    setWords,
    updateWord,
  };

  return (
    <WordsContext.Provider value={value}>{children}</WordsContext.Provider>
  );
}

export default WordContextProvider;
