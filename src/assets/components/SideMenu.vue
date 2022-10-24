<template>
  <div :class="{'menu-opened': menuOpened, 'menu-closed': !menuOpened}" >
    <header class="header">
      <menu-icon :open="menuOpened" @click="onClicked"/>
    </header>
    <div class="side-menu">
      <ul>
        <li v-for="(item, i) in menus" :key="i" class="menu-item" >
          <a :href="item.path" @click="menuOpened=!menuOpened"> {{item.label}} </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import MenuIcon from '@/assets/components/MenuIcon.vue'
import {defineEmits, defineProps, inject, watchEffect} from 'vue'

const menuOpened = inject<Boolean>('menuOpened')

const emit = defineEmits(['click'])

const onClicked = () => {
    emit('click')
}

const menus = [
    {
        label: 'TOP',
        path: '/#top'
    },
    {
        label: 'EVENTS',
        path: '/#events'
    },
    {
        label: 'ATTENDANCE',
        path: '/attendance'
    },
    {
        label: 'GALLERY',
        path: '/gallery'
    },
    {
        label: 'PROFILE',
        path: '/#profile'
    },
]


</script>

<style scoped lang="scss">
@import "@/assets/scss/variables.scss";

.side-menu {
  background-image: $index-bg-image;
  margin: 0;
  background-color: $color-navy;
  height: 5000px;
  width: 100%;
  position: fixed; /* ヘッダーを固定する */
  top: 0; /* 上部から配置の基準位置を決める */
  left: 0; /* 左から配置の基準位置を決める */
}

.menu-item {
  margin: 20px auto;
}

.header {
  display: flex;
  justify-content: space-between;
  position: fixed; /* ヘッダーを固定する */
  top: 0; /* 上部から配置の基準位置を決める */
  left: 0; /* 左から配置の基準位置を決める */
  width: 100%; /* ヘッダーの横幅を指定する */
  height: 30px; /* ヘッダーの高さを指定する */
  margin-top: 30px;
}

.menu-opened {
  opacity: 1;
  transition: $sidebar-transition-duration cubic-bezier(1, 0, 0, 1);
}

.menu-closed {
  opacity: 0;
  transition: $sidebar-transition-duration cubic-bezier(1, 0, 0, 1);
}

</style>
