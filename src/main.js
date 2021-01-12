import Vue from 'vue'
import App from './App.vue'


// Import Bootstrap an BootstrapVue
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

// Map plugins
// docs https://diegoazh.github.io/gmap-vue/
import * as GmapVue from 'gmap-vue'
import GmapCluster from 'gmap-vue/dist/components/cluster' // replace dist with src if you have Babel issues

Vue.component('GmapCluster', GmapCluster)
Vue.use(GmapVue, {
  load: {
    key: 'AIzaSyACsttdzuma--8b07wAksCPbg4OGGvr1uw',
    libraries: 'places',
    language: 'RU',
  },
  installComponents: true
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
