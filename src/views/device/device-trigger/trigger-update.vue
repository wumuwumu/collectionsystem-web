<template>
    <div>
        <Card>
            <Form ref="menuRef" :model="DeviceTrigger" :label-width="80">
                <FormItem label="名字">
                    <Input v-model="DeviceTrigger.name" placeholder="名字" style="max-width: 200px"></Input>
                </FormItem>
                <FormItem label="区域">
                    <Select style="width:200px" @on-change="AreaChange" v-model="AreaId">
                        <Option v-for="item in AreaList" :value="item.id" :key="item.id">
                            {{ item.areaName }}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="设备">
                    <Select v-model="DeviceTrigger.deviceId" style="width:200px">
                        <Option v-for="item in DeviceList" :value="item.id" :key="item.id">
                            {{ item.name }}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="触发条件">
                    <Select v-model="TriggerType" style="width:200px">
                        <Option v-for="item in TypeList" :value="item.id" :key="item.id">
                            {{ item.name }}
                        </Option>
                    </Select>
                    <div style="margin-top: 10px">
                        <Input v-show="AShow" v-model="AValue" placeholder="A" style="max-width: 200px"></Input>
                        <Input v-show="BShow" v-model="BValue" placeholder="B" style="max-width: 200px"></Input>
                    </div>
                </FormItem>
                <FormItem label="报警方式">
                    <RadioGroup v-model="DeviceTrigger.alarmType">
                        <Radio label="email">邮箱</Radio>
                        <Radio label="sms">短信</Radio>
                    </RadioGroup>
                    <Input v-model="Accepter" :placeholder="DeviceTrigger.alarmType"
                           style="max-width: 250px"></Input>
                    <span v-if="!IsAccepted" style="color: red">不符合要求</span>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="updateTrigger">更新</Button>
                    <Button type="primary" @click="cancel">取消</Button>
                </FormItem>
            </Form>
        </Card>
    </div>
</template>

<script>
    import CommonUtil from "../../../utils/CommonUtil"
    export default{
        name: 'TriggerUpdate',
        data: function () {
            return {
                DeviceTriggerId: 0,
                DeviceTrigger: {},
                AShow: false,
                BShow: false,
                AValue: "",
                BValue: "",
                TypeList: [
                    {
                        id: 3,
                        name: '数值大于A'
                    },
                    {
                        id: 4,
                        name: '数值小于A'
                    },
                    {
                        id: 5,
                        name: '数值小于A大于B'
                    },
                    {
                        id: 6,
                        name: '数值大于A小于B'
                    }
                ],
                TriggerType: 3,
                Accepter: '',
                IsAccepted: true,
                AreaList: [],
                AreaId: 0,
                DeviceList: []

            }
        },
        watch: {
            TriggerType: function () {
                this.updateThreshold();
            },
            AValue: function () {
                this.updateThreshold();
            },
            BValue: function () {
                this.updateThreshold();
            },
            Accepter: function () {
                switch (this.DeviceTrigger.alarmType) {
                    case 'email':
                        if (CommonUtil.validateEmail(this.Accepter)) {
                            this.IsAccepted = true;
                            this.DeviceTrigger.accepter = this.Accepter;
                        } else {
                            this.DeviceTrigger.accepter = "";
                            this.IsAccepted = false;
                        }
                        break;
                    case 'sms':
                        if (CommonUtil.validatePhone(this.Accepter)) {
                            this.IsAccepted = true;
                            this.DeviceTrigger.accepter = this.Accepter;
                        } else {
                            this.DeviceTrigger.accepter = "";

                            this.IsAccepted = false;
                        }
                        break;
                }
            }
        },
        methods: {
            getId(){
                if (this.$route.query && this.$route.query != null && this.$route.query.id && this.$route.query.id != null) {
                    this.DeviceTriggerId = this.$route.query.id;
                }
                if (this.DeviceTriggerId > 0) {
                    this.getDeviceTrigger();
                }
            },
            getArea: function () {
                //从服务器获取区域数据
                this.$store.dispatch('GetUserArea').then((result) => {
                    this.AreaList = result.data;
                }).catch((err) => {
                    this.$Message.error("获取区域出现错误");
                });
            },
            getDevice: function (area) {
                if (area > 0) {
                    this.$store.dispatch('GetAreaDevice', area).then((result) => {
                        this.DeviceList = result.data;
                    }).catch((err) => {
                        this.$Message.error("获取区域设备出现错误");
                    });
                }

            },
            getDeviceInfo: function (id) {
                this.$store.dispatch('GetDeviceInfo', id).then((result) => {
                    if (result.code == 1) {
                        this.AreaId = result.data.area;
                        this.getDevice(this.AreaId);
                    }
                }).catch((err) => {
                    this.$Message.error("获取设备信息出现错误");
                });
            },
            getDeviceTrigger(){
                this.$store.dispatch('GetTriggerInfo', this.DeviceTriggerId).then((result) => {
                    if (result.code == 1) {
                        this.DeviceTrigger = result.data;
                        this.TriggerType = this.DeviceTrigger.type;
                        this.Accepter = this.DeviceTrigger.accepter;
                        this.getDeviceInfo(result.data.deviceId);
                    } else {
                    }
                }).catch((err) => {
                    this.$Message.error("获取设备触发器出错");
                });
            },
            updateTrigger(){
                if (this.DeviceTrigger.deviceId > 0 && this.DeviceTrigger.accepter != "" && this.DeviceTrigger.name != "") {

                    this.DeviceTrigger.type = this.TriggerType;
                    this.$store.dispatch('UpdateTrigger', this.DeviceTrigger).then((result) => {
                        if (result.code == 1) {
                            this.$store.commit('closeOneTag', this);
                            this.$router.push({path: '/device-trigger/trigger-list'});
                        } else {
                            this.$Message.error("更新触发器出错");
                        }
                    }).catch((err) => {
                        this.$Message.error("更新触发器出错");
                    });
                } else {
                    this.$Message.warning("请选择相关参数");
                }
            },
            cancel(){
                this.$store.commit('closeOneTag', this);
                this.$router.back();
            },
            AreaChange: function (area) {
                this.getDevice(area);
            },
            updateThreshold(){
                switch (this.TriggerType) {
                    case 3:
                        this.AShow = true;
                        this.BShow = false;
                        this.DeviceTrigger.threshold = this.AValue;
                        break;
                    case 4:
                        this.AShow = true;
                        this.BShow = false;
                        this.DeviceTrigger.threshold = this.AValue;
                        break;
                    case 5:
                        this.AShow = true;
                        this.BShow = true;
                        this.DeviceTrigger.threshold = this.AValue + '#' + this.BValue;
                        break;
                    case 6:
                        this.AShow = true;
                        this.BShow = true;
                        this.DeviceTrigger.threshold = this.AValue + '#' + this.BValue;
                        break;
                    default:
                        this.AShow = false;
                        this.BShow = false;
                        this.DeviceTrigger.threshold = null;
                        break;
                }
            },
        },
        created: function () {
            this.getId();
            this.getArea();
        }
    }
</script>