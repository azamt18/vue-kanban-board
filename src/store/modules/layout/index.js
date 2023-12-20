import {LAYOUT_LOADING_START, LAYOUT_LOADING_STOP, LAYOUT_TITLE_CHANGED} from "./actions";

export default {
    state: {
        loadingCounter: 0,
        title: ''
    },
    getters: {
        layoutIsLoading: (state) => {
            return state.loadingCounter > 0
        },
        layoutPageTitle: (state) => {
            return state.title
        }
    },
    mutations: {
        incrementLoadingCounter(state) {
            state.loadingCounter = state.loadingCounter + 1
        },
        decrementLoadingCounter(state) {
            state.loadingCounter = state.loadingCounter - 1
            if (state.loadingCounter < 0)
                state.loadingCounter = 0
        },
        updateTitle(state, title) {
            window.document.title = title

            state.title = title;
        }
    },
    actions: {
        [LAYOUT_LOADING_START]: ({commit}) => {
            commit('incrementLoadingCounter')
        },
        [LAYOUT_LOADING_STOP]: ({commit}) => {
            commit('decrementLoadingCounter')
        },
        [LAYOUT_TITLE_CHANGED]: ({commit}, newTitle) => {
            commit('updateTitle', newTitle)
        }
    }
}