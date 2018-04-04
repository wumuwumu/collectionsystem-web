<style>
    .device-node-key {
        font-weight: bold;
        margin-right: 3px;
    }

    .device-node-value {

    }
</style>

<template>
    <div @click="clickNode">
        <Col :md="12" style="padding: 10px">
        <Row style="background-color: #cdced0 ;padding: 10px">
            <Col span="20">
            <Row>
                <Col span="8">
                <span class="device-node-key">设备名：</span>
                <span class="device-node-value">{{DeviceInfo.name}}</span>
                </Col>
                <Col span="8">
                <span class="device-node-key">类型：</span>
                <span class="device-node-value">{{DeviceInfo.collectionType}}</span>
                </Col>
                <Col span="8">
                <span class="device-node-key">集中器：</span>
                <span class="device-node-value">{{DeviceInfo.concentrator}}</span>
                </Col>
                <Col span="8">
                <span class="device-node-key">节点:</span>
                <span class="device-node-value">{{DeviceInfo.node}}</span>
                </Col>
                <Col span="8">
                <span class="device-node-key">在线情况：</span>
                <span class="device-node-value">{{online}}</span>
                </Col>
                <Col span="8">
                <span class="device-node-key">数据：</span>
                <span class="device-node-value" style="color: #00a854">{{lastestData}}</span>
                </Col>
                <Col span="16">
                <span class="device-node-key">时间：</span>
                <span class="device-node-value">{{lastestDate}}</span>
                </Col>
            </Row>
            </Col>
            <Col span="4">
            <div>
                <a @click="goHistory">
                    <Icon type="stats-bars"></Icon>
                    历史曲线</a>
            </div>
            </Col>
        </Row>
        </Col>
    </div>
</template>

<script>
    import DataUtil from "../../../utils/DateUtil"
    export default{
        name: 'DeviceControlNode',
        props: {
            DeviceInfo: {}
        },
        computed: {
            lastestDate: function () {
                return DataUtil.formatDate(this.DeviceInfo.lastestTime);
            },
            online: function () {
                if (this.DeviceInfo.online == 1) {
                    return "在线";
                }
                return "离线";
            },
            lastestData: function () {
                if (this.DeviceInfo.collectionType == 'switch') {
                    if (this.DeviceInfo.lastestData == 1) {
                        return '开';
                    } else {
                        return '关';
                    }
                }
                return this.DeviceInfo.lastestData + this.DeviceInfo.showUnit;
            }
        },
        data: function () {
            return {}
        },
        methods: {
            clickNode: function () {
                this.$emit("clickNode", this.DeviceInfo);
            },
            goHistory: function () {
                this.$emit('toHistory', this.DeviceInfo);
            }
        }
    }
</script>