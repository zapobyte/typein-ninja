
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
    const bookOfKnowledge = "late develop must but plan person each".split(" ");
    return bookOfKnowledge;
}

export const classAdding = (textField,wordList,currentWord,correct) => {
    return  textField.innerHTML = correct ? textField.innerHTML.replace(wordList[currentWord],'<span class="text-success">'+wordList[currentWord]+'</span>') : textField.innerHTML.replace(wordList[currentWord],'<span class="text-danger">'+wordList[currentWord]+'</span>')
}