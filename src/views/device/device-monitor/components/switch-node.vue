<template>
    <Col :sm="24" :md="12" :lg="6" :padding="4" style="min-width: 100px">

    <Card shadow style="background-color: #e9ebeb">
        <Row>
            <Col class="infor-card-icon-con" span="5">
            <Sicon type="huanjingchuanganqi" size="50" color="#ff000f"></Sicon>
            </Col>

            <Col span="19" class="height-100">
            <Row class="device-name-header" :style="{backgroundColor :Online}">
                <span class="device-name-content">{{SwitchInfo.name}}</span>
            </Row>
            <Row style="font-size: larger;margin-top: 10px">
                <!--<span>状态：</span>-->
                <i-switch size="large" v-model="SwitchStatus" @on-change="switchChange">
                    <span slot="open">开启</span>
                    <span slot="close">关闭</span>
                </i-switch>
                <Button type="primary" size="small" @click="setTimer">定时</Button>
                <Button type="primary" size="small" @click="setStrategy">策略</Button>
            </Row>

            <!--<Row style="margin-top: 10px;text-align: center">-->
            <!--<Button type="primary" @click="openDevice">打开</Button>-->
            <!--<Button type="error" style="margin-left: 10px" @click="closeDevice">关闭</Button>-->
            <!--</Row>-->
            </Col>
        </Row>
    </Card>
    </Col>
</template>

<script>

    import Sicon from '../../../admin-control/device/components/sicon.vue'

    export default{
        name: "switch-node",
        props: {
            SwitchInfo: {}
        },
        components: {
            Sicon
        },
        data: function () {
            return {
                SwitchStatus: false
            }
        },
        computed: {
            Online: function () {
                if (this.SwitchInfo.status > 0) {
                    this.SwitchStatus = true;
                } else {
                    this.SwitchStatus = false;
                }
                switch (this.SwitchInfo.online) {
                    case 1 :
                        return "#00cc66";
                        break;
                    default :
                        return "#ed3f14";
                        break;
                }
            },
        },
        methods: {
            controlDevice(sw){
                let data = {
                    concentrator: this.SwitchInfo.concentrator,
                    node: this.SwitchInfo.node,
                    circuit: this.SwitchInfo.circuit,
                    switchId: this.SwitchInfo.id,
                    sw: sw
                };
                this.$store.dispatch('ControlDeviceMqtt', data).then((result) => {
//                    if (result.code == 1) {
//                        this.$Message.info("发送成功");
//
//                    } else {
//                        this.$Message.error("发送失败");
//                    }
                }).catch((err) => {
                    this.$Message.error("发送出现错误");
                });
            },
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
            },
            setTimer(){
                this.$router.push({path: '/switch-timer/switch-timer-list', query: {id: this.SwitchInfo.id}});
            },
            setStrategy(){
                this.$router.push({path: '/switch-strategy/switch-strategy-list', query: {id: this.SwitchInfo.id}});
            }
        },
    }
</script>