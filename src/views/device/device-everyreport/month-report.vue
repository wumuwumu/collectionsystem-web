<template>
    <div>
        <Row>
            <Col :sm="24" :md="6" :lg="5">
            <Card>
                <p slot="title">
                    <Icon type="android-remove"></Icon>
                    设备列表
                </p>
                <Tree ref="deviceTree" :data="TreeData" @on-select-change="selectChange"></Tree>
            </Card>
            </Col>
            <Col :sm="24" :md="18" :lg="19" class="padding-left-10">
            <Card>

            </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
    export default{
        name: 'MonthReport',
        data: function () {
            return {
                TreeData: [],
            }
        },
        methods: {
            getTreeDate () {
                this.$store.dispatch('GetDeviceTree').then((result) => {
                    this.TreeData = result.data;
                }).catch((err) => {
                    this.$Message.error("获取设备树出现错误");
                });
            },
            selectChange(){

            }
        },
        mounted: function () {
            this.getTreeDate();
        }
    }
</script>