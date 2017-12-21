<template>
    <div>
        <Row>
            <Col :sm="24" :md="6" :lg="5">
            <Card >
                <p slot="title" >
                    <Icon type="android-remove"></Icon>
                    设备列表
                </p>
                <Tree ref="deviceTree" :data="TreeData" @on-select-change="selectChange"></Tree>
            </Card>
            </Col>
            <Col :sm="24" :md="18" :lg="19" class="padding-left-10">
                <Card >
                    <div>
                        <Row>
                            <Col span="12">
                            <DatePicker type="date" placeholder="Select date" style="width: 200px"></DatePicker>
                            </Col>
                            <Col span="12">
                            <DatePicker type="daterange" placement="bottom-end" placeholder="Select date" style="width: 200px"></DatePicker>
                            </Col>
                        </Row>
                    </div>
                </Card>
            </Col>
        </Row>
    </div>
</template>
<script>
    export default {
        name: 'DeviceHistoryChart',
        components: {},
        data: function () {
            return {
                TreeData: [],
                CurrentDevice:{},
            }
        },
        methods: {
            getTreeDate () {
                this.$store.dispatch('GetDeviceTree').then((result) => {
                    console.log(result);
                    this.TreeData = result.data;
                }).catch((err) => {
                    this.$Message.error("获取设备树出现错误");
                });
            },
            selectChange(){
                let current = this.$refs.deviceTree.getSelectedNodes()[0];
                if(current.children != null){
                    this.CurrentDevice ={};
                    return;
                }
                this.CurrentDevice = current.id;
                console.log(this.CurrentDevice);
            }
        },
        mounted:function () {
            this.getTreeDate();
        }
    }
</script>