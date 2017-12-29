<style lang="less">
    @import 'styles/device-node.less';
</style>

<template>
    <Col :sm="24" :md="12" :lg="8" :padding="4" style="margin-bottom: 16px;min-width: 100px">
    <Card shadow style="background-color: #e9ebeb">

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
            </Col>
        </div>
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
                console.log("处理子类")
                return this.dateForm(this.DeviceInfo.lastestTime);
            },
//            DeviceData: function () {
//                switch (this.DeviceInfo.collectionType) {
//                    case temperature :
//                        return this.DeviceInfo.lastestData + ' ℃'
//                            ;
//                        break;
//                    case dampness  :
//                        return this.DeviceInfo.lastestData + ' RH'
//                            ;
//                        break;
//                    case pressure:
//                        return this.DeviceInfo.lastestData + ' MPa'
//                            ;
//                        break;
//                    case wind  :
//                        return this.DeviceInfo.lastestData + ' m/s'
//                            ;
//                        break;
//                    case illuminance :
//                        return this.DeviceInfo.lastestData + ' LX'
//                            ;
//                        break;
//                    case electricity  :
//                        return this.DeviceInfo.lastestData + ' A'
//                            ;
//                        break;
//                    case voltage :
//                        return this.DeviceInfo.lastestData + ' V'
//                            ;
//                        break;
//                    default :
//                        return this.DeviceInfo.lastestData
//                            ;
//                        break;
//                }
//            },
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
            }
        }
    }
</script>