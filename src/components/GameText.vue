<template>
  <div class="game m-auto row align-items-end" id="gametext">
    <div class="col-12">
    <div class="game--content row pb-2 ">
        <div class="game--difficulty col-lg-6 col-md-6 col-xs-12 text-left">
          <span @click="setGameDifficulty('easy')">easy </span>
          <span @click="setGameDifficulty('normal')">normal </span>
          <span @click="setGameDifficulty('hard')">hard</span>
        </div>
        <div class="game--stats col-lg-6 col-md-6 col-xs-12 text-right">
          <small>
            <span  title="word per minute" class="pr-2">
              WPM {{wpm}} 
            </span>
            
            <span  title="accuracy">
            ACC {{acc}} 
            </span>
          </small>
        </div>
      </div>
    </div>
    
    <div class="game--container p-3">
      <div class="game--text text-left pb-3" id="game--text" v-html="wordList.join(' ')">

      </div>
      <div class="game--text ">
        <div class="input-group">
          <input type="text" name="inputField" id="textinput" class="d-inline-flex form-control" @keydown="inputCheck">
          <div class="input-group-append">
            <button class="btn btn-dark ml-4" type="button"  @click="reset()">Reset</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { 
  calculateResult,
  generateText,
  classAdding
} from '@/functions/type';

export default {
  name: 'GameText',
  components:{
  },
  data(){
    return {
      correctKeys:0,
      wordList:[],
      currentWord:0,
      startDate:0,
      acc:0,
      wpm:0,
      correct:false,
    }
  }, 
  mounted(){
    this.reset();
  },
  computed:{
  },

  methods:{
    inputCheck(e){
      const inputField = document.getElementById('textinput');
      const textField = document.getElementById('game--text');
        if(this.currentWord === 0 && inputField.value === ''){
            this.startDate = Date.now();
        }
        if(e.key === ' '){
          e.preventDefault();
          if(inputField.value !=='') {
              inputField.value.trim();
              if(this.currentWord < this.wordList.length -1){
                const correct = inputField.value == this.wordList[this.currentWord];
                if(correct){
                    this.correctKeys += this.wordList[this.currentWord].length; 
                }
                this.currentWord++;
              } else if(this.currentWord === this.wordList.length -1){
                    const correct = inputField.value == this.wordList[this.currentWord];
                    if(correct){
                        this.correctKeys += this.wordList[this.currentWord].length ; 
                    }
                    const result = calculateResult(this.wordList,this.correctKeys,this.startDate);
                    this.acc = result.acc;
                    this.wpm = result.wpm;
                    const gameOk = this.acc > 0 && this.wpm > 0;
                    if(gameOk){
                      this.$store.dispatch('addGameHistory',{
                      acc:this.acc,
                      wpm:this.wpm,
                      difficulty:this.$store.getters.getGameDifficulity,
                      date:new Date(this.startDate)
                    });
                    }
                    this.wordList = [];
              }
              //console.log('value> ',this.correctKeys)
              inputField.value = '';
          } 
        } 
    },
    reset(gameDifficult){
      const difficulty = gameDifficult ? gameDifficult : this.$store.getters.getGameDifficulity;
      const textField = document.getElementById('game--text');
      textField.innerHTML = '';
      this.wordList = [];
      this.correctKeys=0;
      this.currentWord=0;
      this.startDate=0;
      this.acc=0;
      this.wpm=0;
      this.correct = null;
      this.wordList = generateText(difficulty);
      textField.innerHTML  = this.wordList.join(' ');
      const inputField = document.querySelector('#textinput');
      inputField.focus();
    },
    setGameDifficulty(difficulty){
      this.$store.dispatch('setGameDifficulty',difficulty);
      this.reset(difficulty);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.game{
  width:100%;
  &--text{
    color:white;
    min-width:100%;
  }
  &--container{
    background: rgba(0,0,0,0.3);
    border-radius:0.5rem;
  }
}

</style>
