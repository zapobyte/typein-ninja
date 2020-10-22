import wordsJSON from '@/assets/words.json';
import store from "@/store/index";

export const calculateResult = (wordList,correctKeys,startDate) => {
    let words, minute, acc;
    words = correctKeys / 5;    
    minute = (Date.now() - startDate) / 1000 / 60;
    let totalKeys = 0;
    wordList.forEach(word => {
        totalKeys += word.length;
    });
    acc = Math.floor((correctKeys / totalKeys) * 100);
    let wpm = Math.floor(words / minute);
    return {acc:acc,wpm:wpm};
}

export const generateText = (gameDifficulty) =>{
    let count = 0;
    let bookOfKnowledge = [];
    const difficulties = store.getters.getDifficulities;
    count = difficulties[gameDifficulty].count;
    for(let i=0;i<count;i++){
        const randomWord = Math.floor(Math.random() * wordsJSON.length);
        bookOfKnowledge.push(wordsJSON[randomWord].toLowerCase());
    }
    return bookOfKnowledge;
}