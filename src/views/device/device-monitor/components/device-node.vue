<style lang="less">
    @import 'styles/device-node.less';
</style>

<template>
    <Col :sm="24" :md="12" :lg="6" :padding="3" style="margin-bottom: 16px">
    <Card shadow style="background-color: #e9ebeb">

        <div class="infor-card-con">
            <!--<Row class="device-name" :style="{backgroundColor: color}">-->
            <!--<span  >{{DeviceName}}</span>-->
            <!--</Row>-->
            <Col class="infor-card-icon-con" span="8">
            <Row class="height-100" type="flex" align="middle" justify="center">
                <img style="text-align: center" height="70px" width="70px" :src="IconData"/>
            </Row>
            </Col>

            <Col span="16" class="height-100">
            <Row class="device-name-header" :style="{backgroundColor: Online}">
                <span class="device-name-content">{{DeviceInfo.name}}</span>
            </Row>
            <Row type="flex" align="middle">
                <Col class="device-info-col">
                <Row>{{DataName}}：<span style="font-size: large">{{DeviceData}}</span></Row>
                <Row>时间：<span style="font-size: medium" class="infor-intro-text">{{DeviceDate}}</span></Row>
                </Col>
            </Row>
            </Col>
        </div>
    </Card>
    </Col>
</template>
<script>
    import temperature from '@/images/temperature.png';
    import dampness from '@/images/dampness.png';
    import pressure from '@/images/pressure.png';
    import wind from '@/images/wind.png';
    import illuminance from '@/images/illuminance.png';
    import electricity from '@/images/electricity.png';
    import voltage from '@/images/voltage.png';
    import sensor from '@/images/sensor.png';

    export default{
        name: 'DeviceNode',
        props: {
            DeviceInfo: {
            }
        },
        data(){
            return {
            }
        },
        computed: {
            DataName: function () {
                return this.DeviceInfo.collectionType;
            },
            IconData: function () {
                return require('@/images/' + this.DeviceInfo.collectionType + '.png')
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
            DeviceData: function () {
                switch (this.DeviceInfo.collectionType) {
                    case temperature :
                        return this.DeviceInfo.lastestData + ' ℃'
                            ;
                        break;
                    case dampness  :
                        return this.DeviceInfo.lastestData + ' RH'
                            ;
                        break;
                    case pressure:
                        return this.DeviceInfo.lastestData + ' MPa'
                            ;
                        break;
                    case wind  :
                        return this.DeviceInfo.lastestData + ' m/s'
                            ;
                        break;
                    case illuminance :
                        return this.DeviceInfo.lastestData + ' LX'
                            ;
                        break;
                    case electricity  :
                        return this.DeviceInfo.lastestData + ' A'
                            ;
                        break;
                    case voltage :
                        return this.DeviceInfo.lastestData + ' V'
                            ;
                        break;
                    default :
                        return this.DeviceInfo.lastestData
                            ;
                        break;
                }
            },
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