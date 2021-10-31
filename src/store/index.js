import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    user: null,
  },
  mutations: {
    SET_USER_DATA(state, userData) {
      state.user = userData;
      localStorage.setItem('user', JSON.stringify(userData));
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${userData.token}`;
    },
  },
  actions: {
    register({ commit }, user) {
      return axios
        .post('//localhost:3000/register', user)
        .then(({ data }) => {
          console.log(data);
          commit('SET_USER_DATA', data);
        })
        .catch((error) => console.log(error));
    },
  },
  modules: {},
});
