<style lang="less">
    @import 'styles/device-node.less';
</style>

<template>
    <Col :sm="24" :md="12" :lg="6" :padding="4" style="min-width: 100px">
    <Card shadow style="background-color: #e9ebeb;margin-bottom: 5px">
        <div class="infor-card-con">
            <!--<Row class="device-name" :style="{backgroundColor: color}">-->
            <!--<span  >{{DeviceName}}</span>-->
            <!--</Row>-->
            <Col class="infor-card-icon-con" span="5">
            <Row class="height-100" type="flex" align="middle" justify="center">
                <!--<img style="text-align: center" height="70px" width="70px" :src="IconData"/>-->
                <Sicon :type="DeviceInfo.showIcon" size="50" :color="DeviceInfo.showIconcolor"></Sicon>
            </Row>
            </Col>

            <Col span="19" class="height-100">
            <Row class="device-name-header" :style="{backgroundColor: Online}">
                <span class="device-name-content">{{DeviceInfo.name}}</span>
            </Row>
            <Row type="flex" align="middle">
                <Col class="device-info-col">
                <Row>{{DataName}}：<span
                        style="font-size: large"
                        :style="{color:dataAlarm}">{{DeviceInfo.lastestData}}{{DeviceInfo.showUnit}}</span></Row>
                <Row>时间：<span style="" class="infor-intro-text">{{DeviceDate}}</span></Row>
                </Col>
            </Row>
            <Row style="margin: 10px">
                <Button type="info" size="small" @click="openHistory">历史记录</Button>
            </Row>
            </Col>
        </div>
    </Card>
    </Col>
</template>
<script>

    import Sicon from '../../../admin-control/device/components/sicon.vue'
    import DateUtil from '../../../../utils/DateUtil'

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
            dataAlarm: function () {
                if (this.DeviceInfo.maxValue != null && this.DeviceInfo.lastestData > this.DeviceInfo.maxValue) {
                    return '#ff3738';
                } else if (this.DeviceInfo.minValue != null && this.DeviceInfo.lastestData < this.DeviceInfo.minValue) {
                    return '#00ffff';
                }
            },
            DeviceDate: function () {
                return DateUtil.formatDate(this.DeviceInfo.lastestTime);
            },
        },
        methods: {
            openHistory: function () {
                this.$router.push({
                    path: '/device-user/device_monitor/current-history',
                    query: {id: this.DeviceInfo.id}
                });
            },

        },

    }
</script>