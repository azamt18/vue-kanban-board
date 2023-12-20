import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import Vuelidate from 'vuelidate'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store'
import Moment from 'moment'
import './events/global.event.bus'
import "@/filters"

Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.use(VueAxios, axios)

new Vue({
    vuetify,
    router,
    store,
    render: h => h(App),
    created() {
        Moment.locale('ru');
    }
}).$mount('#app')
