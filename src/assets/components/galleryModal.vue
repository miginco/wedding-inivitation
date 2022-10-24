<script setup lang="ts">
import {computed, ComputedRef, inject, InjectionKey} from 'vue'
import {galleryItem} from '/src/typing/thunbType'

const currImage = inject<InjectionKey<galleryItem>|undefined>('currImage')
const currSrc: ComputedRef<string> = computed(()=>{
    let ret = ''
    if (currImage !== undefined){
        ret = currImage.value.src
    }
    return ret
})

const currAlt: ComputedRef<string> = computed(()=>{
    let ret = ''
    if (currImage !== undefined){
        ret = currImage.value.title
    }
    return ret
})

const emits = defineEmits<{
  (e: 'next'): void
  (e: 'prev'): void
  (e: 'close'): void
}>()

const closeClicked = () => {
    emits('close')
}

</script>

<template>
<div>
  <div id="overlay" v-if="currImage!==undefined">
    <div class="overlay-image">
      <img id="image-large" :src="currSrc" :alt="currAlt" />
    </div>
<!--    <div class="overlay-image">-->
<!--                    <img class="paging-btn" src="/src/svgs/back_btn.svg" alt="btn" @click="currIdx&#45;&#45;"/>-->
<!--                    <img class="paging-btn" src="/src/svgs/next_btn.svg" alt="btn" @click="currIdx++"/>-->
<!--    </div>-->

    <div class="close-btn" @click="closeClicked">
      <img id="close-icon" src="/src/svgs/close_btn.svg" alt="btn" />
    </div>
  </div>
</div>

</template>

<style scoped lang="scss">
@import "src/assets/scss/variables.scss";


.close-btn {
  margin-top: 64px;
}

.paging-btn {
  width: 32px;
  height: 32px;
}

#image-large {
  display: inline;
  height: auto;
  width: 90%;
}

.overlay-image{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

#close-icon {
  position: absolute;
  right: 15px;
  bottom: 15px;
  width: 32px;
  height: 32px;
}

#overlay {
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color:rgba($color-cream, 0.8);
}

</style>
