<template>
  <div class="game ml-auto mr-auto row align-items-end">
  
    <div class="game--container p-3">
      <div class="game--text  text-left pb-3" >
        <div id="gametext" class="small nes-balloon from-left nes-pointer">
        </div>
        <PixieAnimation />
      </div>
      <div class="game--body mb-2">
        <div class="row">
          <div class="col-xs-12 col-md-10">
            <input type="text" name="inputField" id="textinput" class="nes-input d-inline-flex " @keydown="inputCheck">
          </div>
          <div class="col-xs-12 col-md-2 text-right align-self-center">
            <button class="nes-btn m-auto " type="button"  @click="reset()">reset</button>
          </div>
          
          </div>
      </div>
      <div class="col-12 pt-3">
        <div class="game--content row align-items-center">
            <div class="game--difficulty col-7 col-xs-12 text-left">
              <details class="alitn-items-center">
                <summary class="text-uppercase align-items-center">Difficulty
                  <a href="#" class=" text-lowercase nes-badge text-left mr-auto">
                  <span :class="$store.getters.getGameDifficulity ? 'is-success' : 'is-error' ">{{$store.getters.getGameDifficulity}}</span>
                  </a> 
                </summary>
                  <a href="#" class="nes-badge" @click="setGameDifficulty('easy')">
                  <span :class="$store.getters.getGameDifficulity =='easy' ? 'is-success' : 'is-error' ">easy</span>
                </a> 
                <a href="#" class="nes-badge " @click="setGameDifficulty('normal')">
                  <span :class="$store.getters.getGameDifficulity =='normal' ? 'is-success' : 'is-error' ">normal</span>
                </a> 
                <a href="#" class="nes-badge " @click="setGameDifficulty('hard')">
                  <span :class="$store.getters.getGameDifficulity =='hard' ? 'is-success' : 'is-error' ">hard</span>
                </a> 
              </details>
            </div>
            <div class="game--stats col-5 col-xs-12 text-right">
                <span  title="word per minute">
                <a href="#" class="nes-badge is-splited">
                    <span class="is-dark"> WPM</span>
                    <span class="is-error"> {{wpm}}</span>
                  </a>
                </span>
                
                <span  title="accuracy">
                  <a href="#" class="nes-badge is-splited">
                    <span class="is-dark"> ACC</span>
                    <span class="is-error"> {{acc}}</span>
                  </a>
                </span>
            </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import PixieAnimation from '@/components/PixieAnimation.vue';

import { 
  calculateResult,
  generateText,
  classAdding
} from '@/functions/type';

export default {
  name: 'GameText',
   components:{
      PixieAnimation
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
      let textField = document.getElementById('gametext');
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
                  textField.style.display="none"
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
      const textField = document.getElementById('gametext');
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
      textField.style.display="block";
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
details{
  summary{
      outline:none;
  }
}
.nes-badge{
  font-size:0.7rem;
  padding:0;
  margin:0.5rem;

}
 .nes-badge.is-splited{
  padding:0;
  margin:0.5rem;
  font-size:0.7rem !important;

 }
.game{
  @media screen and (min-width: 980px) {
    width:70%;
  }
  &--text{
    color:#222;
    min-width:100%;
  }

}
#textinput:focus{
  border-color:#f2f2f2;
}
</style>
