<template>
    <footer class="w-100 footer">
        <section class="container footer--content text-right">
            <a href="https://ko-fi.com/zapobyte" class="coinJump" target="_blank">
            <i class="nes-icon coin is-small mr-1"></i>
            <small>buy me a coffee</small>
            </a>
            <small class="copywrite m-0 "> &copy;
                <a href="https://typein.ninja">typein.ninja</a>
            </small>
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

.footer{
    position:absolute;
    bottom:0;
    width:100%;
    height:92px;
    background-image:url('~@/assets/bottom.png');
    background-position: bottom;
    background-size:100% 100%;
    background-repeat: no-repeat;
    &--content{
        padding-top:40px;
        padding-right:15px;
    }
}
</style>