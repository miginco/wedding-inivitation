<template>

  <div style="margin-right: 34px; margin-top: 4px" @click="onClicked">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" class="menu-icon-svg">
        <circle
            id='bottom-circle' cx="29.386" cy="29.386" r="2.614"
            :class="{'opened-fill': menuOpened, 'closed-fill': !menuOpened}"
        />

        <circle
            id='top-circle'
            cx="2.614" cy="2.614" r="2.114" fill="none"
            :class="{'opened-stroke': menuOpened, 'closed-stroke': !menuOpened}"
            />

        <g stroke-linecap="round"
           :class="{'opened-stroke': menuOpened, 'closed-stroke': !menuOpened}"
         >
          <g id="top-line" :class="{'opened-line': menuOpened, 'closed-line': !menuOpened}">
            <line x1="7.842" x2="29.386" y1="2.614" y2="2.614" />
          </g>
          <g id="bot-line" :class="{'opened-line': menuOpened, 'closed-line': !menuOpened}">
            <line x1="2.614" x2="24.158" y1="29.386" y2="29.386" />
          </g>
          <g
            id="mid-line"
           :class="{
            'opened-line': menuOpened, 'closed-line': !menuOpened,
            'show': !menuOpened, 'hidden': menuOpened
            }"
          >
            <line x1="8" x2="24" y1="16" y2="16" />
          </g>
        </g>
      </svg>
  </div>

</template>

<script setup lang="ts">
import {computed, defineEmits, defineProps, inject, ref, Ref} from "vue";

const emit = defineEmits(['click'])
const menuOpened = inject<Ref<Boolean>>('menuOpened')

const color = computed(() => {
  let ret = '#001b43'
  if(menuOpened !== undefined){
    if (menuOpened.value){ ret = '#f7f7f5' }
  }
  return ret
})

const onClicked = () => {
  emit('click')
}

</script>

<style scoped lang="scss">
@import "src/assets/scss/variables.scss";

#top-line  {
  transform-origin: 2.614px 2.614px;
}

#mid-line {
  transform-origin: 16px 16px;
}

#bot-line {
  transform-origin: 29.386px 29.386px;
}

.opened-line {
  transform:rotate(45deg) scale(1.16);
  transition: $sidebar-transition-duration;
}

.closed-line {
  transform:rotate(0deg) scale(1);
  transition: $sidebar-transition-duration;
}

.opened-stroke {
  stroke: $color-cream;
  transition: $sidebar-transition-duration;
}

.closed-stroke {
  stroke: $color-navy;
  transition: $sidebar-transition-duration;
}

.opened-fill {
  fill: $color-cream;
  transition: $sidebar-transition-duration;
}

.closed-fill {
  fill: $color-navy;
  transition: $sidebar-transition-duration;
}

.show {
  opacity: 1;
  transition: $sidebar-transition-duration;
}

.hidden {
  opacity: 0;
  transition: $sidebar-transition-duration;
}




</style>
