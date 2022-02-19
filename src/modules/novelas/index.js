import axios from 'axios'
const axiosInstance = axios.create({
    headers: {
        "Access-Control-Allow-Origin": "*"
      },
  });
export default{
    namespaced: true,
    state: {
        novelas: [],
    },
    mutations: {
        setAllNovelas(state, payload) {
            state.novelas=payload;
        },
        agregarNovela(state, payload){
            state.novelas.push(payload);
        },
        eliminarNovela(state, payload){
            state.novelas.slice(payload)
        },
        actualizar(state){
            this.fetchNovelas(state)
        }
    },
    actions: {
        fetchNovelas(state) {
           axiosInstance.get("http://localhost:3000/api/novelas")
           .then(resp => {
                state.commit("setAllNovelas", resp.data);
        });
        },
        agregarNovela(state,novela){
            axiosInstance.post("http://localhost:3000/api/novelas", novela)
           .then(
               state.commit('agregarNovela',novela)
           );
        },
        eliminarNovela(state, novela){
            axiosInstance.delete("http://localhost:3000/api/novelas/"+novela._id)
           .then(
               //state.commit('actualizar', state)
           );
        },
        updateNovela(state, novela){
            var url ="http://localhost:3000/api/novelas/"+novela._id
            axiosInstance.put(url, novela)
           .then(
               //state.commit('actualizar', state)
           );
        }
    },
    getters: {
        getAllNovelas: state => state.novelas,
    }
}