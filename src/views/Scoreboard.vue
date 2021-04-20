<template>
  <section class="games-list container mt-4">
    <div class="nes-field">
      <label for="name_field">Search user</label>
      <input type="text" id="search" class="nes-input" v-model="search" />
    </div>

    <div class="nes-table-responsive text-center text-dark text__small game--list">
      <div class="row bg-light nes-table is-bordered mt-4">
          <div class="col-1">
          </div>
          <div class="col-2">
            NAME
          </div>
          <div class="col-1">
            LVL
          </div>
          <div class="col-2">
            RANK
          </div>
          <div class="col-2">
            BEST ACC
          </div>
          <div class="col-2">
            BEST WPM
          </div>
          <div class="col-2">
            DIFFICULTY
          </div>
      </div>
      <div class="row align-items-center text-center  nes-table is-bordered user"  v-for="user in users" :key="user.uid" @click="goToProfile" :id="user.uid">
        <div class="col-1" title="Go to user profile">
           <img :src="user.photoURL" class="nes-avatar img-fluid" />
        </div>
        <div class="col-2">
          {{ user.displayName }}
        </div>
        <div class="col-1">
          {{ user.lvl }}
        </div>
        <div class="col-2">
          <img
            :src="rankUrl(user.rank)"
            style="width: 24px; margin-left: -4px"
            v-if="user.rank"
          /> {{ user && user.rank ? user.rank : 'Apprentice' }}
        </div>
        <div class="col-2">
          {{ user.best.acc }}
        </div>
        <div class="col-2">
          {{ user.best.wpm }}
        </div>
        <div class="col-2">
          {{ user.best.difficulty }}
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import UserProfile from '@/components/UserProfile';
import { getUsers } from '@/functions/user';
import { toDate } from '@/functions/utility';

export default {
  name: 'Profile',
  components: {
    UserProfile,
  },
  data() {
    return {
      search: '',
      searchList: [],
    };
  },
  async created() {
    try {
      let users = await getUsers();
      this.searchList = users;
    } catch (error) {
      console.log(error);
    }
  },
  computed: {
    users() {
      return this.searchList.filter((user) => {
        return user.displayName.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
  methods: {
    toDate(seconds) {
      return toDate(seconds);
    },
    async goToProfile(e) {
      e.preventDefault();
      try {
        const id = e.target.parentElement.id;
        const user = this.searchList.find((user) => user.uid == id);
        this.$router.push({
          path: `/profile/${user.uid}`,
        });
      } catch (error) {
        console.log(error);
      }
    },
    rankUrl(rank){
      return require(`@/assets/gameAssets/ranks/rank_${rank.toLowerCase()}.png`);
    },
  },
 
};
</script>
<style lang="scss" scoped>
@import '~@/scss/pages/scoreboard.scss';
</style>
