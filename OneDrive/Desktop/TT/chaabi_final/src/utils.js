export function calculateAccuracy(words, keystrokes) {
    if (keystrokes === 0) {
      return 0;
    }
    return Math.floor((words / keystrokes) * 100);
  }
  