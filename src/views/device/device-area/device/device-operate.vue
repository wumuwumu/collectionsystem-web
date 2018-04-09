<style lang="less">
    @import '../../../../styles/common.less';
    /*@import './table.less';*/
</style>
<template>
    <div>
        <!--<Modal-->
        <!--v-model="AddDeviceModel"-->
        <!--title="添加设备"-->
        <!--@on-ok="operateDevice">-->
        <!--<Form ref="formInline" :model="formDevice">-->
        <!--<FormItem label="设备名:">-->
        <!--<Input type="text" v-model="formDevice.name" placeholder="name">-->
        <!--</Input>-->
        <!--</FormItem>-->
        <!--<FormItem label="集中器编号:">-->
        <!--<Input type="text" v-model="formDevice.concentrator" placeholder="concentrator">-->
        <!--</Input>-->
        <!--</FormItem>-->
        <!--<FormItem label="连接在集中器上:">-->
        <!--<checkbox v-model="ConcentratorLink"/>-->
        <!--</FormItem>-->
        <!--<FormItem label="节点ip:">-->
        <!--<Input :disabled="ConcentratorLink" type="text" v-model="formDevice.node" placeholder="node">-->
        <!--</Input>-->
        <!--</FormItem>-->
        <!--<FormItem label="回路位置:">-->
        <!--<Input type="text" v-model="formDevice.circuit" placeholder="circuit">-->
        <!--</Input>-->
        <!--</FormItem>-->
        <!--<FormItem label="传感器类型:">-->
        <!--<Select v-model="formDevice.collectionType" style="width:200px">-->
        <!--<Option v-for="item in DeviceTypeList" :value="item.collectionName" :key="item.collectionName">-->
        <!--{{ item.collectionName }}-->
        <!--</Option>-->
        <!--</Select>-->
        <!--</FormItem>-->
        <!--</Form>-->
        <!--</Modal>-->

        <Button type="primary" @click="back">返回</Button>
        <CollectionOperate :area="areaId"></CollectionOperate>
        <SwitchOperate :area="areaId"></SwitchOperate>
    </div>
</template>

<script>
    import CollectionOperate from './collection-operate.vue'
    import SwitchOperate from './switch-operate.vue'
    export default {
        name: 'DeviceOperate',
        components: {
            CollectionOperate, SwitchOperate
        },
        data () {
            return {
                areaId: 0,
            };
        },
        methods: {
            back(){
                this.$router.back();
            },
            loadData(){
                if (this.$route.query && this.$route.query != null && this.$route.query.id && this.$route.query.id != null) {
                    this.areaId = this.$route.query.id;

                }

            },

        },
        created () {
            this.loadData();
        }
    };
</script>

<style>

</style>
