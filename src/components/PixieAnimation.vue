<template>
  <div class="pixijs">
  </div>
</template>

<script>
import {GameAnimation} from '@/functions/pixijs';
export default {
  name: 'PixieAnimation',
  props: {
    msg: String
  },
  mounted(){
      const game = new GameAnimation();
      game.init();
      game.createPlayerSheet();
      game.createPlayerChar();
      game.app.loader.load(function() {
          game.app.ticker.add(()=>{
            if(!game.player.playing){
              if(game.animIdleCurr >= Object.keys(game.playerSheet).length){
                  game.animIdleCurr = 0;
                }
              
              if(game.animIdleCurr < (Object.keys(game.playerSheet).length)){
                
                game.player.animationSpeed = 0.167;
                game.player.textures = game.playerSheet[`idle${game.animIdleCurr + 1}`];
                game.player.play();
                game.animIdleCurr++;
              }
          }
        });
      });
      document.getElementsByClassName('pixijs')[0].appendChild(game.app.view);

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.pixijs{
  min-height:30vh;
  max-height:40vh;
  width: 100%;
  background:url('~@/assets/bg.png');
  background-size:contain;  
  background-repeat: no-repeat;
  background-position: center;
}
</style>
