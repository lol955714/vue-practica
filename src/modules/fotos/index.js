import axios from 'axios'
const axiosInstance = axios.create({
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
export default{
    namespaced: true,
    state: {
        fotos: [],
    },
    mutations: {
        setAllFotos(state, payload) {
            state.fotos=payload;
        },
        agregarFoto(state, payload){
            state.fotos.push(payload);
        },
        eliminarFotos(state, payload){
            this.fetchFotos(state)
        },
        actualizar(state){
            this.fetchFotos(state)
        }
    },
    actions: {
        fetchFotos(state) {
           axiosInstance.get("http://localhost:3000/api/fotos")
           .then(resp => {
                state.commit("setAllFotos", resp.data);
        });
        },
        agregarFoto(state,foto){
            axiosInstance.post("http://localhost:3000/api/fotos", foto)
           .then(
               state.commit('agregarFoto',foto)
           );
        },
        eliminarFoto(state, foto){
            axiosInstance.delete("http://localhost:3000/api/fotos/"+foto._id)
           .then(
               //state.commit('actualizar', state)
           );
        },
        updateFoto(state, foto){
            var url ="http://localhost:3000/api/fotos/"+foto._id
            axiosInstance.put(url, foto)
           .then(
               //state.commit('actualizar', state)
           );
        }
    },
    getters: {
        getAllFotos: state => state.fotos,
    }
}