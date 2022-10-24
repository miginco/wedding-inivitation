/* eslint-disable */
<template>
  <div class="main">
    <header class="header">
      <a href="/#top">
        <img src="./svgs/logo.svg"
             alt="logo"
             style="margin-left: 34px"
        />
      </a>
      <menu-icon @click="menuOpened=!menuOpened"/>
    </header>
    <div>
      <transition>
        <div
            class="side-menu"
            v-show="menuOpened"
        >
          <ul class="menu-list">
            <li v-for="(item, i) in menus" :key="i" class="menu-item" >
              <a :href="item.href" @click="menuOpened=!menuOpened"> {{item.title}} </a>
            </li>
          </ul>
          <button
              @click="signOut"
              class="menu-list"
              style="
                  background-color: rgba(0, 0, 0, 0);
                  border: 2px solid rgb(247, 247, 245);
                  font-size: 13px;
                  margin-top: 30px;
                  padding: 5px 15px;
                  border-radius: 50px;
                  color: rgb(247, 247, 245);
                ">
            Sign Out
          </button>
        </div>
      </transition>

      <router-view />

      <div style="text-align: right; margin: 0 30px 20px 30px">
        <a href="#"><img src="./svgs/go_up.svg"  alt="let's have a good time!"/></a>
      </div>

      <div style="text-align: center; font-size: 10px; margin-bottom: 30px; margin-top: 60px">
        Copyright 2022 / SAITO WEDDING PARTY PROJECT
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import {provide, ref} from 'vue'
import MenuIcon from './assets/components/MenuIcon.vue'
import {menus} from './menus'
import {useAuthenticator} from '@aws-amplify/ui-vue'

const menuOpened = ref(false)
provide('menuOpened', menuOpened)

const position = ref(0)


document.onscroll = () => {
    position.value = document.documentElement.scrollTop || document.body.scrollTop
}

const auth = useAuthenticator()
const signOut = () => {
    auth.signOut()
}

</script>

<style scoped>
/*@import "src/assets/scss/variables.scss";*/

.main {
  background-image: url("./svgs/bg_top.svg");
  margin-top: 0;
  margin-bottom: 0;
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: top;
}

.header {
  display: flex;
  z-index: 99999;
  justify-content: space-between;
  position: fixed; /* ヘッダーを固定する */
  top: 0; /* 上部から配置の基準位置を決める */
  left: 0; /* 左から配置の基準位置を決める */
  width: 100%; /* ヘッダーの横幅を指定する */
  height: 30px; /* ヘッダーの高さを指定する */
  margin-top: 30px;
  }

.side-menu {
  background-image: url("./svgs/bg_top.svg");
  background-size: auto;
  background-repeat: no-repeat;
  background-color:  rgb(0, 27, 67);
  background-position-x: center;
  background-position-y: top;

  margin: 0;
  padding-top: 87px;
  height: 100%;
  width: 100%;
  position: fixed; /* ヘッダーを固定する */
  top: 0; /* 上部から配置の基準位置を決める */
  left: 0; /* 左から配置の基準位置を決める */
  color: rgb(247, 247, 245);
  text-align: center;
  font-size: 24px;
}

.menu-list {
  list-style: none;
  padding-left: 0;
}

.menu-item {
  margin: 49px auto;
  color: rgb(247, 247, 245);

}

.v-enter-active, .v-leave-active {
  transition: opacity 500ms ease;
}

.v-enter-from, .v-leave-to {
  opacity: 0;
}

</style>
