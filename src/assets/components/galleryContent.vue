
<script setup lang="ts">
import {defineProps, provide, ref, watchEffect} from 'vue'
import imageLists from './imageList.json'
import {galleryItem} from '/src/typing/thunbType'
import GalleryThumb from '/src/assets/components/galleryThumb.vue'
import GalleryModal from '/src/assets/components/galleryModal.vue'

interface Props {
  switch?: number
}

const props = withDefaults(defineProps<Props>(), {switch:0})

const imgstaro:galleryItem[] = imageLists.imgstaro
const imgshanako:galleryItem[] = imageLists.imgshanako
const imgsAll:galleryItem[] = imageLists.imgsBoth.concat(imgshanako).concat(imgstaro).sort()


const imgList = ref<galleryItem[]>([])

const currImage = ref<galleryItem|undefined>(undefined)
provide('currImage', currImage)

const isOpened = ref(false)
// const currIdx = ref(0)

watchEffect(()=>{
    switch (props.switch) {
    case 0:
        imgList.value = imgsAll.sort()
        break
    case 1:
        imgList.value = imgstaro.sort()
        break
    default:
        imgList.value = imgshanako.sort()
        break
    }
})

const noScroll = (e: Event) => { e.preventDefault() }

const openImage = (item: galleryItem) => {
    // document.addEventListener('touchmove', noScroll, {passive: false})
    // document.addEventListener('mousewheel', noScroll, {passive: false})
    currImage.value = item
    isOpened.value = true
}

const closeImage = () => {
    // document.removeEventListener('touchmove', noScroll, {passive: false})
    // document.removeEventListener('mousewheel', noScroll, {passive: false})
    currImage.value = undefined
    isOpened.value = false
}

// const OnTouchStart = (e) => {
//     console.log(e)
// }
// const OnTouchMove = () => {}
// const OnTouchEnd = () => {}
//
// const currSrc = computed(() => {
//     return imgList[currIdx.value].src
// })
//
// const currAlt = computed(() => {
//     return imgList[currIdx.value].title
// })


</script>
<template>
  <div>
    <transition-group name="opacity">

      <div class="container" v-show="props.switch===0" key="0">
        <gallery-thumb :items="imgsAll"  @click="openImage"/>
      </div>

      <div class="container" v-show="props.switch===1" key="1" >
        <gallery-thumb :items="imgstaro"  @click="openImage"/>
      </div>
      <div  class="container" v-show="props.switch===2" key="2"  >
        <gallery-thumb :items="imgshanako" @click="openImage"/>
      </div>

      <div class="modal" v-show="isOpened" key="3" @click="isOpened=false">
        <gallery-modal @close="closeImage"/>
      </div>

    </transition-group>
  </div>
</template>

<style scoped lang="scss">

@import "src/assets/scss/variables.scss";

.opacity-enter{
  opacity: 0;
}

.opacity-enter-to {
  opacity: 1;
}

.opacity-leave {
  opacity: 1;
}

.opacity-leave-to {
  opacity: 0;
}

.opacity-enter-active, .opacity-leave-active {
  opacity: 0;
}

.modal {
  transition: opacity 300ms;
}


.container {
  transition: opacity 350ms;
  left: 50%;
  display: grid;
  place-content: center;
  grid-template-columns: $thumb-distance $thumb-distance;
}


</style>
