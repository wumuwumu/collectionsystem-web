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
                @on-ok="addDevice">
            <Form ref="formInline" :model="formDevice"  >
                <FormItem label="设备名:">
                    <Input type="text" v-model="formDevice.name" placeholder="name">
                    </Input>
                </FormItem>
                <FormItem label="集中器编号:">
                    <Input type="text" v-model="formDevice.concentrator" placeholder="concentrator">
                    </Input>
                </FormItem>
                <FormItem label="连接在节点上:">
                    <checkbox v-model="LinkNode"/>
                </FormItem>
                <FormItem label="节点ip:">
                    <Input :disabled ="!LinkNode" type="text" v-model="formDevice.node" placeholder="node">
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
                <i-button type="info" size="small" @click="AddAreaModel = true">添加区域</i-button>
                <i-button type="success" size="small" @click="updatePreArea()">更新区域</i-button>
                <i-button type="error" size="small" @click="deleteArea()">删除区域</i-button>
                <i-button size="small" @click="refreshArea()">刷新区域</i-button>
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
                <i-button type="info" size="small" @click="addDevicePre()">添加设备</i-button>
                <i-button type="error" size="small" @click="deleteDevice()">删除设备</i-button>
                <p slot="title" >
                    <Icon type="android-remove"></Icon>
                    设备列表
                </p>
                <div class=" margin-top-8">
                <Table ref="DeviceSelection"  :columns="DeviceListColums" height="auto"  :data="DeviceListData"
                        highlight-row
                ></Table>
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
                        align: 'center'
                    },
                    {
                        title: '设备名',
                        key: 'name',
//                    ellipsis:'true',
                    },
                    {
                        title: '集中器编号',
//                    ellipsis:'true',
                        key: 'concentrator',

                    },
                    {
                        title: '节点ip',
//                    ellipsis:'true',
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
//                    ellipsis:'true',
                        key: 'circuit',
                    },
                    {
                        title: '类型',
                        ellipsis: 'true',
                        key: 'collectionType',
                        render: (h, params) => {
                            return h('div', [
                                h('Tag', {
                                    props: {
//                                          type: 'dot',
                                        color: "red"
                                    }
                                }, params.row.collectionType),
                            ]);


                        }
                    },

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
                LinkNode:false,
            };
        },
        methods: {
            getDeviceData(areaId){
                this.$store.dispatch('GetAreaDevice',areaId).then((result) => {
                    this.DeviceListData = result.data;
                }).catch((err) => {
                    console.log("获取区域设备出现错误");
                    this.$Message.error(err);
                });
            },
            getData () {
                //从服务器获取区域数据
                this.$store.dispatch('GetUserArea').then((result) => {
                    console.log(result);
                    this.editInlineData = result;
                    console.log("zhi:"+this.editInlineData);
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
            deleteDevice(){
               var selectData =  this.$refs.DeviceSelection.getSelection();
               if(selectData.length <1){
                   this.$Message.info("请选择设备");
                   return;
               }

               var data = [];
               for(var i =0;i< selectData.length;i++){
                   data.push(selectData[i].id);
               }
                this.$Modal.confirm({
                    title: '删除区域',
                    content: '<p>确定删除区域'+this.currentArea.areaName+'</p>',
                    onOk: () => {
                        this.$store.dispatch('BatchDeleteDevice',data).then((result) => {
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
            addDevicePre(){
                this.$store.dispatch('GetDeviceType').then((result) => {
                    if(result.code == 1){
                        this.DeviceTypeList = result.data;
                    }else {
                        this.$Message.error("获取设备类型失败");
                    }
                }).catch((err) => {
                    console.log("添加设备类型出现错误");
                    this.$Message.error(err);
                });
                this.AddDeviceModel = true;
            },
            addDevice(){
                if(this.AreaId < 1){
                    this.$Message.warning("请选择区域");
                    return;
                }
                this.LinkNode? Object.assign(this.formDevice,{parentType:0}):Object.assign(this.formDevice,{parentType:1});
                 Object.assign(this.formDevice,{area:this.AreaId,online:0});
                this.$store.dispatch('AddDevice',this.formDevice).then((result) => {
                    if(result.code == 1){
                        this.getDeviceData(this.AreaId);
                        this.formDevice = {};
                        this.$Message.info("添加成功");
                    }else {
                        this.$Message.error("添加失败");
                    }
                }).catch((err) => {
                    console.log("添加设备出现错误");
                    this.$Message.error(err);
                });
            },

        },
        created () {
            this.getData();
        }
    };
</script>

<style>

</style>
