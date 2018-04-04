<template>
    <div>
        <Col :md="12" style="padding: 10px">
        <Row style="background-color: #cdced0 ;padding: 10px">
            <Col span="20">
            <Row>
                <Col span="8">
                <span class="device-node-key">设备名：</span>
                <span class="device-node-value">{{SwitchInfo.name}}</span>
                </Col>
                <Col span="8">
                <span class="device-node-key">集中器：</span>
                <span class="device-node-value">{{SwitchInfo.concentrator}}</span>
                </Col>
                <Col span="8">
                <span class="device-node-key">节点:</span>
                <span class="device-node-value">{{SwitchInfo.node}}</span>
                </Col>
                <Col span="8">
                <span class="device-node-key">回路:</span>
                <span class="device-node-value">{{SwitchInfo.circuit}}</span>
                </Col>
                <Col span="8">
                <span class="device-node-key">在线情况：</span>
                <span class="device-node-value">{{online}}</span>
                </Col>
                <Col span="8">
                <span class="device-node-key">开关：</span>
                <i-switch size="large" v-model="switchStatus" @on-change="switchChange">
                    <span slot="open">开启</span>
                    <span slot="close">关闭</span>
                </i-switch>
                </Col>
                <Col span="16">
                <span class="device-node-key">时间：</span>
                <span class="device-node-value">{{lastestDate}}</span>
                </Col>
            </Row>
            </Col>
            <Col span="4">
            <div>
                <a>
                    <Icon type="stats-bars"></Icon>
                    配置</a>
            </div>
            </Col>
        </Row>
        </Col>
    </div>
</template>

<script>
    import DateUtil from  "../../../utils/DateUtil"
    export default{
        name: 'switch-control-node',
        props: {
            SwitchInfo: {}
        },
        data(){
            return {
                switchStatus: false
            }
        },
        computed: {
            online: function () {
                if (this.SwitchInfo.status > 0) {
                    this.switchStatus = true;
                } else {
                    this.switchStatus = false;
                }
                if (this.SwitchInfo.online > 0) {
                    return "在线";
                } else {
                    return "离线";
                }
            },
            lastestDate(){
                return DateUtil.formatDate(this.SwitchInfo.lastestTime);
            }
        },
        methods: {
            handleSpinShow () {
                this.$Spin.show();
                setTimeout(() => {
                    this.$Spin.hide();
                    this.$emit("refrshData");
                }, 3000);
            },
            switchChange(status){
                this.handleSpinShow();
                if (status) {
                    this.controlDevice(1);
                } else {
                    this.controlDevice(0);
                }
            }
        },
        created(){

        }
    }
</script>