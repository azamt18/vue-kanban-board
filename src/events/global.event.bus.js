import Vue from 'vue'
const eventBus = new Vue();

Vue.use({
    install (Vue) {
        Vue.prototype.$bus = eventBus
    }
});

export default eventBus