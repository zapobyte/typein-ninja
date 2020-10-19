<template>
  <div class="nes-container col-12 is-white bg-light text-dark with-title  p-3">
    <p class="title  bg-light">Stats</p>
    <div class="row  align-items-center">
      <div class="col-auto align-self-start">
        <img class="nes-avatar is-large" alt="Gravatar image example" :src="user.photoURL"  style="image-rendering: pixelated;">
        </div>
        <div class="col">
            <div class="row align-items-start">
                <div class="col-12 ">
                    <div class="row no-gutters ">
                        <div class="text-left col-xs-12 col-md-6">
                            <p class="text-left ml-auto">
                                {{ user ? user.displayName : '' }}
                            </p>
                            <p class="text-left ml-auto">
                                <i class="nes-icon  star"></i> LVL {{ user ? user.lvl : '' }}
                            </p>
                            <progress class="progress--bar" :value="percent" max="100"></progress>
                        </div>
                        <div class="text-right col-xs-12 col-md-6">
                            <i class="nes-icon trophy "></i>
                            <a href="#" class="nes-badge  is-small is-splited mr-3">
                                <span class="is-dark ">wpm</span>
                                <span class="is-success">  {{user.wpm}}</span>
                            </a>
                            <i class="nes-icon trophy "></i>
                            <a href="#" class="nes-badge  is-small is-splited">
                                <span class="is-dark ">acc</span>
                                <span class="is-success">  {{user.acc}}</span>
                            </a>
                        </div>
                    </div>
                </div>   
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import store from '@/store/index';

export default {
    name: 'UserProfile',
    props:{
        user: {
            type:Object
        }
    },
    data(){
        return {}
    },  
    computed:{
        percent(){
   /*          const xp = this.$props.user.xp;
            if(xp){
                const stringXp = xp.toString();
                const fourDigits =  stringXp.length >3 ? stringXp.substring(0,3) :stringXp.substring(0,stringXp.length);
                const xpPercent = Number(fourDigits) / 10;
                return xpPercent;
            }
            */
        }
    }
}
</script>   

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.user{
    &-avatar{
        max-width:48px;
        max-height:48px;
    }
}
.progress--bar{
    width:100%;
    height:3px;
    color:#222;
    background-color:#222;
}

</style>
