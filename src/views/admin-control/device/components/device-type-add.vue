<template>
    <div>
        <DeviceIconDialog v-model="SelectIconModel" @select="selectIcon"></DeviceIconDialog>
        <DeviceColorDialog v-model="SelectColorModel" :iconType="FormItem.showIcon"
                           @select="selectIconColor"></DeviceColorDialog>
        <Spin size="large" fix v-if="spinShow"></Spin>
        <Card>
            <p slot="title">
                <span>{{FormItem.id ? '编辑' : '新增'}}</span>
            </p>
            <Form ref="menuRef" :model="FormItem" :label-width="80">
                <FormItem label="名称">
                    <Input v-model="FormItem.collectionName" placeholder="类型名称"></Input>
                </FormItem>
                <FormItem label="计算公式">
                    <Input v-model="FormItem.collectionFormula" placeholder="使用a替换输入参数"></Input>
                </FormItem>
                <FormItem label="单位">
                    <Input v-model="FormItem.showUnit" placeholder="计算单位"></Input>
                </FormItem>
                <FormItem label="图标">
                    <Sicon :type="FormItem.showIcon" v-model="FormItem.showIcon"></Sicon>
                    <Button type="text" @click="SelectIconModel=true">选择</Button>
                </FormItem>
                <FormItem label="图标颜色">
                    <Sicon :type="FormItem.showIcon" v-model="FormItem.showIcon"
                           :color="FormItem.showIconcolor"></Sicon>
                    <Button type="text" @click="SelectColorModel=true">选择</Button>
                </FormItem>
                <FormItem>
                    <Button v-show="FormItem.id" type="primary" @click="updateDeviceType">保存</Button>
                    <Button v-show="!FormItem.id" type="primary" @click="addDeviceType">添加</Button>
                    <Button type="primary" @click="cancelEdit">取消</Button>
                </FormItem>
            </Form>
        </Card>

    </div>
</template>

<script>
    import  DeviceIconDialog from './device-icon-dialog.vue'
    import Sicon from './sicon.vue'
    import {Photoshop} from 'vue-color'
    import DeviceColorDialog from './device-color-dialog.vue'


    export default{
        name: 'DeviceTypeAdd',
        props: {},
        components: {
            DeviceIconDialog,
            Sicon,
            DeviceColorDialog
        },
        data: function () {
            return {
                FormItem: {
                    id: null
                },
                SelectIconModel: false,
                SelectColorModel: false,
                SelectColorModel: false,
                spinShow: false
            }
        },
        methods: {
            loadData(){
                if (this.$route.query && this.$route.query != null && this.$route.query.id && this.$route.query.id != null) {
                    console.log(this.$route.query.id);
                    this.FormItem.id = this.$route.query.id;
                } else {
                    this.$store.commit("SET_OPERATING_DEVICETYPE", {});
                }
                if (this.FormItem.id > 0) {
                    this.FormItem = this.$store.getters.operatingDeviceType;
                    console.log(this.form);
                }

            },
            selectIcon(val){
                console.log(val);
                this.FormItem.showIcon = val;
            },
            selectIconColor(val){
                this.FormItem.showIconcolor = val;
            },
            addDeviceType(){
                let data = {
                    collectionName: this.FormItem.collectionName,
                    collectionFormula: this.FormItem.collectionFormula,
                    showIcon: this.FormItem.showIcon,
                    showUnit: this.FormItem.showUnit,
                    showIconcolor: this.FormItem.showIconcolor
                };
                this.spinShow = true;
                this.$store.dispatch('AddDeviceType', data).then((result) => {
                    if (result.code == 1) {
                        this.updatePage();
                    } else {
                        this.spinShow = false;
                        this.$Message.error('添加失败');
                    }
                }).catch((err) => {
                    this.spinShow = false;
                    this.$Message.error("获取设备类型出现错误");
                });
            },
            updateDeviceType(){
                let data = {
                    id: this.FormItem.id,
                    collectionName: this.FormItem.collectionName,
                    collectionFormula: this.FormItem.collectionFormula,
                    showIcon: this.FormItem.showIcon,
                    showUnit: this.FormItem.showUnit,
                    showIconcolor: this.FormItem.showIconcolor
                };
                this.spinShow = true;
                this.$store.dispatch('UpdateDeviceType', data).then((result) => {
                    if (result.code == 1) {
                        this.updatePage();
                    } else {
                        this.spinShow = false;
                        this.$Message.error('添加失败');
                    }
                }).catch((err) => {
                    this.spinShow = false;
                    this.$Message.error("获取设备类型出现错误");
                });
            },
            cancelEdit(){
                this.$router.push({path: '/device-admin/device-type-control'});
            },
            updatePage(){
                this.spinShow = false;
                this.$router.push({path: '/device-admin/device-type-control'});
            }

        },
        created(){
            this.loadData();
        },
    }
</script>