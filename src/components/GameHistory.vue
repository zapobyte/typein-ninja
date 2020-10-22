<template>
  <section class="pt-4 game--history">
    <div>
        <span>HISTORY</span>
    </div>
    <div class="nes-table-responsive text-dark  game--list">
    <table class="nes-table is-bordered is-centered w-100 text-center">
        <thead>
        <tr>
            <th>WPM</th>
            <th>ACC</th>
            <th>DIFFICULTY</th>
            <th>DATE</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="game in games" :key="`${game.uid}${Math.random()}`">
            <td>{{ game.wpm}}</td>
            <td>{{ game.acc}}</td>
            <td>{{ game.difficulty}}</td>
            <td>{{ new Date(game.date.seconds * 1000).toString().split('(')[0] }}</td>
        </tr>
        </tbody>
    </table>
    </div>
  </section>
</template>
<script>
import {
    getAllGames
} from '@/functions/gameHistory';
import store from '@/store/index';
export default {
    name:'GameHistory',
    components:{
    },
    props:{
      user:{
        type: Object,
        default:()=>{
            return store.getters.getAuthUser
        }
      }
    },
    data(){
      return {
          games:[]
      }
    },
    async mounted(){
        const user = this.$props.user.uid;
        try {
            this.games = await getAllGames(user);
        } catch (error) {
            console.log(error);
        }
    },
    
}
</script>
<style lang="scss" scoped>
.game--list{
    height: 50vh;
    overflow: auto;
}
.w-100{
    width:calc(100% - 10px) !important;
}
.is-small{
    transform: scale(0.8);
    margin:auto;
    align-self: center;
}
</style>