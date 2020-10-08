export const calculateResult = (wordList,correctKeys,startDate) => {
    let words, minute, acc;
    words = correctKeys / 5;    
    minute = (Date.now() - startDate) / 1000 / 60;
    let totalKeys = -1;
    wordList.forEach(word => {
        totalKeys += word.length + 1;
    });
    acc = Math.floor((correctKeys / totalKeys) * 100);
    let wpm = Math.floor(words / minute);
    return {acc:acc,wpm:wpm};
}

export const generateText = () =>{
    let bookOfKnowledge = [];
    bookOfKnowledge = "test a bucket in a bucket that is a bucket of a bucket".split(" ");
    return bookOfKnowledge;
}