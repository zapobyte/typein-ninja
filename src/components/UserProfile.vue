<template>
<section>
  <div class="nes-container col-12 is-white text-dark with-title bg-white mb-3">
    <p class="title ">Profile</p>
    <div class="row  align-items-center">
      <div class="col-auto align-self-start">
        <img class="nes-avatar is-large" alt="Gravatar image example" :src="user.photoURL" style="image-rendering: pixelated;">
        </div>
        <div class="col">
            <div class="row align-items-start">
                <div class="col-12 ">
                    <div class="row no-gutters ">
                        <div class="text-left col-xs-12 col-md-6">
                            <div class="row align-items-center">
                                <div class="col-8">
                                    <input type="text" id="name_field" :class="uploaded ? 'text__small  nes-input is-success':'text__small  nes-input'"  :value="userDisplayName" @blur="updateDisplayName" :disabled="!isAuthUser"/></div>
                                <div class="col-4 text-right"><i class="nes-icon is-small star"></i> LVL {{ user ? user.lvl : '' }}
                                </div>
                            <div class="col-12 pt-2">
                                <div class="progress" v-if="user.uid == this.userAuth.uid">
                                    <div class="progress-bar" role="progressbar" :style="'width:' + percent + '%'" aria-valuenow="percent" :aria-valuemin="percent" aria-valuemax="100" >{{percent}}%</div>
                                </div>
                            </div>
                        </div>   
                        </div>
                        <div class="text-right col-xs-12 col-md-6" title="best score">
                            <i class="nes-icon trophy"></i>
                            <a href="#" class="nes-badge  is-small is-splited mr-3">
                                <span class="is-dark ">wpm</span>
                                <span class="is-success">{{user.best ? user.best.wpm : '0'}}</span>
                            </a>
                            <i class="nes-icon trophy"></i>
                            <a href="#" class="nes-badge  is-small is-splited mr-3">
                                <span class="is-dark ">acc</span>
                                <span class="is-success">   {{user.best ? user.best.acc : '0'}}</span>
                            </a>
                        </div>
                    </div>
                </div>   
            </div>
        </div>
    </div>
  </div>

  <div class="nes-container col-12 is-white text-dark with-title bg-white mb-3">
    <p class="title ">Best score</p>
    <div class="row">
        <div class="col-xs-12 col-md-4" v-for="game in bests" :key="game.acc">
            <details>
                <summary class="position-relative">{{game.difficulty}}</summary>
                <div class="nes-container is-rounded is-dark">
                    <ul class="nes-list is-circle">
                        <li>WPM: {{game.wpm}} </li>
                        <li>Accuracy: {{game.acc}} </li>
                        <li>Difficulty: {{game.difficulty}} </li>
                        <li>Date: {{toDate(game.date.seconds)}} </li>
                    </ul>
                </div>
            </details>
        </div>
    </div>
  </div>
</section>
</template>

<script>
import store from '@/store/index';
import {getBestUserGameByDiff} from '@/functions/gameHistory';
import {updateUserDisplayName} from '@/functions/user';
import {
    toDate
} from '@/functions/utility';

export default {
    name: 'UserProfile',
    props:{
        user: {
            type:Object
        }
    },
    data(){
        return {
            bests:[],
            uploaded:false,
        }
    },  
    async mounted(){
        if(this.$props.user.uid){
            try {
            const uid = this.$props.user.uid;
            if(uid){
                for(const difficulty of Object.keys(this.$store.getters.getDifficulities)){
                    const game = await getBestUserGameByDiff(uid,difficulty);
                    if(game){
                        this.bests.push(game)
                    }
                }
            }

            this.userDisplayName = this.$props.user.displayName;
            } catch (error) {
                console.log(error)
            }
        }
        
    },
    async updated(){
        if(this.bests.length == 0){
            try {
                const uid = this.$props.user.uid;
                if(uid){
                    for(const difficulty of Object.keys(this.$store.getters.getDifficulities)){
                        const game = await getBestUserGameByDiff(uid,difficulty);
                        if(game){
                            this.bests.push(game)
                        }
                    }
                }
                
            } catch (error) {
                console.log(error);
            }
        }
    },
    computed:{
        isAuthUser(){
            return this.$props.user.uid == this.$store.getters.getAuthUser.uid;
        },
        userDisplayName(){
            return this.$props.user.uid == this.$store.getters.getAuthUser.uid ? this.$store.getters.getAuthUser.displayName : this.$props.user.displayName;
        },
        userAuth(){
            return this.$store.getters.getAuthUser;
        },
        percent(){
         const xp = this.$props.user.xp;
            if(xp){
                const stringXp = xp.toString();
                const fourDigits =  stringXp.length >3 ? stringXp.substring(0,3) :stringXp.substring(0,stringXp.length);
                const xpPercent = Number(fourDigits) / 10;
                return xpPercent;
            }
        }
    },
    methods:{
        toDate(seconds){
            return toDate(seconds);
        },
        async updateDisplayName(){
            if(this.isAuthUser){
                const displayNameValueSelector = document.querySelector('#name_field');
                const displayNameValue = displayNameValueSelector.value;
                if(displayNameValue !== this.userDisplayName){
                    try {
                        await updateUserDisplayName(displayNameValue);
                        this.uploaded = true;
                        setTimeout(()=>{
                            this.uploaded = false;
                        },1500)
                    } catch (error) {
                        console.log(error)
                    }
                } 
            }
        }
    }
}
</script>   

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '~@/scss/components/user_profile.scss';
</style>
