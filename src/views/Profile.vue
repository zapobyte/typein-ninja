<template>
  <div class="profile ">
    <UserProfile />
  </div>
</template>
<script>
import UserProfile from '@/components/UserProfile';
export default {
    name:'Profile',
    components:{
        UserProfile
    }
}
</script>
<style lang="scss" scoped>
.profile{
    height:calc(100% - 200px);
}
</style>