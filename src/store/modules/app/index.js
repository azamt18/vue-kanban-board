import {APP_INITIALIZE} from "./actions";
import $bus from '../../../events/global.event.bus'
import * as AppEvents from '../../../events/app'
import Mapper from '../../../mappers'
import _ from 'underscore'

export default {
    state: {
        isInitialized: false,
        lastAction: null,
    },
    getters: {
        appIsInitialized: (state) => {
            return state.isInitialized
        }
    },
    mutations: {
        updateIsInitialized(state, isInitialized) {
            state.isInitialized = isInitialized
        },
        setLastAction(state, lastAction) {
            state.lastAction = lastAction
        }
    },
    actions: {
        [APP_INITIALIZE]: ({commit, state}) => {
            if (!state.isInitialized) {

                commit('updateIsInitialized', true)
                $bus.$emit(AppEvents.APP_INITIALIZE_DONE)

                commit('setLastAction', 'App was loaded')
            } else {
                $bus.$emit(AppEvents.APP_INITIALIZE_DONE)
            }
        }
    }
}
