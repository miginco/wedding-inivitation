import { createApp } from 'vue'
import App from './App.vue'
import AmplifyVue  from '@aws-amplify/ui-vue'
import awsExports from './aws-exports'
import {Amplify} from 'aws-amplify'
import './assets/adobe-fonts.js'


import {
    applyPolyfills,
    defineCustomElements
} from '@aws-amplify/ui-components/loader'

import {router} from './router'

import './assets/scss/variables.scss'
import './assets/css/animate.min.css'

Amplify.configure(awsExports)

applyPolyfills().then(() => {
    defineCustomElements(window)
})

const app = createApp(App)
app.use(router)
app.use(AmplifyVue)
app.mount('#app')
