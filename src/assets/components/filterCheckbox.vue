<template>
  <span class="checkbox">
    <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" :viewBox="'0 0 '+size+' '+size">
      <circle class="outer-line" :cx="size/2" :cy="size/2" r="7" stroke="rgb(0, 27, 67)" stroke-width="1"/>
      <circle class="outer-line-fx" :cx="size/2" :cy="size/2" r="1" stroke="rgba(0, 27, 67, 0)"
              :class="{
        'checkbox-checked-outer':props.checked,
        'checkbox-empty-outer':!props.checked
      }"
      />
      <circle class="inner-line" :cx="size/2" :cy="size/2" r="4" stroke="rgb(0, 27, 67)" stroke-width="3"
              :class="{
        'checkbox-checked-inner':props.checked,
        'checkbox-empty-inner':!props.checked
      }"
      />
    </svg>
  </span>
</template>

<script setup lang="ts">
import {computed, defineProps, ref} from 'vue'

interface Props {
  checked: boolean
  size?: number
}

const size = computed(()=>{
  return props.size
})

const props = withDefaults(defineProps<Props>(), {checked: false, size:17})
const a = ref(null)

</script>

<style scoped lang="scss">
@import "src/assets/scss/variables.scss";

.checkbox {
}

circle.outer-line-fx {
  animation-duration: 200ms;
  stroke-width: 0;
  fill: rgba(0,0,0,0);
}

circle.inner-line {
  stroke-width: 0;
  fill: rgba(0, 0, 0, 0);
  animation-duration: 200ms;
}

circle.checkbox-checked-inner {
  animation-name: toCheckedInner;
  fill: rgba($color-navy, 1);
}

circle.checkbox-empty-inner {
  animation-name: fromCheckedInner;
}


@keyframes toCheckedInner {
  from {
    fill: rgba($color-navy, 0);
     }
  to {
    fill: rgba($color-navy, 1);
    }

}

@keyframes fromCheckedInner {
  from {
    fill: rgba($color-navy, 1);
    }
  to {
    fill: rgba($color-navy, 0);
    }

}

circle.checkbox-checked-outer {
  animation-name: toCheckedOuter;
}

circle.checkbox-empty-outer {
  animation-name: fromCheckedOuter;
}


@keyframes toCheckedOuter {
  from {
    stroke: rgba($color-navy, 1);
    stroke-width: 0;
  }
  to {
    stroke: rgba($color-navy, 0);
    stroke-width: 8px;
  }

}

@keyframes fromCheckedOuter {
  from {
    stroke: rgba($color-navy, 1);
    stroke-width: 5px;
  }
  to {
    stroke: rgba($color-navy, 0);
    stroke-width: 0;
  }

}




.outer-line {
  fill: rgba(0, 0, 0, 0);
}

</style>
