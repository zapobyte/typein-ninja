<template>
  <section class="pt-4 profile">
    <UserProfile :user="user" />
  </section>
</template>
<script>
import UserProfile from '@/components/UserProfile';
import store from '@/store/index';

export default {
    name:'Profile',
    components:{
        UserProfile
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
    async mounted(){
    },
}
</script>
<style lang="scss" scoped>
</style>