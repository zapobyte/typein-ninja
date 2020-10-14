<template>
  <section class="pt-4 profile">
    <UserProfile :user="userAuth" :best="best"/>
  </section>
</template>
<script>
import UserProfile from '@/components/UserProfile';
import { getBestUserGame } from "@/functions/gameHistory"

export default {
    name:'Profile',
    components:{
        UserProfile
    },
    data(){
      return {
        best:{
          wpm:0,
          acc:0
        }
      }
    },
    async mounted(){
         const user = this.userAuth.uid;
         if(user){
          const bestGame = await getBestUserGame(user);
          this.best= bestGame ? bestGame  : this.bestGame;
         }   
    },
    computed:{
      userAuth(){
        return this.$store.getters.getAuthUser
      }
    }
}
</script>
<style lang="scss" scoped>
.profile{
}
</style>