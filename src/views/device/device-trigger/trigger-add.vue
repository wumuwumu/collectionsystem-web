<template>
    <div>
        <Card>
            <Form ref="menuRef" :model="FormItem" :label-width="80">
                <FormItem label="名字">
                    <Input v-model="FormItem.name" placeholder="名字" style="max-width: 200px"></Input>
                </FormItem>
                <FormItem label="区域">
                    <Select style="width:200px" @on-change="AreaChange">
                        <Option v-for="item in AreaList" :value="item.id" :key="item.id">
                            {{ item.areaName }}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="设备">
                    <Select v-model="FormItem.deviceId" style="width:200px">
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
                    <RadioGroup v-model="FormItem.alarmType">
                        <Radio label="email">邮箱</Radio>
                        <Radio label="sms">短信</Radio>
                    </RadioGroup>
                    <Input v-model="Accepter" :placeholder="FormItem.alarmType"
                           style="max-width: 250px"></Input>
                    <span v-if="!IsAccepted" style="color: red">不符合要求</span>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="addTrigger">添加</Button>
                    <Button type="primary" @click="cancel">取消</Button>
                </FormItem>
            </Form>
        </Card>
    </div>
</template>

<script>
    import CommonUtil from '../../../utils/CommonUtil'
    export default {
        name: 'TriggerAdd',
        data: function () {
            return {
                FormItem: {
                    alarmType: "email",
                    deviceId: 0,
                    accepter: ""
                },
                AreaList: [],
                DeviceList: [],
                AShow: false,
                BShow: false,
                AValue: "",
                BValue: "",
                TypeList: [
                    {
                        id: 1,
                        name: '开关ON'
                    },
                    {
                        id: 2,
                        name: '开关OFF'
                    },
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
                TriggerType: 1,
                Accepter: '',
                IsAccepted: true,
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
                switch (this.FormItem.alarmType) {
                    case 'email':
                        if (CommonUtil.validateEmail(this.Accepter)) {
                            this.IsAccepted = true;
                            this.FormItem.accepter = this.Accepter;
                        } else {
                            this.FormItem.accepter = "";
                            this.IsAccepted = false;
                        }
                        break;
                    case 'sms':
                        if (CommonUtil.validatePhone(this.Accepter)) {
                            this.IsAccepted = true;
                            this.FormItem.accepter = this.Accepter;
                        } else {
                            this.FormItem.accepter = "";

                            this.IsAccepted = false;
                        }
                        break;
                }
            }
        },
        methods: {
            getArea: function () {
                //从服务器获取区域数据
                this.$store.dispatch('GetUserArea').then((result) => {
                    this.AreaList = result.data;
                }).catch((err) => {
                    this.$Message.error("获取区域出现错误");
                });
            },
            getDevice: function (area) {
                this.$store.dispatch('GetAreaDevice', area).then((result) => {
                    this.DeviceList = result.data;
                }).catch((err) => {
                    console.log("获取区域设备出现错误");
                    this.$Message.error(err);
                });
            },
            addTrigger(){
                if (this.FormItem.deviceId > 0 && this.FormItem.accepter != "" && this.FormItem.name != "") {

                    this.FormItem.type = this.TriggerType;
                    this.$store.dispatch('AddTrigger', this.FormItem).then((result) => {
                        if (result.code == 1) {
                            this.$store.commit('closeOneTag', this);
                            this.$router.push({path: '/device-trigger/trigger-list'});
                        } else {
                            this.$Message.error("添加触发器出错");
                        }
                    }).catch((err) => {
                        this.$Message.error(err);
                    });
                } else {
                    this.$Message.warning("请选择相关参数");
                }

            },
            cancel: function () {
                this.$store.commit('closeOneTag', this);
                this.$router.push({path: '/device-trigger/trigger-list'});
            },
            updateThreshold(){
                switch (this.TriggerType) {
                    case 3:
                        this.AShow = true;
                        this.BShow = false;
                        this.FormItem.threshold = this.AValue;
                        break;
                    case 4:
                        this.AShow = true;
                        this.BShow = false;
                        this.FormItem.threshold = this.AValue;
                        break;
                    case 5:
                        this.AShow = true;
                        this.BShow = true;
                        this.FormItem.threshold = this.AValue + '#' + this.BValue;
                        break;
                    case 6:
                        this.AShow = true;
                        this.BShow = true;
                        this.FormItem.threshold = this.AValue + '#' + this.BValue;
                        break;
                    default:
                        this.AShow = false;
                        this.BShow = false;
                        this.FormItem.threshold = null;
                        break;
                }
            },
            AreaChange: function (area) {
                this.getDevice(area);
            }
        },
        created: function () {
            this.getArea();
        }
    }
</script>