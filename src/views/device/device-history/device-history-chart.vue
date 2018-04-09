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
                <DeviceHistoryNode :CurrentDevice="CurrentDevice"></DeviceHistoryNode>
            </Card>
            </Col>
        </Row>
    </div>
</template>


<script>
    import DeviceHistoryNode from './device-history-node.vue'
    import HightTestData from "./data";
    export default {
        name: 'DeviceHistoryChart',
        components: {
            DeviceHistoryNode
        },
        data: function () {
            return {
                TreeData: [],
                CurrentDevice: 1,
                ShowType: 1,
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