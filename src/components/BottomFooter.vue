<template>
  <footer class="col-12 pb-2 pt-2 align-self-end text-center footer">
    <div class="col-12 text-center pb-1" title="github">
      <a class="text-text-center mr-3" href="https://github.com/zapobyte/typein-ninja">
        <small>
          <i class="nes-icon is-normal github"></i>
        </small>
      </a>
      <a class="text-text-center mr-3" href="https://twitter.com/zapobyte" title="twitter">
        <small>
          <i class="nes-icon twitter is-normal"></i>
        </small>
      </a>
      <a href="https://ko-fi.com/zapobyte" class="coinJump" target="_blank" title="buy me a coffee">
        <i class="nes-icon coin is-normal mr-1"></i>
      </a>
    </div>
    <div class="col-12 text-center">
      <small style="padding-right: 0.5rem">&copy;</small><a href="https://typein.ninja" class="text-right w-100"><small>typein.ninja </small></a>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'BottomFooter',
};
</script>

<style lang="scss" scoped>
@import '~@/scss/components/bottom_footer.scss';
</style>
