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
                    <DatePicker type="date" placement="right-start" placeholder="Select date"
                                :options="DataPickerOption"
                                @on-ok="selectDate"
                                :value="SelectedDate"
                                @on-change="dateChange"
                                confirm
                                style="width: 200px"></DatePicker>

                    <Button type="primary" @click="exportHistoryExcel">导出</Button>

                </Row>
                <Row class="margin-top-20">
                    <Table style="margin: 10px" :columns="DeviceReportColumn" :data="ReportData">
                        <div style="background-color: #00a854;color: white;font-weight: bolder;font-size: larger"
                             slot="footer">
                            <Row style="margin-left: 15px;margin-right: 15px">
                                <Col span="5">
                                <span style="margin-right: 15px;">最大值：</span>{{DeviceReportMax}}
                                </Col>
                                <Col style="text-align: center" span="5">
                                <span style="margin-right: 15px">最小值：</span>{{DeviceReportMin}}
                                </Col>
                                <Col style="text-align: center" span="5">
                                <span style="margin-right: 15px">平均值：</span>{{DeviceReportAvg}}
                                </Col>

                            </Row>
                        </div>
                    </Table>

                </Row>
            </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
    export default{
        name: 'DayReport',
        data: function () {
            return {
                TreeData: [],
                CurrentDevice: 0,
                CurrentName: null,
                SelectedDate: new Date(),
                DeviceReportColumn: [
                    {
                        title: "平均值",
                        key: 'data'
                    },
                    {
                        title: '小时',
                        key: 'time'
                    }
                ],
                ReportData: [],
                page: 1,
                row: 100,
                PageTotal: 0,
                DeviceReportMax: 0,
                DeviceReportMin: 0,
                DeviceReportAvg: 0
            }
        },
        methods: {
            getTreeDate () {
                this.$store.dispatch('GetDeviceTree').then((result) => {
                    if (this.CurrentDevice == 0) {
                        for (let device of result.data) {
                            if (device.children == undefined || device.children == null || device.children.length == 0) {

                            } else {
                                this.CurrentDevice = device.children[0].id;
                                this.CurrentName = device.children[0].title;
                                this.selectDate();
                                break;
                            }
                        }
                    }
                    this.TreeData = result.data;
                }).catch((err) => {
                    this.$Message.error("获取设备树出现错误");
                });
            },
            selectChange(){
                let current = this.$refs.deviceTree.getSelectedNodes()[0];
                if (current.children != undefined || current.children != null) {
                    this.CurrentDevice = 0;
                    this.CurrentName = null;
                    return;
                }
                this.CurrentDevice = current.id;
                this.CurrentName = current.title;
                this.selectDate();
            },
            dateChange(value){
//                this.SelectedDate = value;
            },
            selectDate(){
                if (this.validateDevice()) {
                    let data = {
                        deviceId: this.CurrentDevice,
                        time: new Date(this.SelectedDate).valueOf()
                    };
                    this.$store.dispatch('GetDeviceDayReport', data).then((result) => {
                        this.ReportData = result.data.list;
                        this.DeviceReportMax = result.data.max;
                        this.DeviceReportMin = result.data.min;
                        this.DeviceReportAvg = result.data.avg;
                    }).catch((err) => {
                        this.$Message.error("获取历史出现错误");
                    });
                }
            },
            validateDevice(){
                if (this.CurrentDevice < 1) {
                    this.$Message.error('请选择设备');
                    return false;
                }
                return true;
            },
            exportHistoryExcel(){
                if (this.validateDevice()) {
                    let data = {
                        deviceId: this.CurrentDevice,
                        time: new Date(this.SelectedDate).valueOf()
                    };
                    this.$store.dispatch('GetDeviceDayExcel', data).then((result) => {
                        const content = result;
                        const elink = document.createElement('a');// 创建a标签
                        elink.download = 'device-day' + this.CurrentName + '-' + Date.parse(new Date()) + '.xls'; // 文件名
                        elink.style.display = 'none';
                        const blob = new Blob([content]);
                        elink.href = URL.createObjectURL(blob);
                        document.body.appendChild(elink);
                        elink.click() // 触发点击a标签事件
                        document.body.removeChild(elink);
                    }).catch((err) => {
                        this.$Message.error("导出excel出现错误");
                    });
                }
            },
        },
        created(){
            this.SelectedDate = new Date();
        },
        mounted: function () {
            this.getTreeDate();
        }
    }
</script>