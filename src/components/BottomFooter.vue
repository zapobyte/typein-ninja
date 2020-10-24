<template>
    <footer class="col-12 align-self-end text-center footer">
        <a href="https://ko-fi.com/zapobyte" class="coinJump" target="_blank">
            <i class="nes-icon coin is-small mr-1"></i>
            <small>buy me a coffee</small>
        </a>
        <a class="text-text-center pl-2" href="https://github.com/zapobyte/typein-ninja">
            <small><i class="nes-icon is-small mr-1 github"></i>github</small>
        </a>
        <p>
            <small>&copy;</small><a href="https://typein.ninja" class="text-right w-100 pl-1"><small>typein.ninja
            </small></a>
        </p>
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
    width:100%;
}
</style>