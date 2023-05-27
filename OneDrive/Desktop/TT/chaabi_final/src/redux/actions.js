// Action Types
export const SET_NAME = 'SET_NAME';
export const SET_USER_INPUT = 'SET_USER_INPUT';
export const SET_START_COUNTING = 'SET_START_COUNTING';
export const SET_ACTIVE_WORD_INDEX = 'SET_ACTIVE_WORD_INDEX';
export const SET_CORRECT_WORD_ARRAY = 'SET_CORRECT_WORD_ARRAY';
export const SET_START_TIME = 'SET_START_TIME';
export const SET_KEYSTROKES = 'SET_KEYSTROKES';
export const SET_WORDS = 'SET_WORDS';
export const ADD_HISTORY_ENTRY = 'ADD_HISTORY_ENTRY';

// Action Creators
export const setName = (name) => ({
  type: SET_NAME,
  payload: name,
});

export const setUserInput = (input) => ({
  type: SET_USER_INPUT,
  payload: input,
});

export const setStartCounting = (startCounting) => ({
  type: SET_START_COUNTING,
  payload: startCounting,
});

export const setActiveWordIndex = (index) => ({
  type: SET_ACTIVE_WORD_INDEX,
  payload: index,
});

export const setCorrectWordArray = (array) => ({
  type: SET_CORRECT_WORD_ARRAY,
  payload: array,
});

export const setStartTime = (startTime) => ({
  type: SET_START_TIME,
  payload: startTime,
});

export const setKeystrokes = (keystrokes) => ({
  type: SET_KEYSTROKES,
  payload: keystrokes,
});

export const setWords = (words) => ({
  type: SET_WORDS,
  payload: words,
});

export const addHistoryEntry = (entry) => ({
  type: ADD_HISTORY_ENTRY,
  payload: entry,
});
