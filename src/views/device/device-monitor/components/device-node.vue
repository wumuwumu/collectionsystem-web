<style lang="less">
    @import 'styles/device-node.less';
</style>

<template>
    <Col :sm="24" :md="12" :lg="8" :padding="4" style="margin-bottom: 16px;min-width: 100px">
    <Card shadow style="background-color: #e9ebeb" v-show="!SwitchView">

        <div class="infor-card-con">
            <!--<Row class="device-name" :style="{backgroundColor: color}">-->
            <!--<span  >{{DeviceName}}</span>-->
            <!--</Row>-->
            <Col class="infor-card-icon-con" span="8">
            <Row class="height-100" type="flex" align="middle" justify="center">
                <!--<img style="text-align: center" height="70px" width="70px" :src="IconData"/>-->
                <Sicon :type="DeviceInfo.showIcon" size="80" :color="DeviceInfo.showIconcolor"></Sicon>
            </Row>
            </Col>

            <Col span="16" class="height-100">
            <Row class="device-name-header" :style="{backgroundColor: Online}">
                <span class="device-name-content">{{DeviceInfo.name}}</span>
            </Row>
            <Row type="flex" align="middle">
                <Col class="device-info-col">
                <Row>{{DataName}}：<span
                        style="font-size: large">{{DeviceInfo.lastestData}}{{DeviceInfo.showUnit}}</span></Row>
                <Row>时间：<span style="" class="infor-intro-text">{{DeviceDate}}</span></Row>
                </Col>
            </Row>
            <Row style="margin: 10px">
                <Button type="info" size="small" @click="openHistory">历史记录</Button>
            </Row>
            </Col>
        </div>
    </Card>
    <Card v-show="SwitchView" shadow style="background-color: #e9ebeb">
        <Row>
            <Col class="infor-card-icon-con" span="8">
            <Sicon :type="DeviceInfo.showIcon" size="80" :color="DeviceInfo.showIconcolor"></Sicon>
            </Col>

            <Col span="16" class="height-100">
            <Row class="device-name-header" style="background-color: #a8a238">
                <span class="device-name-content">{{DeviceInfo.name}}</span>
            </Row>
            <Row style="font-size: larger;margin-top: 10px">
                <span>状态：</span>
                <span style="margin-left: 10px">{{SwitchStatus}}</span>
            </Row>
            <Row style="margin-top: 10px;text-align: center">
                <Button type="primary" @click="openDevice">打开</Button>
                <Button type="error" style="margin-left: 10px" @click="closeDevice">关闭</Button>
            </Row>
            </Col>
        </Row>
    </Card>
    </Col>
</template>
<script>

    import Sicon from '../../../admin-control/device/components/sicon.vue'

    export default{
        name: 'DeviceNode',
        props: {
            DeviceInfo: {
            }
        },
        components: {
            Sicon
        },
        data(){
            return {
            }
        },
        computed: {
            SwitchView: function () {
                if (this.DeviceInfo.collectionType == 'switch') {
                    return true
                } else {
                    return false;
                }
            },
            DataName: function () {
                return this.DeviceInfo.collectionType;
            },
            Online: function () {
                switch (this.DeviceInfo.online) {
                    case 1 :
                        return "#00cc66";
                        break;
                    default :
                        return "#ed3f14";
                        break;
                }
            },
            DeviceDate: function () {
                return this.dateForm(this.DeviceInfo.lastestTime);
            },
            SwitchStatus: function () {
                if (this.DeviceInfo.lastestData > 0) {
                    return '开';
                }
                return '关';
            }

        },
        methods: {
            dateForm(value) {
                Date.prototype.format = function (fmt) {
                    var o = {
                        "M+": this.getMonth() + 1,                 //月份
                        "d+": this.getDate(),                    //日
                        "h+": this.getHours(),                   //小时
                        "m+": this.getMinutes(),                 //分
                        "s+": this.getSeconds(),                 //秒
                        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                        "S": this.getMilliseconds()             //毫秒
                    };
                    if (/(y+)/.test(fmt)) {
                        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                    }
                    for (var k in o) {
                        if (new RegExp("(" + k + ")").test(fmt)) {
                            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                        }
                    }
                    return fmt;
                };
                return new Date(value).format("yyyy-MM-dd hh:mm:ss");
            },
            openHistory: function () {
                this.$router.push({
                    path: '/device-user/device_monitor/current-history',
                    query: {id: this.DeviceInfo.id}
                });
            },
            openDevice() {
                this.controlDevice(1);
            },
            closeDevice(){
                this.controlDevice(0);
            },
            controlDevice(sw){
                let data = {
                    concentrator: this.DeviceInfo.concentrator,
                    node: this.DeviceInfo.node,
                    circuit: this.DeviceInfo.circuit,
                    sw: sw
                };
                this.$store.dispatch('ControlDeviceMqtt', data).then((result) => {
                    if (result.code == 1) {
                        this.$Message.info("发送成功");
                        this.$emit("refrshData");
                    } else {
                        this.$Message.error("发送失败");
                    }
                }).catch((err) => {
                    this.$Message.error("发送出现错误");
                });
            }
        },

    }
</script>