<template>
  <div id="app">
    <transition-group
        name="fade"
        enter-active-class="fade-enter-active"
        enter-class="fade-enter"
        enter-to-class="fade-enter-to"
        leave-active-class="fade-leave-active"
        leave-class="fade-leave"
        leave-to-class="fade-leave-to"
        duration="500"
    >
      <div v-show="!isLoaded"  key="0">
        <div class="fullview">
          <div class="loading-spacer">
            <img src="./svgs/logo_loading.svg" alt="logo"/>
          </div>
        </div>
      </div>
      <div v-show="isLoaded"  key="1">
      <authenticator :hide-sign-up="true" :form-fields="formFields">
        <template v-slot:header>
          <div style="margin: 0 auto">
            <img src="./svgs/logo.svg"
                 style="margin-left: 26px; margin-top: 30px"
                 alt="logo"/>
          </div>
          <div style="margin-top: 38px">
            <h1 style="text-align: center">
              Sign in
            </h1>
          </div>
        </template>
        <template v-slot:sign-in-footer>
          <div class="login-footer">
              パスワードを忘れた方はご連絡ください
          </div>
        </template>
        <div>
          <router-view/>
        </div>
      </authenticator>
    </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-vue'
import '@aws-amplify/ui-vue/styles.css'
import {onMounted, provide, ref} from 'vue'
import { I18n } from 'aws-amplify'
import { translations } from '@aws-amplify/ui-vue'


const auth = useAuthenticator()
I18n.putVocabularies(translations)
I18n.setLanguage('en')
I18n.putVocabularies({
    ja: {
        'Sign in': '送信',
        'Signing in': '送信中',
        // 'Enter your ID': 'ID',
        // 'Enter your Password': 'Password',
        // Username: 'Enter your ID',
        // Password: 'Enter your Password',
        'Forgot your password?': ' '
    },
    en: {
        'Sign in': '送信',
        'Signing in': '送信中',
        // 'Enter your ID': 'ID',
        // 'Enter your Password': 'Password',
        // Username: 'Enter your ID',
        // Password: 'Enter your Password',
        'Forgot your password?': ' '
    }
})

const formFields = {
    signIn: {
        username: {
            labelHidden: false,
            label: 'ID',
            placeholder: 'Enter your ID',
        },
        password: {
            labelHidden: false,
            label: 'Password',
            placeholder: 'Enter your Password',

        },
    }
}

const isLoaded = ref(false)

onMounted(() => {
    window.onload = () => {
        let elapsed = 0
        const td = 1
        let id = setInterval(() => {
            elapsed+=td
            if(elapsed >= 150){
                clearInterval(id)
                isLoaded.value = true
            }
        }, 1)
    }
})

</script>

<style scoped lang="scss">
@import "src/assets/scss/variables.scss";

.fullview {
  background-image: $login-bg-image;
  width: 100%;
  height: 100%;
  position: fixed;
}

.loading-spacer{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.fade-enter-to, .fade-leave {
  opacity: 1;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.500s;
}

.loading{
  position: absolute;
  display: block;
  text-align: center;
  background-color: white;
}

.login-footer {
  text-align: center;
}

</style>
