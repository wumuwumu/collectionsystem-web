<style lang="less">
    @import '../../../styles/common.less';
    /*@import './table.less';*/
</style>
<template>
    <div>
        <Modal
            v-model="AddAreaModel"
            title="添加区域"
            @on-ok="addArea">
            <tr>
                <td >区域名称:</td>
                <td >
                    <input type="text" class="margin-left-10" placeholder="区域名称" v-model="AddAreaName" >
                </td>
            </tr>
        </Modal>
        <Modal
                v-model="UpdateAreaModel"
                title="删除区域"
                @on-ok="updateArea">
            <tr>
                <td >区域名称:</td>
                <td >
                    <input type="text" class="margin-left-10" placeholder="区域名称" v-model="UpdateAreaName" >
                </td>
            </tr>
        </Modal>
        <!--添加设备的对话框-->
        <Modal
                v-model="AddDeviceModel"
                title="添加设备"
                @on-ok="operateDevice">
            <Form ref="formInline" :model="formDevice"  >
                <FormItem label="设备名:">
                    <Input type="text" v-model="formDevice.name" placeholder="name">
                    </Input>
                </FormItem>
                <FormItem label="集中器编号:">
                    <Input type="text" v-model="formDevice.concentrator" placeholder="concentrator">
                    </Input>
                </FormItem>
                <FormItem label="连接在集中器上:">
                    <checkbox v-model="ConcentratorLink"/>
                </FormItem>
                <FormItem label="节点ip:">
                    <Input :disabled="ConcentratorLink" type="text" v-model="formDevice.node" placeholder="node">
                    </Input>
                </FormItem>
                <FormItem label="回路位置:">
                    <Input type="text" v-model="formDevice.circuit" placeholder="circuit">
                    </Input>
                </FormItem>
                <FormItem label="传感器类型:">
                    <Select v-model="formDevice.collectionType" style="width:200px">
                        <Option v-for="item in DeviceTypeList" :value="item.collectionName" :key="item.collectionName">{{ item.collectionName }}</Option>
                    </Select>
                </FormItem>
            </Form>
        </Modal>
        <Row class="margin-top-10">
            <Col :sm="24" :md="6" :lg="5">

            <Card v-if="AreaShow">
                <!--<Button type="info" size="small" @click="AddAreaModel=true">添加区域</Button>-->
                <!--<Button type="success" size="small" @click="updatePreArea()">更新区域</Button>-->
                <!--<Button type="error" size="small" @click="deleteArea()">删除区域</Button>-->
                <!--<Button size="small" @click="refreshArea()">刷新区域</Button>-->
                <p slot="title" >
                    <Icon type="android-remove"></Icon>
                    区域管理
                </p>
                <div class=" margin-top-8" >
                    <Table  :columns="editInlineColumns" height="auto" :show-header="false" :data="editInlineData"
                           @on-current-change="selectArea"
                           highlight-row
                    ></Table>
                </div>
            </Card>
            </Col>
            <Col :sm="24" :md="18" :lg="19" class="padding-left-10">
            <Card  style="width:100%;height:100%;">
                <i-button type="info" size="small" @click="addDevice()">添加设备</i-button>
                <!--<Button type="primary" size="small" @click="updateDevicePre()">更新设备</Button>-->
                <p slot="title" >
                    <Icon type="android-remove"></Icon>
                    设备列表
                </p>
                <div class=" margin-top-8">
                    <Table ref="DeviceSelection" :columns="DeviceListColums" :data="DeviceListData"
                           highlight-row
                ></Table>
                    <Page :total="PageTotal" show-sizer show-total @on-change="pageChange"
                          @on-page-size-change="sizeChange"
                          style="margin-top:20px;text-align:center;align:right"></Page>
                </div>
            </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
    import { Modal } from 'iview';
    import Checkbox from "../../../../node_modules/iview/src/components/checkbox/checkbox";

    export default {
        name: 'DeviceOperater',
        components: {
            Checkbox

        },
        data () {
            return {
                editInlineData: [],
                DeviceListData:[],
                editInlineColumns:[{
                    title: '区域',
                    key: 'areaName'
                }],
                DeviceListColums: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center',
                    },
                    {
                        title: '设备名',
                        key: 'name',
                    },
                    {
                        title: '集中器编号',
                        key: 'concentrator',

                    },
                    {
                        title: '节点ip',
                        key: 'node',
                        filters: [
                            {
                                label: '连接在节点',
                                value: 1
                            },
                            {
                                label: '连接在集中器',
                                value: 2
                            }
                        ],
                        filterMultiple: false,
                        filterMethod (value, row) {
                            if (value === 1) {
                                return row.node != null;
                            } else if (value === 2) {
                                return row.node == null;
                            }
                        },
                    },
                    {
                        title: '回路位置',
                        key: 'circuit',
                    },
                    {
                        title: '类型',
                        key: 'collectionType',
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.deleteDevice(params.row);
                                        }
                                    }
                                }, '删除'),
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.updateDevicePre(params.row);
                                        }
                                    }
                                }, '更新')
                            ]);
                        }
                    }

                ],//cloumn
                currentArea:null,
                AddAreaModel:false,
                AddAreaName:null,
                UpdateAreaName:null,
                UpdateAreaModel:false,
                AreaShow:true,
                AreaId:0,
                formDevice:{},
                AddDeviceModel:false,
                DeviceTypeModel:null,
                DeviceTypeList:[],
                AddOrUpdate: false,   //false 是添加
                ConcentratorLink: false,
                page: 1,
                row: 10,
                PageTotal: 0,
            };
        },
        methods: {
            getDeviceData(id){
                let data = {
                    page: this.page,
                    row: this.row,
                    areaId: id
                }
                this.$store.dispatch('GetAreaDevicePage', data).then((result) => {
                    this.DeviceListData = result.data;
                    this.PageTotal = result.total;
                }).catch((err) => {
                    console.log("获取区域设备出现错误");
                    this.$Message.error(err);
                });
            },
            getData () {
                //从服务器获取区域数据
                this.$store.dispatch('GetUserArea').then((result) => {
                    this.editInlineData = result.data;
                }).catch((err) => {
                    console.log("获取区域出现错误");
                    this.$Message.error(err);
                });

            },
            selectArea(currentRow , oldCurrentRow){
                this.AreaId=currentRow.id;
                this.currentArea = currentRow;
                this.getDeviceData(currentRow.id);
                console.log("选中的区域id"+currentRow.id);
            },
            validateArea(area){
              if(area == null){
                  this.$Message.error("请选择区域");
                  return false;
              }
              return true;
            },
            addArea(){
                if(this.AddAreaName != null && this.AddAreaName != ""){
                    var data = {
                        "areaName":this.AddAreaName
                    }
                    this.$store.dispatch('AddArea',data).then((result) => {
                        if(result.code == 1){
                            this.getData();
                        }else {
                            this.$Message.error("添加失败");
                        }
                    }).catch((err) => {
                        console.log("添加区域出现错误");
                        this.$Message.error(err);
                    });
                    this.AddAreaName ="";
                }
            },
            deleteArea(){
                if(this.validateArea(this.currentArea)){
                    this.$Modal.confirm({
                        title: '删除区域',
                        content: '<p>确定删除区域'+this.currentArea.areaName+'</p>',
                        onOk: () => {
                            this.$store.dispatch('DeleteArea',this.currentArea.id).then((result) => {
                                if(result.code == 1){
                                    this.getData();
                                }else {
                                    this.$Message.error("删除失败");
                                }
                            }).catch((err) => {
                                console.log("删除区域出现错误");
                                this.$Message.error(err);
                            });
                        },
                    });
                }
            },
            updatePreArea(){
                if(this.validateArea(this.currentArea)){
                    this.UpdateAreaName = this.currentArea.areaName;
                    this.UpdateAreaModel = true;
                }
            },
            updateArea(){
                if(this.UpdateAreaName != null && this.UpdateAreaName != ""){
                    var area = this.currentArea;
                    area.areaName = this.UpdateAreaName;
                    this.$store.dispatch('UpdateArea',area).then((result) => {
                        if(result.code == 1){
                            this.getData();
                        }else {
                            this.$Message.error("删除失败");
                        }
                    }).catch((err) => {
                        console.log("删除区域出现错误");
                        this.$Message.error(err);
                    });
                    this.UpdateAreaName= "";
                }
            },
            refreshArea(){
                this.getData();
            },
            deleteDevice(device){
                let data = device.id;
                this.$Modal.confirm({
                    title: '删除设备',
                    content: '<p>确定删除设备' + device.name + '</p>',
                    onOk: () => {
                        this.$store.dispatch('DeleteDevice', data).then((result) => {
                            if(result.code == 1){
                                this.getDeviceData(this.AreaId);
                                this.$Message.info("删除成功");
                            }else {
                                this.$Message.error("删除失败");
                            }
                        }).catch((err) => {
                            console.log("删除设备出现出现错误");
                            this.$Message.error(err);
                        });
                    },
                });


            },
            operateDevice(){
                if (this.AddOrUpdate == false) {
                    this.addDevice();
                } else {
                    this.updateDevice();
                }
            },
            updateDevicePre(device){
                if (this.formDevice.parentType == 1) {
                    this.ConcentratorLink = true;
                } else {
                    this.ConcentratorLink = false;
                }
                this.$router.push({
                    path: '/device-user/device-operater/device-edit',
                    query: {id: device.id}
                });
            },
            addDevicePre(){
                this.getDeviceType();
                this.AddOrUpdate = false;
                this.AddDeviceModel = true;
            },
            addDevice(){
                if (this.AreaId < 1) {
                    this.$Message.warning("请选择区域");
                    return;
                }
                this.$router.push({
                    path: '/device-user/device-operater/device-add',
                    query: {id: this.AreaId}
                });
            },
            pageChange(page){
                this.page = page;
                this.getDeviceData(this.AreaId);
            },
            sizeChange(size){
                this.row = size;
                this.getDeviceData(this.AreaId);
            }

        },
        created () {
            this.getData();
        }
    };
</script>

<style>

</style>
