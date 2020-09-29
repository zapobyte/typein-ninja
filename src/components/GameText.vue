<template>
  <div class="game p-4 m-auto row align-items-end ">
    <div class="game--stats text-right p-2">
        WPM {{wpm}} / ACC {{acc}}
    </div>
    <div class="game--container p-4 ">
      <div class="game--text text-left mb-3">
        {{ wordList.join(" ") }}
      </div>

      <div class="game--input ">
        <div class="input-group mb-3">
          <input type="text" name="inputField" id="textinput" class="d-inline-flex form-control" @keydown="inputCheck">
          <div class="input-group-append">
            <button class="btn btn-dark ml-4" type="button"  @click="reset">Reset</button>
          </div>
        </div>
      </div>

      <div class="game-reset">
      </div>
    </div>
  </div>
</template>

<script>
import { calculateResult,generateText } from '@/functions/type';
export default {
  name: 'GameText',
  components:{
  },
  data(){
    return {
      wordCount:0,
      correctKeys:0,
      wordList:[],
      currentWord:0,
      startDate:0,
      acc:0,
      wpm:0
    }
  },
  mounted(){
    const inputField = document.querySelector('#textinput');
    this.wordCount = this.wordList.length;
    this.wordList = generateText();
    inputField.focus();
  },
  methods:{
    inputCheck(e){
      if(this.currentWord < this.wordList.length){
        const inputField = document.getElementById('textinput');
        if(this.currentWord === 0){
            this.startDate = Date.now();
        }
        if(e.key === ' '){
          e.preventDefault()
          if(inputField.value !=='') {
            console.log(inputField.value)
              if(this.currentWord< this.wordList.length -1){
                  const correct = inputField.value == this.wordList[this.currentWord];
                  if(correct){
                    this.correctKeys += this.wordList[this.currentWord].length + 1; 
                  }
              }
          }
          if(this.currentWord === this.wordList.length -1){
              const result = calculateResult(this.wordList,this.correctKeys,this.startDate);
              this.acc = result.acc;
              this.wpm = result.wpm;
          }  
          inputField.value = '';
          this.currentWord++;
        } else if (this.currentWord === this.wordList.length - 1) {
          if (inputField.value + e.key === this.wordList[this.currentWord]) {
            this.correctKeys += this.wordList[this.currentWord].length;
            this.currentWord++;
            const result = calculateResult(this.wordList,this.correctKeys,this.startDate);
            this.acc = result.acc;
            this.wpm = result.wpm;
            inputField.value='';
          }
        }
      }
    },
    reset(){
      this.wordCount=0;
      this.correctKeys=0;
      this.wordList=[];
      this.currentWord=0;
      this.startDate=0;
      this.acc=0;
      this.wpm=0;
      this.wordList = generateText();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.game{
  width:70%;
  &--text{
    color:white;

  }
  &--container{
    background: rgba(0,0,0,0.3);
    border-radius:2rem;
  }
}
</style>
