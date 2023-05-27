import {legacy_createStore } from "redux";
import { SET_KEYSTROKES, setKeystrokes, setWords,setActiveWordIndex,setCorrectWordArray } from "./actions";

// Initial state
const initialState = {
  userInput: "",
//   cloud: generateCloud(),
  startCounting: false,
  activeWordIndex: 0,
  correctWordArray: [],
  startTime: 0,
  keystrokes: 0,
  words: 0,
  history: [],
  name: ""
};

// Reducer function
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER_INPUT":
      return { ...state, userInput: action.payload };
    case "SET_START_COUNTING":
      return { ...state, startCounting: action.payload };
    case "SET_ACTIVE_WORD_INDEX":
      return { ...state, activeWordIndex: action.payload };
    case "SET_CORRECT_WORD_ARRAY":
      return { ...state, correctWordArray: action.payload };
    case "SET_START_TIME":
      return { ...state, startTime: action.payload };
    case "SET_KEYSTROKES":
      return { ...state, keystrokes: action.payload };
    case "SET_WORDS":
      return { ...state, words: action.payload };
    case "SET_HISTORY":
      return { ...state, history: action.payload };
    case "SET_NAME":
      return { ...state, name: action.payload };
    default:
      return state;
  }
};

// Create the store
const store =legacy_createStore(reducer);

export default store;
