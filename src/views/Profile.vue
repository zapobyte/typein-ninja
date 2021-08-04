<template>
  <section class="mt-4 profile">
    <UserProfile :user="user" />
    <GameHistory v-if="userAuth.uid == user.uid" />
  </section>
</template>
<script>
import UserProfile from '@/components/UserProfile';
import GameHistory from '@/components/GameHistory';
import { getUser } from '@/functions/user';
export default {
  name: 'Profile',
  components: {
    UserProfile,
    GameHistory,
  },
  data() {
    return {
      user: {},
    };
  },
  async mounted() {
    let dbUser;
    const uid = this.$route.params.uid;
    if (uid == this.$store.getters.getAuthUser.uid) {
      this.user = this.$store.getters.getAuthUser;
    } else {
      try {
        dbUser = await getUser(uid);
        this.user = dbUser;
      } catch (error) {
        console.log(error);
      }
    }
  },
  computed: {
    userAuth() {
      return this.$store.getters.getAuthUser;
    },
  },
};
</script>
<style lang="scss" scoped></style>
