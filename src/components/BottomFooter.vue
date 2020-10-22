<template>
    <footer class="w-100 footer">
        <section class="container footer--content  mb-2 text-center">
            <a href="https://ko-fi.com/zapobyte" class="coinJump" target="_blank">
            <i class="nes-icon coin is-small mr-1"></i>
                <small>buy me a coffee</small>
            </a>
            <small><a class="text-text-center pl-2" href="https://github.com/zapobyte/typein-ninja">
                <i class="nes-icon is-small mr-1 github"></i>github
            </a></small>
            <p class="m-0 p-0"><small> &copy;<a href="https://typein.ninja" class=" pl-1">typein.ninja</a>
            </small></p>
        </section>
    </footer>
</template>

<script>

export default {
    name:'BottomFooter',
   
}
</script>
<style lang="scss" scoped>
@keyframes coinJump {
    0%   {bottom:0px;}
    50%  {bottom:5px;}
    100% { bottom:0px;}
}
.coinJump:hover > i{
    animation-name: coinJump;
    position: relative;
    animation-duration: 0.5s;
}

a{
    color:white;
    &:hover{
        color:#c1c1c1;
    }
}
.footer{
    position:absolute;
    bottom:0;
    width:100%;
    &--content{
        padding-top:40px;
        padding-right:15px;
    }
}
</style>