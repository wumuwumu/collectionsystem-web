import Vue from 'vue';
import iView from 'iview';
import {router} from './router/index';
import {appRouter} from './router/router';
import store from './store';
import App from './app.vue';
import '@/locale';
import 'iview/dist/styles/iview.css';
import VueI18n from 'vue-i18n';
import util from '@/libs/util';
import highChartsTheme from "./styles/highcharts-sand-signika.js";

import VueHighcharts from 'vue-highcharts';
import Highcharts from 'highcharts';
import loadStock from 'highcharts/modules/stock';
loadStock(Highcharts);
Highcharts.setOptions({
    global: {
        timezoneOffset: -8 * 60,

    }
});
Vue.use(VueHighcharts, {Highcharts});
Highcharts.setOptions(highChartsTheme);

Vue.use(VueI18n);
Vue.use(iView);

new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App),
    data: {
        currentPageName: ''
    },
    mounted () {
        this.currentPageName = this.$route.name;
        // 显示打开的页面的列表
        this.$store.commit('setOpenedList');
        this.$store.commit('initCachepage');
        // 权限菜单过滤相关

    },
    created () {
        let tagsList = [];
        appRouter.map((item) => {
            if (item.children.length <= 1) {
                tagsList.push(item.children[0]);
            } else {
                tagsList.push(...item.children);
            }
        });
        this.$store.commit('setTagsList', tagsList);
    }
});
