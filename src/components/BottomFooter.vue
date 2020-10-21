<template>
    <footer class="w-100 footer">
        <section class="container footer--content mb-3 text-right">
            <a href="https://ko-fi.com/zapobyte" class="coinJump" target="_blank">
            <i class="nes-icon coin is-small mr-1"></i>
                <small>buy me a coffee</small>
            </a>
            <small class="copywrite m-0 "> &copy;<a href="https://typein.ninja" class="text-white pl-1">typein.ninja</a>
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
    &--content{
        padding-top:40px;
        padding-right:15px;
    }
}
</style>