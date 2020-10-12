<template>
    <footer class="pr-3 pl-3 pb-3 w-100 fixed-bottom">
        <div class="footer--tile">
            <div class="footer--tile__mid-tile"></div>
        </div>
        <section class="container text-right">
            <a href="https://ko-fi.com/zapobyte" class="coinJump" target="_blank">
            <i class="nes-icon coin is-small mr-1"></i>
            <small>buy me a coffee</small>
            </a>
            <span class="copywrite m-0 "> &copy;
                <a href="https://typein.ninja">typein.ninja</a>
            </span>
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
.copywrite{
    font-size:0.8rem !important;
}
.fixed-bottom{
    @media screen and (max-width:960px){
        position:relative !important;
    }
}
.footer--tile{
    &__mid-tile{
        height:32px;
        width:100%;
        background-image:url('~@/assets/tileborder.png');
        background-position: top;
        background-size:contain;
        background-repeat: repeat-x;
    }
}
</style>