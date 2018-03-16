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

import VueAMap from 'vue-amap'

loadStock(Highcharts);
Highcharts.setOptions({
    global: {
        timezoneOffset: -8 * 60,
    }
});
Vue.use(VueHighcharts, {Highcharts});
Highcharts.setOptions(highChartsTheme);
Highcharts.setOptions({
    lang: {
        contextButtonTitle: '图表导出菜单',
        decimalPoint: '.',
        downloadJPEG: '下载JPEG图片',
        downloadPDF: '下载PDF文件',
        downloadPNG: '下载PNG文件',
        downloadSVG: '下载SVG文件',
        drillUpText: '返回 {series.name}',
        loading: '加载中',
        months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        noData: '没有数据',
        numericSymbols: ['千', '兆', 'G', 'T', 'P', 'E'],
        printChart: '打印图表',
        resetZoom: '恢复缩放',
        resetZoomTitle: '恢复图表',
        shortMonths: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        thousandsSep: ',',
        weekdays: ['星期一', '星期二', '星期三', '星期三', '星期四', '星期五', '星期六', '星期天']
    },
})

// 引入vue-amap
Vue.use(VueAMap)

// 初始化vue-amap
VueAMap.initAMapApiLoader({
    // 高德的key
    key: '548c7cd983af89e1c4bab2bea117939f',
    // 插件集合
    plugin: ['Autocomplete', 'PlaceSearch', 'Scale', 'OverView', 'ToolBar', 'MapType', 'PolyEditor', 'AMap.CircleEditor', 'Geolocation'],
    // 高德 sdk 版本，默认为 1.4.4
    v: '1.4.4'
})




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
