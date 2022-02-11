import axios from 'axios'
const axiosInstance = axios.create({
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
  });
export default{
    namespaced: true,
    state: {
        paises: [],
    },
    mutations: {
        setAllPaises(state, payload) {
        state.paises=payload;
        },
    },
    actions: {
        fetchPaises(state) {
            //using docker
           axiosInstance.get("http://localhost:9000/http://country.io/names.json")
           .then(resp => {
                state.commit("setAllPaises", Object.values(resp.data));
            });
        },
    },
    getters: {
        getAllPaises: state => state.paises,
    }
}