<template>
  <div class="game m-auto row align-items-end" id="gametext">
    <div class="game--stats text-right p-2 pr-0">
        <small>
          <span  title="word per minute" class="pr-2">
            <i class="far fa-keyboard text-success"></i>/<i class="far fa-clock text-primary"></i> {{wpm}} 
          </span>
          
          <span  title="accuracy">
           <i class="fas fa-crosshairs text-danger"></i> {{acc}} 
          </span>
        </small>
    </div>
    
    <div class="game--container p-3">
      <div class="game--text text-left pb-3" id="game--text" v-html="wordList.join(' ')">

      </div>
      <div class="game--text ">
        <div class="input-group">
          <input type="text" name="inputField" id="textinput" class="d-inline-flex form-control" @keydown="inputCheck">
          <div class="input-group-append">
            <button class="btn btn-dark ml-4" type="button"  @click="reset($event)">Reset</button>
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
      correct:0,
    }
  }, 
  mounted(){
    const inputField = document.querySelector('#textinput');
    this.wordList = generateText();
    inputField.focus();
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
          console.log(inputField.value,this.wordList[this.currentWord])
          if(inputField.value !=='') {

              if(this.currentWord < this.wordList.length -1){
                  const correct = inputField.value == this.wordList[this.currentWord];
                  if(correct){
                    this.correctKeys += this.wordList[this.currentWord].length + 1; 
                 }
                textField.innerHTML = textField.innerHTML.substr(this.wordList[this.currentWord].length + 1);
              }

              if(this.currentWord  === this.wordList.length -1 ){
                const result = calculateResult(this.wordList,this.correctKeys,this.startDate);
                this.acc = result.acc;
                this.wpm = result.wpm;
                this.wordList = [];
              }  
              inputField.value = '';
              this.currentWord++;
          }
          
        } else if (this.currentWord === this.wordList.length -1) {
          if (inputField.value + e.key === this.wordList[this.currentWord] ) {
            this.correctKeys += this.wordList[this.currentWord].length;
            this.currentWord++;
            const result = calculateResult(this.wordList,this.correctKeys,this.startDate);
            this.acc = result.acc;
            this.wpm = result.wpm;
            inputField.value = '';
            this.wordList = [];
          }
        }
    },
    reset(e){
      const textField = document.getElementById('game--text');
      textField.innerHTML = '';
      this.wordList = [];
      this.correctKeys=0;
      this.currentWord=0;
      this.startDate=0;
      this.acc=0;
      this.wpm=0;
      this.correct = null;
      this.wordList = generateText();
      textField.innerHTML  = this.wordList.join(' ');
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
