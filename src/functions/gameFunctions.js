
export const calculateResult = (wordList, correctKeys, startDate) => {
  let words, minute, acc;
  words = correctKeys / 5;
  minute = (Date.now() - startDate) / 1000 / 60;
  let totalKeys = 0;
  wordList.forEach((word) => {
    totalKeys += word.length;
  });
  acc = Math.floor((correctKeys / totalKeys) * 100);
  let wpm = Math.floor(words / minute);
  return { acc: acc, wpm: wpm };
};

export const generateText = (difficulties,difficulty,words) => {
  let count = 0;
  let bookOfKnowledge = [];
  count = difficulties[difficulty].count;
  for (let i = 0; i < count; i++) {
    const randomWord = Math.floor(Math.random() * words.length);
    bookOfKnowledge.push(words[randomWord].toLowerCase());
  }
  return bookOfKnowledge;
};
