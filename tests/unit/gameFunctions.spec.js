import {calculateResult,generateText} from '@/functions/gameFunctions';
import wordsJSON from '@/assets/words.json';
import store from '@/store';

const data = {
  wordList:[],
  correctKeys:0,
}

beforeEach(() => {
  const count = store.getters.getDifficulities['easy'].count;
  for (let i = 0; i < count; i++) {
    const randomWord = Math.floor(Math.random() * wordsJSON.length);
    data.wordList.push(wordsJSON[randomWord].toLowerCase());
  }
  const randomKeys = Math.floor(Math.random() * wordsJSON.length);
  data.correctKeys = randomKeys;
});

describe('Test game functions:',()=>{
  test('calculate game result', () => {
    const startDate = Date.now()
    const result = calculateResult(data.wordList,data.correctKeys,startDate)
    expect(result.acc).toBeGreaterThanOrEqual(0);
    expect(result.wpm).toBeGreaterThanOrEqual(0);
  });
  test('generate text based on game difficulty',()=>{
    const text = generateText(store.getters.getDifficulities,'easy',data.wordList);
    expect(text.length).toBe(10);
  })
})
