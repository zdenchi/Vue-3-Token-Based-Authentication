import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    user: null,
  },
  getters: {
    loggedIn: (state) => {
      return !!state.user;
    },
  },
  mutations: {
    SET_USER_DATA(state, userData) {
      state.user = userData;
      localStorage.setItem('user', JSON.stringify(userData));
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${userData.token}`;
    },
    CLEAR_USER_DATA() {
      localStorage.removeItem('user');
      location.reload();
    },
  },
  actions: {
    register({ commit }, credentials) {
      return axios
        .post('//localhost:3000/register', credentials)
        .then(({ data }) => {
          console.log(data);
          commit('SET_USER_DATA', data);
        })
        .catch((error) => console.log(error));
    },
    login({ commit }, credentials) {
      return axios
        .post('//localhost:3000/login', credentials)
        .then(({ data }) => {
          console.log(data);
          commit('SET_USER_DATA', data);
        })
        .catch((error) => console.log(error));
    },
    logout({ commit }) {
      commit('CLEAR_USER_DATA');
    },
  },
  modules: {},
});
