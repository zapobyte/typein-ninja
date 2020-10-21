<template>
  <section class="pt-4 profile">
    <UserProfile :user="user" />
    <GameHistory v-if="userAuth.uid == $props.user.uid"/>
  </section>
</template>
<script>
import UserProfile from '@/components/UserProfile';
import store from '@/store/index';
import GameHistory from '@/components/GameHistory';

export default {
    name:'Profile',
    components:{
        UserProfile,
        GameHistory
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

      }
    },
    mounted(){
    },
    computed:{
      userAuth(){
        return this.$store.getters.getAuthUser;
      }
    }
}
</script>
<style lang="scss" scoped>
</style>