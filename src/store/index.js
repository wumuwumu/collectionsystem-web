import Vue from 'vue';
import Vuex from 'vuex';

import app from './modules/app';
import user from './modules/user';
import getters from './getters'
import device from  './modules/device'
import userAdmin from './modules/user-admin'
import deviceAdmin from './modules/device-admin'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        //
    },
    mutations: {
        //
    },
    actions: {

    },
    modules: {
        app,
        user,
        device,
        userAdmin,
        deviceAdmin
    },
    getters
});

export default store;
