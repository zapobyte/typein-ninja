<template>
  <section class="games-list container mt-4">
  <div class="nes-field">
    <label for="name_field">Search user</label>
    <input type="text" id="search" class="nes-input" v-model="search">
  </div>
 
  <div class="nes-table-responsive text-dark text__small game--list">
    <table class="nes-table is-bordered mt-4 text-center is-center w-100 ">
      <thead>
        <tr>
          <th style="width:110px"></th>
          <th>NAME</th>
          <th style="width:110px">LVL</th>
          <th>RANK</th>
          <th style="width:110px">BEST ACC</th>
          <th style="width:110px">BEST WPM</th>
          <th>DIFFICULTY</th>
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
} from '@/functions/utility';

export default {
  name:'Profile',
  components:{
      UserProfile
  },
  data(){
    return{
      search:'',
      searchList:[]
    }
  },
  async mounted(){
    this.$store.dispatch('setLoading',true);
    try {
      let users = await getUsers();
      users.forEach(async (user)=>{
          this.searchList.push(user);
      })
    } catch (error) {
      console.log(error);
    }
    this.$store.dispatch('setLoading',false);
  },
  computed:{
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