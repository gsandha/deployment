import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import axios from "axios";

// import {
//   setUserInput,
//   setStartCounting,
//   setActiveWordIndex,
//   setCorrectWordArray,
//   setStartTime,
//   setKeystrokes,
//   setWords,
//   setHistory,
//   setName
// } from "./actions";

import { calculateAccuracy } from "./utils";
import { setActiveWordIndex, setCorrectWordArray, setKeystrokes, setName, setUserInput, setWords } from "./redux/actions";

// Returns a random word from a predefined list
function getRandomWord() {
  const words = [
    "apple", "banana", "cherry", "orange", "grape", "melon", "pear", "kiwi",
    "strawberry", "blueberry", "pineapple", "mango", "peach", "plum", "lemon"
  ];
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}

// Generates a word cloud with random words
function generateCloud() {
  const cloudSize = 20;
  const cloud = [];
  for (let i = 0; i < cloudSize; i++) {
    cloud.push(getRandomWord());
  }
  return cloud;
}

// Component for rendering a word in the word cloud
function Word({ text, active, correct }) {
  if (correct === true) {
    return <span className="correct">{text} </span>;
  }

  if (correct === false) {
    return <span className="incorrect">{text} </span>;
  }

  if (active) {
    return <span className="active">{text} </span>;
  }

  return <span>{text} </span>;
}

// Component for displaying the timer
function Timer() {
  const startCounting = useSelector(state => state.startCounting);
  const accuracy = useSelector(state => calculateAccuracy(state));
  const words = useSelector(state => state.words);
  const keystrokes = useSelector(state => state.keystrokes);
  const dispatch = useDispatch();

  useEffect(() => {
    let interval;
    if (startCounting) {
      const startTime = Date.now();
      interval = setInterval(() => {
        const currentTime = Date.now();
        const elapsed = Math.floor((currentTime - startTime) / 1000);
        const remainingTime = Math.max(0, 300 - elapsed);

        if (remainingTime === 0) {
          clearInterval(interval);

          // Make a POST request to store data on the server
          const entry = {
            accuracy: accuracy,
            words: words,
            keystrokes: keystrokes
          };

          axios.post("http://localhost:8080/history", entry)
            .then(response => {
              console.log("Data stored successfully:", response.data);
            })
            .catch(error => {
              console.error("Error storing data:", error);
            });
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [startCounting, accuracy, words, keystrokes]);

  const minutes = Math.floor(300 / 60);
  const seconds = 300 % 60;

  return (
    <div>
      {startCounting ? (
        <p>
          Timer: {minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}
        </p>
      ) : (
        <p>Time's up! Data has been stored.</p>
      )}
    </div>
  );
}

// Component for rendering the keyboard
function Keyboard() {
  const activeKey = useSelector(state => state.userInput.slice(-1));
  const dispatch = useDispatch();

  const handleKeyPress = key => {
    dispatch(setUserInput(key));
    dispatch(setKeystrokes(prevKeystrokes => prevKeystrokes + 1));

    if (key === " ") {
      dispatch(setUserInput(""));
      dispatch(setWords(prevWords => prevWords + 1));
      dispatch(setActiveWordIndex(prevIndex => prevIndex + 1));
    }
  };

  return (
    <div className="keyboard">
      <div className="row">
        <button className="key" onClick={() => handleKeyPress("q")}>
          {activeKey === "q" && <span className="active-key">Q</span>}
          {!activeKey && "Q"}
        </button>
        <button className="key" onClick={() => handleKeyPress("w")}>
          {activeKey === "w" && <span className="active-key">W</span>}
          {!activeKey && "W"}
        </button>
        <button className="key" onClick={() => handleKeyPress("e")}>
          {activeKey === "e" && <span className="active-key">E</span>}
          {!activeKey && "E"}
        </button>
        {/* ... */}
      </div>
      {/* ... */}
    </div>
  );
}

// Component for the entire app
function App() {
  const cloud = useSelector(state => state.cloud);
  const activeWordIndex = useSelector(state => state.activeWordIndex);
  const correctWordArray = useSelector(state => state.correctWordArray);
  const userInput = useSelector(state => state.userInput);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleKeyPress = event => {
      const activeWord = cloud[activeWordIndex];
      const typedChar = event.key;

      if (typedChar === activeWord.charAt(userInput.length)) {
        dispatch(setUserInput(prevInput => prevInput + typedChar));
      }

      if (typedChar === " " && userInput === activeWord) {
        dispatch(setUserInput(""));
        dispatch(setCorrectWordArray(prevArray => [...prevArray, activeWord]));
        dispatch(setActiveWordIndex(prevIndex => prevIndex + 1));
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [activeWordIndex, cloud, dispatch, userInput]);

  return (
    <div className="app">
      <h1>Type Faster</h1>
      <div className="word-cloud">
        {cloud.map((word, index) => (
          <Word
            key={index}
            text={word}
            active={index === activeWordIndex}
            correct={correctWordArray.includes(word)}
          />
        ))}
      </div>
      <Keyboard />
      <Timer />
    </div>
  );
}

export default App;
