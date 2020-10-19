<template>
  <section class="games-list container pt-4">
    <div class="nes-field">
      <label for="name_field">Search user</label>
      <input type="text" id="search" class="nes-input" v-model="search">
    </div>

    <div class="nes-table-responsive text-dark">
    <table class="nes-table is-bordered m-0 mt-4  text-center is-center w-100">
      <thead>
        <tr>
          <th>AVATAR</th>
          <th>NAME</th>
          <th>LVL</th>
          <th>BEST ACC</th>
          <th>BEST WPM</th>
          <th>DIFFICULTY</th>
          <th></th>        
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.uid"  >
          <td ><img :src="user.photoURL" class="nes-avatar"/></td>
          <td>{{ user.displayName}}</td>
          <td>{{ user.lvl}}</td>
          <td>{{ user.acc}}</td>
          <td>{{ user.wpm}}</td>
          <td>{{ user.difficulty}}</td>
          <td>
            <button type="button" class="nes-btn" :id="user.uid" @click="goToProfile">Profile</button>
          </td>  
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
        const data = {
          ...bestGame,
          ...user
        }
        this.searchList.push(data)
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
      }
    },
    methods:{
      async goToProfile(e){
        try {
            const user = this.searchList.filter(user => user.uid == e.target.id);
            this.$router.push({
              name:'Profile', 
              params: { user: user[0] }
            })
        } catch (error) {
          console.log(error)
        }
      }
    }
}
</script>
<style lang="scss" scoped>
</style>