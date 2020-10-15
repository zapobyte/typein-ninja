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

      }
    },
    async mounted(){
    },
    computed:{
      userAuth(){
        return this.$store.getters.getAuthUser
      },
      best(){
        const {wpm,acc} = this.$store.getters.getAuthUser;
        return {
          wpm,
          acc
        }
      }
    }
}
</script>
<style lang="scss" scoped>
.profile{
}
</style>