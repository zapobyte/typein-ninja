<template>
  <div class="game m-auto row align-items-end" id="gametext">
    <div class="col-12">
    <div class="game--content row pb-3 ">
        <div class="game--difficulty col-lg-6 col-md-6 col-xs-12 text-left">
          <span @click="setGameDifficulty('easy')" :class="$store.getters.getGameDifficulity =='easy' ? 'game--difficulty--active' : '' "><small>easy </small></span>
          <span @click="setGameDifficulty('normal')" :class="$store.getters.getGameDifficulity =='normal' ? 'game--difficulty--active' : '' "><small>normal </small></span>
          <span @click="setGameDifficulty('hard')" :class="$store.getters.getGameDifficulity =='hard' ? 'game--difficulty--active' : '' "><small>hard </small></span>
        </div>
        <div class="game--stats col-lg-6 col-md-6 col-xs-12 text-right">
            <span  title="word per minute" class="pr-2">
              <small>
                WPM {{wpm}} 
              </small>

            </span>
            
            <span  title="accuracy">
              <small>
                ACC {{acc}}          
              </small>
            </span>
        </div>
      </div>
    </div>
    
    <div class="game--container p-3">
      <div class="game--text text-left pb-3" id="game--text"></div>
      <div class="game--body ">
        <div class="input-group">
          <input type="text" name="inputField" id="textinput" class="d-inline-flex form-control" @keydown="inputCheck">
          <div class="input-group-append">
            <button class="btn btn-dark ml-3" type="button"  @click="reset()">Reset</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
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
    }
  }, 
  mounted(){
    this.reset();
  },
  computed:{
    ...mapGetters(['isAuth']),

  },

  methods:{
    inputCheck(e){
      let inputField = document.getElementById('textinput');
      let textField = document.getElementById('game--text');
      let children = textField.childNodes;
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
                  children[this.currentWord].classList.add('text-success');
              }
              this.currentWord++;
            } else if(this.currentWord === this.wordList.length -1){
                  const correct = inputField.value == this.wordList[this.currentWord];
                  if(correct){
                    this.correctKeys += this.wordList[this.currentWord].length;
                    children[this.currentWord].classList.add('text-success'); 
                  }
                  const result = calculateResult(this.wordList,this.correctKeys,this.startDate);
                  this.acc = result.acc;
                  this.wpm = result.wpm;
                  const gameOk = this.acc > 0 && this.wpm > 0;
                  if(gameOk &&  this.isAuth){
                    this.$store.dispatch('addGameHistory',{
                    acc:this.acc,
                    wpm:this.wpm,
                    difficulty:this.$store.getters.getGameDifficulity,
                    date:new Date(this.startDate)
                  });
                  }
                  this.wordList = [];
                  textField.innerHTML = '';
            }
            inputField.value = '';
        } 
      }
    },
    replaceAt(string, index, replace) {
        string.substring(0, index) + replace + string.substring(index + 1);
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
      const words = generateText(difficulty);
      words.forEach(word=>{
        textField.innerHTML+=`<span>${word} </span>`;
      })
      this.wordList = words;
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
  &--difficulty{
    &--active{
      content:"";
      height:1px;
      width:100%;
      border-bottom:1px solid #222;
    }
  }
}

</style>
