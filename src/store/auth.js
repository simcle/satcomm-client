import axios from "axios"

export default {
    namespaced: true,
    state: {
        authenticated: false,
        user: null
    },
    getters: {
        authenticated (state) {
            return state.authenticated
        },

        user (state) {
            return state.user
        }

    },
    mutations: {
        SET_AUTHENTICATED(state, value) {
            state.authenticated = value
        },

        SET_USER(state, value) {
            state.user = value
        }
    },
    actions: {
        async login({dispatch}, credential) {
            await axios.get('sanctum/csrf-cookie')
            await axios.post('login', credential)
            dispatch('me')
        },

        async me({commit}) {
            try {
                commit('SET_AUTHENTICATED', true)
                
                let response = await axios.get('api/me')
                commit('SET_USER', response.data)
            } catch (error) {
                commit('SET_AUTHENTICATED', false)
                commit('SET_USER', null)   
            }
        },

        async logout({commit}) {
            await axios.post('logout')
            commit('SET_AUTHENTICATED', false)
            commit('SET_USER', null)  
        },

        expired ({commit}) {
            commit('SET_AUTHENTICATED', false)
            commit('SET_USER', null)  
        }

        
    }
}