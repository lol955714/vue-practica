import axios from 'axios'
const axiosInstance = axios.create({
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
  });
export default{
    namespaced: true,
    state: {
        peliculas: [],
    },
    mutations: {
        setPeliculas(state, payload) {
        state.peliculas=payload;
        },
    },
    actions: {
        fetchPeliculas(state, nombre) {
            //using docker
            var url = "http://localhost:9000/http://omdbapi.com/?t="+nombre+"&apikey=ca0dd478"
            axiosInstance.get(url)
            .then(resp => {
                    state.commit("setPeliculas",resp.data);
            });
        },
    },
    getters: {
        getPeliculas: state => state.peliculas,
    }
}