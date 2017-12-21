<template>
    <!--<Card shadow>-->
    <div>
        <div style="width:100%;height:300px;" id="device-chart" ref="devicechart"></div>
    </div>
    <!--</Card>-->

</template>

<script>
    import echarts from 'echarts';
//    import  '../../../../styles/shine'
    import Vue from "vue"
    var base = +new Date(1968, 9, 3);
    var oneDay = 24 * 3600 * 1000;
    var date = [];

    var data = [Math.random() * 300];

    for (var i = 1; i < 20000; i++) {
        var now = new Date(base += oneDay);
        date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
        data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
    }
    export default {
        name: 'DeviceChart',
        props:{
            deviceId:{
                type:Number,
                default () {
                    return 0;
                }
            },
            day:{
                type:Number,
                default () {
                    return 7;
                }
            }
        },
        data(){
            return{
                chart:null,
                option : {
                    tooltip: {
                        trigger: 'axis',//坐标轴触发
                        position: function (pt) {
                            return [pt[0], '10%'];
                        }
                    },
                    title: {
                        left: 'center', //相对位置
                        text: '历史数据',
                    },
                    toolbox: {
                        feature: {
                            dataZoom: {
                                yAxisIndex: 'none'//指定哪些 yAxis 被控制。如果缺省则控制所有的y轴。
                            },
                            restore: {},//配置项还原。
                            saveAsImage: {}//保存为图片。
                        }
                    },
                    xAxis: {
                        type: 'category', // 设为 category的话,其值须为类目的『序数』（从 0 开始）或者类目的『字符串值』。
                        boundaryGap: false,
//            data: date    // x轴的设置
                    },
                    yAxis: {
                        type: 'value',  //指标是数值
                        boundaryGap: [0, '100%']  //分别表示数据最小值和最大值的延伸范围
                    },
                    //用于区域缩放
                    dataZoom: [{
                        type: 'inside',
                        start: 0,//数据窗口范围的起始百分比
                        end: 100  //数据窗口范围的结束百分比
                    },
                        {
                            start: 0,
                            end: 10,
                            // 手柄的 icon 形状，支持路径字符串
                            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                            handleSize: '80%',
                            handleStyle: {
                                color: '#fff',
                                shadowBlur: 3,
                                shadowColor: 'rgba(0, 0, 0, 0.6)',
                                shadowOffsetX: 2,
                                shadowOffsetY: 2
                            }
                        }],
                    series: [
                        {
                            name: '模拟数据',
                            type: 'line', //系列名称
                            smooth: true,//是否平滑曲线显示
                            symbol: 'circle',//标记的图形。
                            //          sampling: 'average',
                            itemStyle: {
                                normal: {
                                    color: 'rgb(131, 70,255 )' //图形的颜色。
                                }
                            },
                            areaStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: 'rgb(68, 158, 255)'
                                    }, {
                                        offset: 1,
                                        color: 'rgb(131, 70, 255)'
                                    }])   //表示为填充的颜色
                                }
                            },
//                data: data
                        }
                    ]
                },
            }
        },
        methods: {
            init(){
                if (this.chart) {
                    return
                }
                let chart = echarts.init(this.$refs.devicechart);
                chart.setOption(this.option, true);
                window.addEventListener('resize', function () {
                    chart.resize();
                });
                this.chart = chart;
            },
            getHistory(){
                console.log("获取历史开始")
                var requestData = {};
                requestData.deviceId = this.deviceId;
                requestData.day=this.day;
                this.$store.dispatch('GetDeviceHistory',requestData).then((result) => {
                    var x_axi = [];
                    var y_axi = [];
                    var alldata = result.data;
                    var newDate = new Date();
                    for (var i = 0; i < alldata.length; i++) {
                        x_axi.push(new Date(alldata[i].deviceDate).toLocaleString());
                        y_axi.push(alldata[i].deviceData);
                    }
                    this.option.xAxis.data= x_axi;
                    this.option.series[0].data = y_axi;
                    console.log("444444")
                    if (!this.chart) {
                        this.init()
                    } else {
                        this.chart.setOption(this.option, true)
                    }
                    this.chart.hideLoading();
//                    this.AreaData = result.data;
                }).catch((err) => {
                    console.log("获取历史出现错误");
                    this.$Message.error(err);
                });
                console.log("获取历史结束")
            }
        },
        mounted(){
            this.init();
            this.chart.showLoading();
            this.getHistory();
        },
        watch:{
            deviceId:function () {
                this.getHistory();
            },
            day:function () {
                this.getHistory();
            }
        }



    }
</script>

<style>

</style>
