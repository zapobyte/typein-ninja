<template>
<div class="game--container m-auto">
  <div id="gametext" class="small text-dark nes-balloon from-left nes-pointer"></div>
  <GameAnimation :gameDone="gameDone"/>
  <div class="game--body">
    <div class="row">
      <div class="game--difficulty mt-3 col-md-7 col-xs-12 text-left pb-3">
          <details>
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
      <div class="game--stats col-md-5 mt-3 col-xs-12 mb-3 text-right">
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
      <div class="col-xs-12 col-md-10">
        <input type="text" name="inputField" id="textinput" class="nes-input d-inline-flex " @keydown="inputCheck" :placeholder="inputPlaceholder">
      </div>
      <div class="col-xs-12 col-md-2 text-right align-self-center">
        <button class="nes-btn m-auto " type="button"  @click="reset()" :disabled="gameDone">reset</button>
      </div>
    </div>
  </div>
</div> 
</template>

<script>
import { mapGetters } from 'vuex';
import GameAnimation from '@/components/GameAnimation.vue';

import {  
  calculateResult,
  generateText,
} from '@/functions/typeText';

export default {
  name: 'GameText',
   components:{
      GameAnimation
  },
  data(){
    return {
      correctKeys:0,
      wordList:[],
      currentWord:0,
      startDate:0,
      acc:0,
      wpm:0,
      gameDone:false,
      inputPlaceholder:"Start typing to initiate the test..."
    }
  }, 
  mounted(){
    this.reset();
  },
  computed:{
    ...mapGetters(['isAuth','getAuthUser']),
  },
  methods:{
    inputCheck(e){
      let inputField = document.getElementById('textinput');
      let textField = document.getElementById('gametext');
      let children = textField.childNodes;
      if(this.currentWord === 0 && inputField.value === ''){
        this.inputPlaceholder = "";
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
              } else {
                children[this.currentWord].classList.add('text-danger');
              }
              this.currentWord++;
            } else if(this.currentWord === this.wordList.length -1){
                const correct = inputField.value == this.wordList[this.currentWord];
                if(correct){
                  this.correctKeys += this.wordList[this.currentWord].length;
                  children[this.currentWord].classList.add('text-success'); 
                } else {
                  children[this.currentWord].classList.add('text-danger');
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
                  if(this.acc >= this.getAuthUser.best.acc && this.wpm > this.getAuthUser.best.wpm){
                    this.$store.dispatch('updateUserBestGame',{
                      wpm:this.wpm,
                      acc:this.acc,
                      difficulty:this.$store.getters.getGameDifficulity
                    })
                  }
                }
                setTimeout((()=>{
                  this.wordList = [];
                  textField.innerHTML = '...';
                }),500);
                this.gameDone=true;
                setTimeout(()=>{
                  textField.innerHTML = this.isAuth ? 'Good job on finishing another training. Your experience has increased. Keep on practicing!' : "Good job on finishing another training. Keep on practicing.";
                  this.gameDone = false;
                },3000);
            }
            inputField.value = '';
        } 
      }
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
      this.gameDone=false;
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
@import '~@/scss/components/game_text.scss';

</style>
