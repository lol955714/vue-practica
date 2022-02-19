import Vue from 'vue'
import Vuex from 'vuex'
import novelas from '../modules/novelas'
import paises from '../modules/paises'
import peliculas from '../modules/peliculas'
import fotos from '../modules/fotos'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    novelas,
    paises,
    fotos,
    peliculas
  }
})
