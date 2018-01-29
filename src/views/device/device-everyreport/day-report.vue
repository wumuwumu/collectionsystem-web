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
                SelectedDate: [],
                DeviceReportColumn: [
                    {
                        title: '设备名称',
                        key: 'deviceName'
                    },
                    {
                        title: '集中器',
                        key: 'concentrator'
                    },
                    {
                        title: "节点ip",
                        key: 'node',
                    },
                    {
                        title: "平均值",
                        key: 'data'
                    },
                    {
                        title: '日期',
                        key: 'date'
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
                if (this.validateDevice() && this.validateDate()) {
                    let data = {
                        deviceId: this.CurrentDevice,
                        beginTime: this.SelectedDate[0],
                        endTime: this.SelectedDate[1],
                        page: this.page,
                        row: this.row
                    };
                    this.$store.dispatch('GetDeviceDayReport', data).then((result) => {
                        this.ReportData = result.data;
                        this.DeviceReportMax = result.other.max;
                        this.DeviceReportMin = result.other.min;
                        this.DeviceReportAvg = result.other.avg;
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
            validateDate(){
                if (this.SelectedDate.length != 2) {
                    this.$Message.error("选择的时间有问题");
                    return false;
                }
                return true;
            },
            exportHistoryExcel(){
                if (this.validateDevice() && this.validateDate()) {
                    let data = {
                        deviceId: this.CurrentDevice,
                        beginTime: this.SelectedDate[0],
                        endTime: this.SelectedDate[1],
                        page: 1,
                        row: 1000000
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
            let date = new Date();
            date.setDate(date.getDate() - 30);
            this.SelectedDate.push(date);
            this.SelectedDate.push(new Date());
        },
        mounted: function () {
            this.getTreeDate();
        }
    }
</script>