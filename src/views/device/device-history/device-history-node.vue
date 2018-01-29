<template>
    <Card>
        <Row>
            <DatePicker type="daterange" placement="right-start" placeholder="Select date"
                        :options="DataPickerOption"
                        @on-ok="selectDate"
                        @on-change="dateChange"
                        :value="SelectDate"
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
</template>

<script>
    export default{
        name: 'device-history-node',
        props: {
            CurrentDevice: 0
        },
        data: function () {
            return {
                DataPickerOption: {
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
                DeviceInfo: {},
                ChartOptions: {
                    credits: {
                        enabled: false
                    },
                    chart: {
                        zoomType: 'xY'
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
                        selected: 1,
//                        allButtonsEnabled: true
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
//                        gapSize: 10,
//                        marker: {
//                            enabled: false,
//                            radius: 0,
//                        },
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
            selectDate(){
                if (this.validateDevice() && this.validateDate()) {
                    console.log(this.SelectDate);
                    let data = {
                        deviceId: this.CurrentDevice,
                        beginTime: this.SelectDate[0],
                        endTime: this.SelectDate[1]
                    };
                    this.$store.dispatch('GetBetweenAllHistory', data).then((result) => {
                        let OfflineInfo = result.data.offline;
//                        for (let i = 0, len = OfflineInfo.length; i < len; i++) {
//                            if (OfflineInfo[i].endTime != null) {
//                                let info = {
//                                    from: OfflineInfo[i].beginTime,
//                                    to: OfflineInfo[i].endTime,
//                                    repeat: 0
//                                };
//                                this.ChartOptions.xAxis.breaks.push(info);
//                            }
//                        }
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
            getDeviceInfo(){
                this.$store.dispatch('GetDeviceInfo', this.CurrentDevice).then((result) => {
                    if (result.code == 1) {
                        this.DeviceInfo = result.data;
                        this.ChartOptions.title.text = this.DeviceInfo.name + '的历史记录';
                    } else {
                        this.$Message.error("获取设备信息失败");
                    }
                }).catch((err) => {
                    this.$Message.error("获取设备信息出现错误");
                });
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
        created(){
            let date = new Date();
//            设置默认是1天
            this.SelectDate.push(date.setDate(date.getDate() - 1));
            this.SelectDate.push(new Date());
            this.selectDate();
            this.getDeviceInfo();
        }
    }
</script>