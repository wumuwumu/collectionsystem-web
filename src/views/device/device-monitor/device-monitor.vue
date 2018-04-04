<style lang="less">
    @import '../../../styles/common.less';
    @import './table.less';
</style>
<template>
    <div>

        <!--<Card shadow>-->
            <!--<i-button type="text" @click="hideArea">设备管理</i-button>-->
        <!--</Card>-->
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
        <Row class="margin-top-10">
            <Col :sm="24" :md="6" :lg="4">

            <Card v-if="AreaShow">
                <a href="#" slot="extra" @click.prevent="refreshArea()">
                    <Icon type="ios-loop-strong"></Icon>
                </a>
                <!--<i-button class="margin-top-5" type="info" size="small" @click="AddAreaModel = true">添加区域</i-button>-->
                <!--<i-button class="margin-top-5" type="success" size="small" @click="updatePreArea()">更新区域</i-button>-->
                <!--<i-button class="margin-top-5" type="error" size="small" @click="deleteArea()">删除区域</i-button>-->
                <!--<i-button class="margin-top-5" size="small" @click="refreshArea()">刷新区域</i-button>-->
                <p slot="title" >
                    <Icon type="android-remove"></Icon>
                    区域管理
                </p>
                <div class=" margin-top-8" >
                    <!--<can-edit-table refs="table2" v-model="editInlineData"  :showHeader="false"-->
                                    <!--:columns-list="editInlineColumns"></can-edit-table>-->
                    <Table  :columns="editInlineColumns" height="auto" :show-header="false" :data="editInlineData"
                           @on-current-change="selectArea"
                           highlight-row
                    ></Table>
                </div>
            </Card>
            </Col>
            <Col :sm="DeviceWidth.sm" :md="DeviceWidth.md" :lg="DeviceWidth.lg" class="padding-left-10">
            <Card>
                <p slot="title" @click="changeAreaShow">
                    <Icon :type="deviceIcon"></Icon>
                    设备列表

                </p>
                <Tabs value="collection" @on-click="tabChange">
                    <TabPane label="采集设备" name="collection">
                        <DeviceList :areaId="AreaId"/>
                    </TabPane>
                    <TabPane label="控制设备" name="switch">
                        <SwitchList :areaId="AreaId"/>
                    </TabPane>
                </Tabs>

                <!--<Tabs style="width:100%;height:100%;" active-key="key1">-->
                <!--<Tab-pane label="实时数据" key="key1">-->
                <!--&lt;!&ndash;<Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">&ndash;&gt;-->
                <!--<DeviceList :areaId="AreaId"/>-->
                <!--&lt;!&ndash;</Col>&ndash;&gt;-->
                <!--</Tab-pane>-->
                <!--<Tab-pane label="历史记录" key="key2">-->
                <!--<DeviceTableHistory></DeviceTableHistory>-->

                <!--</Tab-pane>-->
                <!--</Tabs>-->
            </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
    import canEditTable from '../../tables/components/canEditTable.vue';
    import DeviceList from './components/device-list.vue'
    import SwitchList from './components/switch-list.vue'
    import DeviceTableHistory from './components/device-tablehistory.vue'
    import tableData from './table_data.js';
    import { Modal } from 'iview';

    export default {
        name: 'DeviceMonitor',
        components: {
            canEditTable,
            DeviceList,
            DeviceTableHistory,
            SwitchList,


        },
        data () {
            return {
                editInlineData: [],
                editInlineColumns: [],
                currentArea:null,
                AddAreaModel:false,
                AddAreaName:null,
                UpdateAreaName:null,
                UpdateAreaModel:false,
                AreaShow:true,
                AreaId:0,
                DeviceWidth: {
                    sm: 24,
                    md: 18,
                    lg: 20
                },
                deviceIcon: 'android-remove'
            };
        },
        methods: {
            getData () {
                this.editInlineColumns = tableData.editInlineColumns;
//                this.editInlineData = tableData.editInlineData;
                //从服务器获取区域数据
                this.$store.dispatch('GetUserArea').then((result) => {
                    console.log("这里出现了bug");
                    console.log(result.data);
                    if (this.currentArea == null && result.data.length > 0) {
                        this.currentArea = result.data[0];
                        this.AreaId = result.data[0].id;
                    }
                    this.editInlineData = result.data;
                }).catch((err) => {
                    this.$Message.error("获取区域出现错误");
                });

            },
            hideArea(){
                    this.AreaShow =!this.AreaShow;
            },
            selectArea(currentRow , oldCurrentRow){
                this.AreaId=currentRow.id;
                this.currentArea = currentRow;
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
            changeAreaShow(){
                if (this.AreaShow == true) {
                    this.DeviceWidth = {
                        sm: 24,
                        md: 24,
                        lg: 24
                    }
                    this.AreaShow = false;
                    this.deviceIcon = 'chevron-right';
                } else {
                    this.DeviceWidth = {
                        sm: 24,
                        md: 18,
                        lg: 20
                    }
                    this.AreaShow = true;
                    this.deviceIcon = 'android-remove';
                }
            },
            tabChange(name){

            }

        },
        created () {
            this.getData();
        }
    };
</script>

<style>

</style>
