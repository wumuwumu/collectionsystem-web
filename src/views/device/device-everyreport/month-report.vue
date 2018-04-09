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
                    <DatePicker type="month" placement="right-start" placeholder="Select month"
                                :options="DataPickerOption"
                                @on-ok="selectMonth"
                                :value="SelectedMonth"
                                @on-change="monthChange"
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
        name: 'MonthReport',
        data: function () {
            return {
                TreeData: [],
                CurrentDevice: null,
                SelectedMonth: new Date(),
                DeviceReportColumn: [
                    {
                        title: "平均值",
                        key: 'data'
                    },
                    {
                        title: '月份',
                        key: 'time'
                    }
                ],
                ReportData: [],
                DeviceReportMax: 0,
                DeviceReportMin: 0,
                DeviceReportAvg: 0
            }
        },
        methods: {
            getTreeDate () {
                this.$store.dispatch('GetDeviceTree').then((result) => {
                    if (this.CurrentDevice == null) {
                        for (let device of result.data) {
                            if (device.children == undefined || device.children == null || device.children.length == 0) {

                            } else {
                                this.CurrentDevice = device.children[0];
                                this.selectMonth();
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
                    this.CurrentDevice = null;
                    return;
                }
                this.CurrentDevice = current;
                this.selectMonth();
            },
            monthChange(value){
//                console.log(value);
//                this.SelectedDate = value;
            },
            selectMonth(){
                if (this.validateDevice()) {
                    let data = {
                        deviceId: this.CurrentDevice.id,
                        time: new Date(this.SelectedMonth).valueOf(),
                    };
                    this.$store.dispatch('GetDeviceMonthReport', data).then((result) => {
                        console.log(result.data);
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
                if (this.CurrentDevice == null || this.CurrentDevice.id < 1) {
                    this.$Message.error('请选择设备');
                    return false;
                }
                return true;
            },
            exportHistoryExcel(){
                if (this.validateDevice()) {
                    let data = {
                        deviceId: this.CurrentDevice.id,
                        time: new Date(this.SelectedMonth).valueOf(),
                    };
                    this.$store.dispatch('GetDeviceMonthExcel', data).then((result) => {
                        const content = result;
                        const elink = document.createElement('a');// 创建a标签
                        elink.download = 'device-month' + this.CurrentDevice.title + '-' + Date.parse(new Date()) + '.xls'; // 文件名
                        elink.style.display = 'none';
                        const blob = new Blob([content]);
                        elink.href = URL.createObjectURL(blob);
                        document.body.appendChild(elink);
                        elink.click() // 触发点击a标签事件
                        document.body.removeChild(elink);
                    }).catch((err) => {
                        this.$Message.error("到处excel出现错误");
                    });
                }
            },
        },
        created(){
            let date = new Date();
            date.setDate(date.getDate() - 30);
            this.SelectedDate.push(date);
            this.SelectedDate.push(new Date());
            console.log(this.SelectedDate);
        },
        mounted: function () {
            this.getTreeDate();
        }
    }
</script>