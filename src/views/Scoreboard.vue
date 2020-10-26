<template>
  <section class="games-list container mt-4">
  <div class="nes-field">
    <label for="name_field">Search user</label>
    <input type="text" id="search" class="nes-input" v-model="search">
  </div>

  <div class="nes-table-responsive text-dark game--list">
    <table class="nes-table is-bordered m-0 mt-4 text-center is-center w-100">
      <thead>
        <tr>
          <th style="width:110px"></th>
          <th>NAME</th>
          <th  style="width:110px">LVL</th>
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
import { getBestUserGame } from '@/functions/gameHistory';
import {
    toDate
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
    try {
      const users = await getUsers();
      users.forEach(async (user)=>{
        const bestGame = await getBestUserGame(user.uid);
        if(bestGame){
          const data = {
            ...bestGame,
            ...user
        }
        this.searchList.push(data)
      }
    })
    } catch (error) {
      console.log(error)
    }
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
.game--list{
  max-height: 80vh;
  overflow: auto;
}
.nes-avatar{
  width:64px !important;
  height:64px !important;
  image-rendering: pixelated;
}
.nes-table--row{
  transition: 0.3s all ease;
  &:hover{
    background:#212529;
    color:white;
    border-color: white !important;
    transition: 0.15s all ease;
  }
}

</style>