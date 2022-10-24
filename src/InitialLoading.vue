<template>
  <div class="fullview">
    <div class="loading-spacer">
      Now Loading....
    </div>
  </div>

</template>

<script setup lang="ts">
const hoge = 0

</script>

<style scoped lang="scss">
@import "src/assets/scss/variables.scss";

.fullview {
  width: 100%;
  height: 100%;
  background: $color-cream;
  position: fixed;
  top: 0;
  left: 0;
}

.loading-spacer{
  height: 30%;
  text-align: center;
}
</style>
