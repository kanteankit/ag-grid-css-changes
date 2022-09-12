import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import router from './router'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-material.css'

// Vuetify stuff
const opts = {
  icons: {
    iconfont: 'mdi'
  },
  theme: {
    themes: {
      light: {
        primary: '#4696EC',
        'falkonry-link-text': '#295381', //use this in classes. Added here for reference
        secondary: '#A6A6A6',
        'falkonry-grey-light': '#F5F6FA',
        white: '#ffffff'
      }
    }
  }
}
Vue.use(Vuetify)

// App initialization
new Vue({
  router,
  vuetify: new Vuetify(opts),
  render: h => h(App)
}).$mount('#app')
