import Vue from 'vue';
import Vuex from 'vuex';

import { calculateResults } from './lib/gli-2012';

Vue.use(Vuex);

// root state object.
// each Vuex instance is just a single state tree.
const state = {
  // results
  // {
  //   L: ...,
  //   LLN: ...,
  //   Lspline: ...,
  //   M: ...,
  //   Mspline: ...,
  //   S: ...,
  //   Sspline: ...,
  //   Zscore: ...
  // }
  ready: false,
  valid: false,
  results: {
    FEV1: false,
    FVC: false,
    FEV1FVC: false,
  },
  route: {
    query: {
      // patient information
      age: '',
      ethnicity: 0,
      gender: '',
      height: '',
      // measured values
      FEV1: '',
      FVC: '',
    },
  },
};

// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
  ready(currentState) {
    Object.assign(currentState, {
      ready: true,
    });
  },
  update(currentState) {
    const patient = currentState.route.query;
    // calculate results
    Object.assign(currentState, {
      valid: false,
      results: calculateResults(patient),
      debug: patient.debug,
    });
    // validate results
    Object.keys(currentState.results).forEach((variable) => {
      if (currentState.results[variable] !== false) {
        Object.assign(currentState, {
          valid: true,
        });
      }
    });
  },
};

// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {
  ready: ({ commit }) => commit('ready'),
  update: ({ commit }) => commit('update'),
  // asyncUpdateInformation: ({ commit }, data) =>
  //   new Promise((resolve) => {
  //     setTimeout(() => {
  //       commit('update', data);
  //       resolve();
  //     }, 1000);
  //   }),
};

// getters are functions
const getters = {
  // evenOrOdd: state => state.count % 2 === 0 ? 'even' : 'odd',
};

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
});
