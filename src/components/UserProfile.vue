<template>
  <section class="profile">
    <div class="nes-container col-12 is-white text-dark with-title bg-white mb-3">
      <p class="title">Profile</p>
      <div class="row">
        <div class="col-auto align-self-start text__small">
          <img class="nes-avatar is-large" alt="Profile picture" :src="user.photoURL" style="image-rendering: pixelated" />
          <div style="width: 64px" class="pt-2 text__small text-break text-wrap">
            <div class="progress" v-if="user.uid == this.userAuth.uid">
              <div class="progress-bar" role="progressbar" :style="'width:' + percent + '%'" aria-valuenow="percent" :aria-valuemin="percent" aria-valuemax="100">
                {{ percent }}%
              </div>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="row no-gutters align-items-start">
            <div class="text-start col-xs-12 col-md-6">
              <div class="row no-gutters">
                <div class="col-12">
                  <input
                    type="text"
                    id="name_field"
                    class="text__small nes-input"
                    :class="{ 'border-success': uploaded }"
                    :value="userDisplayName"
                    @blur="updateDisplayName"
                    :disabled="!isAuthUser"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Click to edit username"
                  />
                </div>
                <div class="col-12 pt-3 text__small">
                  <div class="row align-items-center">
                    <div class="col-xs-12 col-lg-6 text-center">
                      <i class="nes-icon mr-3 is-small is-full star"></i>LVL
                      {{ user ? user.lvl : '' }}
                    </div>
                    <div class="col-xs-12 col-lg-6 text-center">
                      <img
                        :src="rankUrl"
                        style="width: 24px; margin-left: -4px"
                        v-if="user.rank"
                      />
                      <img src="@/assets/gameAssets/ranks/rank_apprentice.png" style="width: 24px; margin-left: -4px" v-else/>
                      {{ user ? user.rank : 'Apprentice' }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xs-12 col-md-6 text-end" title="best score">
              <div class="d-inline-flex text-end">
                <i class="nes-icon trophy"></i>
                <a href="#" class="nes-badge is-small is-splited mr-3">
                  <span class="is-dark">wpm</span>
                  <span class="is-success">{{ user.best ? user.best.wpm : '0' }}</span>
                </a>
              </div>
              <div class="d-inline-flex">
                <i class="nes-icon trophy"></i>
                <a href="#" class="nes-badge is-small is-splited mr-3">
                  <span class="is-dark">acc</span>
                  <span class="is-success"> {{ user.best ? user.best.acc : '0' }}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="nes-container col-12 is-white text-dark with-title bg-white mb-3">
      <p class="title"> Best score</p>
      <div class="row no-gutters"  v-if="bests.length > 0">
        <div class="col-xs-12 col-md-4" v-for="game in bests" :key="game.acc"> 
          <div class="nes-container is-rounded is-dark m-auto text-center">
            <p class="p-0 m-0">
              <a class="nes-btn text__small" data-bs-toggle="collapse" :href="`#${game.difficulty}`" role="button" aria-expanded="false" aria-controls="collapseExample">
                <img src="@/assets/sword.png" style="margin-right:2px; margin-top:-5px;">{{ game.difficulty }} difficulty
              </a>
            </p>
            <div class="collapse text-start mt-3" :id="game.difficulty">
              <div class="card card-body">
                <ul class="nes-list text-dark text__small">
                <li>Words Per Minute: <b>{{ game.wpm }}</b></li>
                <li>Accuracy: <b>{{ game.acc }}</b></li>
                <li>Difficulty:  <b>{{ game.difficulty }}</b></li>
                <li>Date:  <b>{{ toDate(game.date.seconds) }}</b></li>
              </ul>
                </div>
            </div>
          </div>
        </div>
      </div>
       <div class="row no-gutters"  v-else>
        <div class="col-12"> 
          Nohting to show yet.
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { getBestUserGameByDiff } from '@/functions/gameHistory';
import { updateUserDisplayName } from '@/functions/user';
import { toDate } from '@/functions/utility';

export default {
  name: 'UserProfile',
  props: {
    user: {
      type: Object,
    },
  },
  data() {
    return {
      bests: [],
      uploaded: false,
    };
  },
  async mounted() {
    if (this.$props.user.uid) {
      try {
        const uid = this.$props.user.uid;
        if (uid) {
          for (const difficulty of Object.keys(this.$store.getters.getDifficulities)) {
            const game = await getBestUserGameByDiff(uid, difficulty);
            if (game) {
              this.bests.push(game);
            }
          }
        }

        this.userDisplayName = this.$props.user.displayName;
      } catch (error) {
        console.log(error);
      }
    }
  },
  async updated() {
    if (this.bests.length == 0) {
      try {
        const uid = this.$props.user.uid;
        if (uid) {
          for (const difficulty of Object.keys(this.$store.getters.getDifficulities)) {
            const game = await getBestUserGameByDiff(uid, difficulty);
            if (game) {
              this.bests.push(game);
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  },
  computed: {
    isAuthUser() {
      return this.$props.user.uid == this.$store.getters.getAuthUser.uid;
    },
    userDisplayName() {
      return this.$props.user.uid == this.$store.getters.getAuthUser.uid ? this.$store.getters.getAuthUser.displayName : this.$props.user.displayName;
    },
    userAuth() {
      return this.$store.getters.getAuthUser;
    },
    percent() {
      const xp = this.$props.user.xp;
      if (xp) {
        const stringXp = xp.toString();
        const fourDigits = stringXp.length > 3 ? stringXp.substring(0, 3) : stringXp.substring(0, stringXp.length);
        const xpPercent = Number(fourDigits) / 10;
        return xpPercent;
      }
    },
    rankUrl(){
        return require(`@/assets/gameAssets/ranks/rank_${this.$props.user.rank.toLowerCase().split(' ').join('_')}.png`);
    },
  },
  methods: {
    
    toDate(seconds) {
      return toDate(seconds);
    },
    async updateDisplayName() {
      if (this.isAuthUser) {
        const displayNameValueSelector = document.querySelector('#name_field');
        const displayNameValue = displayNameValueSelector.value;
        if (displayNameValue !== this.userDisplayName) {
          try {
            await updateUserDisplayName(displayNameValue);
            this.uploaded = true;
            setTimeout(() => {
              this.uploaded = false;
            }, 1500);
          } catch (error) {
            console.log(error);
          }
        }
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '~@/scss/components/user_profile.scss';
</style>
