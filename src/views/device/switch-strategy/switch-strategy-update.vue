<style>

</style>
<template>
    <div>
        <Card>
            <Form ref="menuRef" :label-width="80">
                <FormItem label="区域">
                    <Select style="width:400px" v-model="areaId" @on-change="areaChange">
                        <Option v-for="item in areaList" :value="item.id" :key="item.id">
                            {{ item.areaName }}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="开关设备">
                    <Select v-model="FormItem.switchId" style="width:400px">
                        <Option v-for="item in switchList" :value="item.id" :key="item.id">
                            {{ item.name }}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="采集设备">
                    <Select v-model="FormItem.collectionId" style="width:400px">
                        <Option v-for="item in collectionList" :value="item.id" :key="item.id">
                            {{ item.name }}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="活动">
                    <RadioGroup v-model="FormItem.action">
                        <Radio label="0">关闭</Radio>
                        <Radio label="1">开启</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="类型">
                    <Select v-model="FormItem.type" style="width:400px">
                        <Option v-for="item in typeList" :value="item.id" :key="item.id">{{ item.label }}</Option>
                    </Select>
                    <Input v-model="FormItem.threshold" placeholder="A" style="width: 100px"/>
                </FormItem>
                <FormItem label="持续时长">
                    <Input v-model="FormItem.duration" placeholder="单位：分钟" style="width:400px"/>
                </FormItem>
                <FormItem label="生效">
                    <RadioGroup v-model="FormItem.work">
                        <Radio label="0">失效</Radio>
                        <Radio label="1">生效</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="updateStrategy">更新</Button>
                    <Button type="primary" @click="cancel">取消</Button>
                </FormItem>
            </Form>
        </Card>
    </div>
</template>


<script>
    export default{
        data(){
            return {
                FormItem: {
                    action: 1,
                    work: 1,
                    duration: 5,
                    type: 3,
                    switchId: 0,
                    collectionId: 0,
                    threshold: '',
                },
                areaList: [],
                switchList: [],
                collectionList: [],
                typeList: [
                    {
                        id: 3,
                        label: '数据大于A'
                    },
                    {
                        id: 4,
                        label: '数据小于A'
                    }
                ],
                strategyId: 0,
                areaId: 0
            }
        },
        components: {},
        computed: {},
        methods: {
            loadId(){
                if (this.$route.query && this.$route.query != null && this.$route.query.id && this.$route.query.id != null) {
                    this.strategyId = this.$route.query.id;

                }
                if (this.strategyId > 0) {
                    this.getStrategyInfo();
                }
            },
            areaChange(id){
                this.getCollection(id);
                this.getSwitch(id);
            },
            getArea: function () {
                //从服务器获取区域数据
                this.$store.dispatch('GetUserArea').then((result) => {
                    this.areaList = result.data;
                }).catch((err) => {
                    this.$Message.error("获取区域出现错误");
                });
            },
            getSwitch: function (area) {
                this.$store.dispatch('GetAreaSwitch', area).then((result) => {
                    this.switchList = result.data;
                }).catch((err) => {

                });
            },
            getCollection: function (area) {
                this.$store.dispatch('GetAreaDevice', area).then((result) => {
                    this.collectionList = result.data;
                }).catch((err) => {

                });
            },
            getStrategyInfo: function () {
                this.$store.dispatch('GetStrategyInfo', this.strategyId).then((result) => {
                    this.FormItem = result.data;
                    console.log(this.FormItem);
                    this.getSwitchInfo(this.FormItem.switchId)

                }).catch((err) => {

                });
            },
            getSwitchInfo: function (id) {
                this.$store.dispatch('GetSwitchInfo', id).then((result) => {
                    if (result.code == 1) {
                        this.areaId = result.data.areaId;
                        this.getSwitch(this.FormItem.switchId);
                        this.getCollection(this.FormItem.collectionId);
                    }
                }).catch((err) => {
                    this.$Message.error("获取设备信息出现错误");
                });
            },
            updateStrategy(){
                if (this.FormItem.switchId > 0 && this.FormItem.collectionId > 0 && this.FormItem.threshold.length > 0) {
                    if (isNaN(this.FormItem.threshold) || this.FormItem.threshold < 0) {
                        this.$Message.warning("A不符合要求");
                        return;
                    }
                    if (isNaN(this.FormItem.duration) || this.FormItem.duration < 0) {
                        this.$Message.warning("持续时长不符合要求");
                        return;
                    }
                    this.FormItem.duration = Math.floor(this.FormItem.duration);
                    this.$store.dispatch('UpdateStrategy', this.FormItem).then((result) => {
                        if (result.code == 1) {
                            this.$router.back();
                            this.$store.commit('closeOneTag', this);
                        } else {
                            this.$Message.warning("更新失败");
                        }
                    }).catch((err) => {

                    });
                } else {
                    this.$Message.warning("参数不符合要求");
                }
            },
            cancel(){
                this.$router.back();
                this.$store.commit('closeOneTag', this);
            }
        },
        created: function () {
            this.getArea();
            this.loadId();
        }
    }
</script>