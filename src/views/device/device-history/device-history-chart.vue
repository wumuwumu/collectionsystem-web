<template>
    <div>
        <Row>
            <Col :sm="24" :md="6" :lg="5">
            <Card>
                <p slot="title">
                    <Icon type="android-remove"></Icon>
                    设备列表
                </p>
                <Tree ref="deviceTree" :data="TreeData" @on-select-change="selectChange"></Tree>
            </Card>
            </Col>
            <Col :sm="24" :md="18" :lg="19" class="padding-left-10">
            <Card>
                <Row>
                    <DatePicker type="daterange" placement="right-start" placeholder="Select date"
                                :options="DataPickerOption"
                                @on-ok="selectDate"
                                @on-change="dateChange"
                                :v-model="SelectDate"
                                confirm
                                style="width: 200px"></DatePicker>

                    <RadioGroup v-model="ShowType" type="button" @on-change="showTypeChange">
                        <Radio label=1 >曲线图</Radio>
                        <Radio label=2 >面积图</Radio>
                        <Radio label=3 >点阵图</Radio>
                        <Radio label=4 >柱状图</Radio>
                    </RadioGroup>

                </Row>
                <Row class="margin-top-20">
                    <highstock :options="ChartOptions"></highstock>
                </Row>
            </Card>
            </Col>
        </Row>
    </div>
</template>


<script>
    import HightTestData from "./data";
    export default {
        name: 'DeviceHistoryChart',
        components: {},
        data: function () {
            return {
                TreeData: [],
                CurrentDevice: 1,
                DataPickerOption: {
                    global: {
                        useUTC: false
                    },
                    shortcuts: [
                        {
                            text: '一天内',
                            value () {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24);
                                return [start, end];
                            }
                        },
                        {
                            text: '一星期内',
                            value () {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                                return [start, end];
                            }
                        },
                        {
                            text: '一个月内',
                            value () {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                                return [start, end];
                            }
                        },
                        {
                            text: '三个月内',
                            value () {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                                return [start, end];
                            }
                        },
                        {
                            text: '一年内',
                            value () {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
                                return [start, end];
                            }
                        }
                    ]
                },
                SelectDate: [],
                ShowType: 1,
                ChartOptions: {
                    credits: {
                        enabled: false
                    },
                    chart: {
                        zoomType: 'x'
                    },
//                    tooltip: {
//                        split: false,
//                        shared: true,
//                    },
                    rangeSelector: {
                        buttons: [{
                            type: 'day',
                            count: 3,
                            text: '3d'
                        }, {
                            type: 'week',
                            count: 1,
                            text: '1w'
                        }, {
                            type: 'month',
                            count: 1,
                            text: '1m'
                        }, {
                            type: 'month',
                            count: 6,
                            text: '6m'
                        }, {
                            type: 'year',
                            count: 1,
                            text: '1y'
                        }, {
                            type: 'all',
                            text: 'all'
                        }],
                        selected: 3
                    },
                    xAxis: {
                        breaks: [],
                        title: '时间'
                    },
                    yAxis: {
                        title: {
                            text: '数值'
                        }
                    },
                    title: {
                        text: '历史数据'
                    },
                    series: [{
                        type: 'line',
                        name: '数据',
                        gapSize: 50,
                        marker: {
                            enabled: false,
                            radius: 0,
                        },
                        data: []
//                        pointStart: Date.UTC(2004, 3, 1),
//                        pointInterval: 3600 * 1000,
//                        tooltip: {
//                            valueDecimals: 2,
//                        }
                    }]
                },
            }
        },
        methods: {
            getTreeDate () {
                this.$store.dispatch('GetDeviceTree').then((result) => {
                    this.TreeData = result.data;
                }).catch((err) => {
                    this.$Message.error("获取设备树出现错误");
                });
            },
            selectChange(){
                let current = this.$refs.deviceTree.getSelectedNodes()[0];
                if (current.children != undefined || current.children != null) {
                    this.CurrentDevice = {};
                    return;
                }
                this.CurrentDevice = current.id;
            },
            selectDate(){
                if (this.validateDevice() && this.validateDate()) {
                    let data = {
                        deviceId: this.CurrentDevice,
                        beginTime: this.SelectDate[0],
                        endTime: this.SelectDate[1]
                    };
                    this.$store.dispatch('GetBetweenAllHistory', data).then((result) => {
                        let OfflineInfo = result.data.offline;
                        for (let i = 0, len = OfflineInfo.length; i < len; i++) {
                            if (OfflineInfo[i].endTime != null) {
                                let info = {
                                    from: OfflineInfo[i].beginTime,
                                    to: OfflineInfo[i].endTime,
                                    repeat: 0
                                }
                                this.ChartOptions.xAxis.breaks.push(info);
                            }
                        }
                        let AllHistory = result.data.history;
                        let ShowData = [];
                        for (let j = 0, len = AllHistory.length; j < len; j++) {
                            let item = [Number(AllHistory[j].deviceDate),
                                AllHistory[j].deviceData
                            ];
                            ShowData.push(item);
                        }
                        this.ChartOptions.series[0].data = ShowData;

                    }).catch((err) => {
                        this.$Message.error("获取历史出现错误");
                    });
                }
            },
            dateChange(value){
                this.SelectDate = value;
            },
            validateDevice(){
                if (this.CurrentDevice < 1) {
                    this.$Message.error('请选择设备');
                    return false;
                }
                return true;
            },
            validateDate(){
                if (this.SelectDate.length != 2) {
                    this.$Message.error("选择的时间有问题");
                    return false;
                }
                return true;
            },
            showTypeChange(item){
                switch (item) {
                    case '1':
                        this.ChartOptions.series[0].lineWidth = 2;
                        this.ChartOptions.series[0].type = "line";

                        break;
                    case '2':
                        this.ChartOptions.series[0].type = "area";
                        this.ChartOptions.series[0].lineWidth = 2;
                        break;
                    case '3':
                        this.ChartOptions.series[0].lineWidth = 0;
                        this.ChartOptions.series[0].marker.enabled = true;
                        this.ChartOptions.series[0].marker.radius = 2;
                        this.ChartOptions.series[0].type = "line";

                        break;
                    case '4':
                        this.ChartOptions.series[0].type = "column";
                        this.ChartOptions.series[0].lineWidth = 2;
                        break;
                    default:
                        this.ChartOptions.series[0].type = "line";
                        this.ChartOptions.series[0].lineWidth = 2;

                }
            }
        },
        mounted: function () {
            this.getTreeDate();
        }
    }
</script>