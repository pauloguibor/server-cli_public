
const baseApiUrl = 'http://localhost:3000/api'
import axios from "axios";
import Vue from 'vue'

export const userKey = '_knowledge_user'

export const http =  axios.create({
  baseURL: baseApiUrl,
  headers: {
    "Content-type": "application/json"
  }
});

export function showError(e) {
  if (e && e.response && e.response.data) {
    Vue.toasted.global.defaltError({msg : e.response.data})
  } else if(typeof e === 'string') {
    Vue.toasted.global.defaltError({ msg: e})
  } else {
    Vue.toasted.global.defaltError()
  }
}

export default { showError, http, userKey}