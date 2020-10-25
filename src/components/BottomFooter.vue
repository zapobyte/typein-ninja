<template>
    <footer class="col-12 pb-2 pt-2 align-self-end text-center footer">
            <div class="col-12 text-center pb-1" title="github">
                <a class="text-text-center mr-3" href="https://github.com/zapobyte/typein-ninja">
                    <small>
                        <i class="nes-icon is-normal github"></i>
                    </small>
                </a>
                <a class="text-text-center  mr-3" href="https://twitter.com/zapobyte" title="twitter">
                    <small>
                    <i class="nes-icon twitter is-normal"></i>
                    </small>
                </a> 
                <a href="https://ko-fi.com/zapobyte" class="coinJump" target="_blank" title="buy me a coffee">
                    <i class="nes-icon coin is-normal mr-1"></i>
                </a>
            </div>
            <div class=" col-12 text-center">
                 <small style="padding-right:0.5rem">&copy;</small><a href="https://typein.ninja" class="text-right w-100"><small>typein.ninja
                </small></a>
            </div>
    </footer>
</template>

<script>
export default {
    name:'BottomFooter'
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
.is-normal{
    transform: scale(1.3) !important;
    margin-bottom:6px;
}
</style>