<template>
    <footer class=" pr-2 pl-2 pb-2 w-100">
       <div class="row align-items-end">
            <div class="footer col-12"></div>
           <div class="col-12 text-right">
            <a href="https://www.buymeacoffee.com/zapobyte" target="_blank">
            buy me a coffee</a>  <p class="copywrite m-0 d-inline-block"> <i class="far fa-copyright"></i> typein.ninja</p>
           </div>
       </div>
 
      </footer>
</template>

<script>
export default {
    name:'BottomFooter'
}
</script>
<style lang="scss" scoped>
.copywrite{
    font-size:0.8rem !important;
}
.footer{
    height:32px;
    background-image:url('~@/assets/tileborder.png');
    background-position: top;
    background-size:contain;
    background-repeat: repeat-x ;
}
</style>