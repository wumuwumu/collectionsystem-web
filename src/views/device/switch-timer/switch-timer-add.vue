<template>
    <div>
        <Card>
            <Form ref="menuRef" :model="FormItem" :label-width="80">
                <FormItem label="区域">
                    <Select style="width:400px" @on-change="AreaChange">
                        <Option v-for="item in AreaList" :value="item.id" :key="item.id">
                            {{ item.areaName }}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="设备">
                    <Select v-model="FormItem.switchId" style="width:400px">
                        <Option v-for="item in DeviceList" :value="item.id" :key="item.id">
                            {{ item.name }}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="时间">
                    <TimePicker v-model="startTime" format="HH点mm分ss秒" placeholder="Select time"
                                style="width: 400px"></TimePicker>
                </FormItem>
                <FormItem label="活动">
                    <RadioGroup v-model="FormItem.action">
                        <Radio label="0">关闭</Radio>
                        <Radio label="1">开启</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="循环方式">
                    <Select v-model="loop" style="width:400px" multiple>
                        <Option v-for="item in weekList" :value="item.id" :key="item.id">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="持续时长">
                    <Input v-model="FormItem.duration" style="width:400px"/>
                </FormItem>
                <FormItem label="生效">
                    <i-Switch size="large" v-model="work">
                    </i-Switch>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="addTimer">添加</Button>
                    <Button type="primary" @click="cancel">取消</Button>
                </FormItem>
            </Form>
        </Card>
    </div>
</template>

<script>
    import DateUtil from '../../../utils/DateUtil'
    export default{
        data(){
            return {
                weekList: [
                    {
                        id: 1,
                        label: '星期一'
                    },
                    {
                        id: 2,
                        label: '星期二'
                    },
                    {
                        id: 3,
                        label: '星期三',
                    },
                    {
                        id: 4,
                        label: '星期四',
                    },
                    {
                        id: 5,
                        label: '星期五',
                    },
                    {
                        id: 6,
                        label: '星期六',
                    },
                    {
                        id: 7,
                        labe: '星期天'
                    }
                ],
                FormItem: {
                    action: 1,
                    loop: [],
                    startTime: null,
                    duration: 0,
                    work: 1
                },
                AreaList: [],
                DeviceList: [],
                startTime: null,
                loop: [],
                work: false,
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
                this.$store.dispatch('GetAreaSwitch', area).then((result) => {
                    this.DeviceList = result.data;
                }).catch((err) => {
                    console.log("获取区域设备出现错误");
                    this.$Message.error(err);
                });
            },
            addTimer(){
                if (this.FormItem.switchId > 0 && this.startTime != null && this.loop.length > 0 && this.FormItem.duration > 0) {
                    this.FormItem.startTime = DateUtil.transDate2Sec(this.startTime);
                    this.FormItem.loop = this.loop.toString();
                    if (this.work) {
                        this.FormItem.work = 1;
                    } else {
                        this.FormItem.work = 0;
                    }
                    this.$store.dispatch('AddTimer', this.FormItem).then((result) => {
                        if (result.code == 1) {
                            this.$Message.info("添加成功");
                            this.$store.commit('closeOneTag', this);
                            this.$router.push({path: "/switch-timer/switch-timer-list"});
                        } else {
                            this.$Message.warning("添加成功");
                        }
                    }).catch((err) => {
                        this.$Message.warning("添加成功");
                    });

                } else {
                    this.$Message.info("参数不符合要求");
                }
            },
            AreaChange(id){
                this.getDevice(id);
            },
            cancel(){
                this.$router.back();
                this.$store.commit('closeOneTag', this);
            }
        },
        created: function () {
            this.getArea();
        }
    }
</script>