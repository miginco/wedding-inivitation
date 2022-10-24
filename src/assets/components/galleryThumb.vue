<script setup lang="ts">
import {galleryItem} from '/src/typing/thunbType'
import {computed, defineEmits, defineProps, ref} from 'vue'


interface Props {
  items: galleryItem[]
}
const props = defineProps<Props>()

interface Emits {
  (e: 'click', item: galleryItem): void
}
const emits = defineEmits<Emits>()

const openImage = (item: galleryItem) => {
    emits('click', item)
}

</script>

<template>
  <div v-for="item in items" :key="item">
    <div class="img-box">
      <img class="thumbnail-img" :src="item.thumbnail" :alt="item.title" @click="openImage(item)"/>
    </div>
  </div>
</template>


<style scoped lang="scss">
@import "src/assets/scss/variables.scss";

$distance: 20px;
$size: $thumb-distance - $distance;

.img-box {
  width: $thumb-distance;
  height: $thumb-distance;
}

.thumbnail-img {
  width: $size;
  height: $size;

}


</style>
