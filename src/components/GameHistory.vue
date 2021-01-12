<template>
  <section class="pt-4 game--history">
    <div class="row no-gutters pb-2">
        <div class="col-xs-12 col-md-6">HISTORY</div>
    </div>
    <div class="container-fluid">
    <div class="nes-table-responsive text-dark game--list">
        <table class="nes-table is-bordered is-centered w-100 game--list text-center">
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
                <td>{{ toDate(game.date.seconds) }}</td>
            </tr>
            </tbody>
        </table>
    </div>
    </div>
  </section>
</template>
<script>
import {
    getAllGames
} from '@/functions/gameHistory';
import {
    toDate
} from '@/functions/utility';
import store from '@/store/index';

export default {
    name:'GameHistory',
    components:{
    },
    props:{
      user:{
        type: Object,
        default:()=>{
            return store.getters.getAuthUser;
        }
      }
    },
    data(){
      return {
          games:[]
      }
    },
    async mounted(){
        const user = this?.$props?.user?.uid;
        if(user){
            try {
                this.games = await getAllGames(user);
            } catch (error) {
                console.log(error);
            }
        }
    },
    methods:{
        toDate(seconds){
            return toDate(seconds);
        }
    }
}
</script>
<style lang="scss" scoped>
@import '~@/scss/components/game_history.scss';

</style>