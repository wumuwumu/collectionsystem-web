<template>
    <div>
        <Row>
            <Col :xs="24" :sm="6" :md="4" :lg="4">
            <Card>
                <p slot="title" @click="getAreaTreeData">
                    <Icon type="android-remove"></Icon>
                    区域管理
                </p>
                <Tree :data="AreaTreeData"
                      @on-select-change="clickTree"
                      ref="Tree"
                ></Tree>
            </Card>
            </Col >
            <Col :xs="24" :sm="18" :md="20" :lg="20" style="padding-left: 15px">
            <Card>
                <DeviceList :areaId="AreaId"/>
            </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
    import DeviceList from '../../device/device-monitor/components/device-list.vue'
    export default{
        name: 'DeviceMonitorControl',
        data: function () {
            return {
                AreaTreeData: [],
                AreaId: 0,
            }
        },
        components: {
            DeviceList
        },
        methods: {
            getAreaTreeData(){
                this.$store.dispatch('GetAllAreaTree').then((result) => {
                    this.AreaTreeData = result.data;
                }).catch((err) => {
                    this.$Message.error("获取区域出现出现错误");
                });
            },
            clickTree(current){
                if (current.length < 1) {
                    return;
                }
                if (current[0].children != undefined || current[0].children != null) {
//                    this.AreaId = 0;
                    return;
                }
                this.AreaId = current[0].id;
            }
        },
        mounted(){
            this.getAreaTreeData();
        }
    }
</script>