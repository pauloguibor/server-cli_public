import Vue from "vue";
import Vuex from 'vuex';
import { http } from "../global";


Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        isMenuVisible: false,
        user:null
    },
    mutations: {
        toggleMenu(state, isVisible){
            if (!state.user){
                state.isMenuVisible = false
                return
            }
            if(isVisible === undefined){
                state.isMenuVisible = !state.isMenuVisible
            } else {
                state.isMenuVisible = isVisible
            }
        },
        setUser(state, user) {
            state.user = user
            if(user) {
                http.defaults.headers.common['x-access-token'] = `${user.token}`
                state.isMenuVisible = true
            } else {
                delete http.defaults.headers.common['x-access-token']
                state.isMenuVisible = false
            }
        },
        
    }
})