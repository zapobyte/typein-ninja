<template>
  <section>
    <dialog class="nes-dialog" id="dialog">
      <form method="dialog">
        <p class="title">
          <slot name="title"></slot>
        </p>
        <p>
          <slot name="body"></slot>
        </p>
        <menu class="dialog-menu m-0 p-0">
          <button class="nes-btn mr-4" @click="$emit('close')">Cancel</button>
          <button class="nes-btn is-primary ml-4 is-error" @click="$emit('confirm')">Confirm</button>
        </menu>
      </form>
    </dialog>
  </section>
</template>
<script>
export default {
  name: 'Dialog',
};
</script>
<style lang="scss" scoped>
@import '~@/scss/components/dialog.scss';
</style>
