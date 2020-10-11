<template>
    <footer class=" pr-3 pl-3 pb-3 w-100 fixed-bottom">
        <div class="row align-items-end">
            <div class="footer">
                <div class="left-tile">
                </div>
                <div class="mid-tile">
                </div>
                <div class="right-tile">
                </div>
            </div>
            <div class="col-12 text-right">
                <section class="container">

                <a href="https://www.buymeacoffee.com/zapobyte" target="_blank">
                <i class="nes-icon coin is-small mr-1"></i><small>buy me a coffee</small></a>  <span class="copywrite m-0 "> &copy;<a href="https://typein.ninja">typein.ninja</a></span>
                </section>
            </div>
        </div>
    </footer>
</template>

<script>

export default {
    name:'BottomFooter',
   
}
</script>
<style lang="scss" scoped>

.copywrite{
    font-size:0.8rem !important;
}
.fixed-bottom{
    @media screen and (max-width:960px){
        position:relative !important;
    }
}
.footer{
   
    & .mid-tile{
        height:32px;
        width:100%;
        background-image:url('~@/assets/tileborder.png');
        background-position: top;
        background-size:contain;
        background-repeat: repeat-x;
    }

}
</style>