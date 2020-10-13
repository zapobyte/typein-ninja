<template>
  <div class="nes-container col-xs-12 col-lg-6 is-white bg-light text-dark with-title  p-3">
    <p class="title  bg-light">Stats</p>
    <div class="row  align-items-center">
      <div class="col-auto align-self-start">
        <img class="nes-avatar is-large" alt="Gravatar image example" :src="user.photoURL"  style="image-rendering: pixelated;">
        </div>
        <div class="col">
            <div class="row align-items-start">
                <div class="col-12 ">
                    <div class="row no-gutters">
                        <p class="text-left m-0 col-xs-12 col-auto">{{ user.displayName }}</p>
                         <p class="text-right m-0 col-xs-12 col-auto ml-auto"> LVL {{ user.lvl }}</p>
                    </div>
                </div>
                <div class="col-12">
                    <progress class="progress--bar" :value="percent" max="100"></progress>
                </div>
                <div class="col-auto text-right mt-3">
                <p class="m-0">
                    <a href="#" class="nes-badge  is-small is-splited mr-3">
                        <span class="is-dark ">wpm</span>
                        <span class="is-success">  {{best.wpm}}</span>
                    </a>
    
                    <a href="#" class="nes-badge  is-small is-splited">
                        <span class="is-dark ">acc</span>
                        <span class="is-success">  {{best.acc}}</span>
                    </a>
                </p>
                </div>
            </div>
    
        </div>
    </div>
  </div>
</template>

<script>

export default {
    name: 'UserProfile',
    props:{
        user: Object,
        best: Object
    },
    data(){
        return {
        }
    },
    async mounted(){

    },
    computed:{
        percent(){
            const xp = this.$props.user.xp;
            const stringXp = xp.toString();
            const fourDigits =  stringXp.length >3 ? stringXp.substring(0,3) :stringXp.substring(0,stringXp.length);
            const xpPercent = Number(fourDigits) / 10;
            return xpPercent;
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
