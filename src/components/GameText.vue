<template>
  <div class="game">
    <PixieAnimation />
    <div class="game--text" >
        <input type="text" name="words" />
    </div>
  </div>
</template>

<script>
import PixieAnimation from '@/components/PixieAnimation.vue';

export default {
  name: 'GameText',
  components:{
    PixieAnimation
  },
  data(){
    return {
      typingMode:'wordcount',
      wordCount:0,
      timeCount:0,
      randomWord:[],
      wordList:[],
      currentWord:0,
      timer:0,
      startDate:0,
      timerActive:false,
      punctuation:false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
