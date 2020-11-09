<template>
  <section class="games-list container mt-4">
  <div class="nes-field">
    <label for="name_field">Search user</label>
    <input type="text" id="search" class="nes-input" v-model="search">
  </div>
  <div class="nes-container p-0 with-title is-centered  border-0 bg-transparent text-white">
    <p class="title bg-transparent mt-2 mb-2"><i class="nes-icon mr-2 star is-small"></i>{{month}} Best Ninjas </p>
    <p class="pl-4 text__small"><small class="pl-2">{{ new Date().toString().split('GMT')[0]}}</small></p>
    <div class="row no-gutters"  v-if="bestMonthUsers.length > 0">
      <div class="col-4 best-user" v-for="(bestUser,index) in bestMonthUsers" :key="bestUser.uid+  Math.random()">
          
          <div class="nes-container bg-white text-dark text-center m-auto with-title is-centered"  @click="$router.push({
            path:`/profile/${bestUser.uid}`
          })" :id="bestUser.uid">
            <p class="title  "> <i class="nes-icon trophy" :class="`color-${positions[index]}`" ></i></p>
            <p><img class="img-fluid nes-avatar" :src="bestUser.photoURL" /></p>
            <p :class="`color-${positions[index]}`">   {{bestUser.displayName}}</p>
            <p class="text__small"><img :src='"~@/assets/gameAssets/ranks/rank_" +bestUser.rank.toLowerCase().split(" ").join("_") +".png"' style="width:24px; margin-left:-4px;" /> {{bestUser.rank}} </p>
                <p><small class="text__small"><i class="nes-icon mr-3 is-small is-full star"></i>LVL
          {{bestUser.lvl}}</small>
                </p>
          </div>

      </div>
    </div>
    <div class="col-12" v-else> No Users recorded for this month </div>
  </div>
  <div class="nes-table-responsive text-dark text__small game--list">
    <table class="nes-table is-bordered m-0 mt-4 text-center is-center w-100 ">
      <thead>
        <tr>
          <th style="width:110px"></th>
          <th>NAME</th>
          <th  style="width:110px">LVL</th>
          <th >RANK</th>
          <th style="width:110px">BEST ACC</th>
          <th style="width:110px">BEST WPM</th>
          <th>DIFFICULTY</th>
          <th >Date</th>
        </tr>
      </thead>
      <tbody>
        <tr  title="Go to user profile" v-for="user in users" :key="user.uid"  @click="goToProfile" :id="user.uid" class="nes-table--row">
          <td><img :src="user.photoURL" class="nes-avatar"/></td>
          <td>{{ user.displayName}}</td>
          <td>{{ user.lvl}}</td>
          <td>{{ user.rank}}</td>
          <td>{{ user.best.acc}}</td>
          <td>{{ user.best.wpm}}</td>
          <td>{{ user.best.difficulty}}</td>
          <td>{{ toDate(user.date.seconds) }}</td>
        </tr>  
      </tbody>
    </table>
  </div>
</section>
  
</template>
<script>
import UserProfile from '@/components/UserProfile';
import { getUsers,getUser } from '@/functions/user';
import { getBestUserGame,getCurrentMonthGames } from '@/functions/gameHistory';
import {
    toDate,
    getMonth
} from '@/functions/utility';

export default {
  name:'Profile',
  components:{
      UserProfile
  },
  data(){
    return{
      search:'',
      searchList:[],
      bestMonthUsers:[],
      positions:['gold','silver','bronze']
    }
  },
  async mounted(){
    const currentMonth = getMonth();
    const bestWPM = 0;
    const date = new Date();
    const from = new Date(date.getFullYear(), date.getMonth());
    const to = new Date(date.getFullYear(), date.getMonth()+1, 1);
    const dates = {
      from:from,
      to:to
    }

    try {
      const games = await getCurrentMonthGames(dates);
      const best3 = [];
      for(let i = 0;i<3;i++){
        if(games[i]){
          best3.push(games[i]);
        }
      }
      const users = await getUsers();
      users.forEach(async (user)=>{
        const bestGame = await getBestUserGame(user.uid);
        if(bestGame){
          const data = {
            ...bestGame,
            ...user
        }
        this.searchList.push(data)
        best3.forEach((u,i)=>{
         if(u && user && u.uid == user.uid){
          best3[i] = {
            ...best3[i],
            ...user
          }
         }  
        })
        this.bestMonthUsers = best3;
      }
    })
    } catch (error) {
      console.log(error)
    }
  },
  computed:{
    month(){
      return getMonth();
    },
    users(){
      return this.searchList.filter(user => {
        return user.displayName.toLowerCase().includes(this.search.toLowerCase())
      })
    },
  },
  methods:{
    toDate(seconds){
      return toDate(seconds);
    },
    async goToProfile(e){
      e.preventDefault()
      try {
          const id = e.target.parentElement.id;
          const user = this.searchList.find(user => user.uid == id );
          this.$router.push({
            path:`/profile/${user.uid}`
          })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/scss/pages/scoreboard.scss';


</style>