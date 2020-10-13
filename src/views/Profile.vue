<template>
  <section class=" profile">
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
        best:{}
      }
    },
    async mounted(){
      const bestGame = await getBestUserGame(this.userAuth.uid);
    this.best = bestGame;
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