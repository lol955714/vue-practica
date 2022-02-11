import axios from 'axios'
const axiosInstance = axios.create({
  headers: {
    "Access-Control-Allow-Origin": "*"
  },
});
export default {
  axiosInstance
}