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
                    <!--<can-edit-table refs="table2" v-model="editInlineData"  :showHeader="false"-->
                                    <!--:columns-list="editInlineColumns"></can-edit-table>-->
                    <Table  :columns="editInlineColumns" height="auto" :show-header="false" :data="editInlineData"
                           @on-current-change="selectArea"
                           highlight-row
                    ></Table>
                </div>
            </Card>
            </Col>
            <Col :sm="24" :md="18" :lg="19" class="padding-left-10">
            <Card  style="width:100%;height:100%;">

                <Tabs style="width:100%;height:100%;" active-key="key1">
                    <Tab-pane label="实时数据" key="key1">
                        <!--<Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">-->
                        <DeviceList :areaId="AreaId"/>
                    <!--</Col>-->
                    </Tab-pane>
                    <Tab-pane label="历史记录" key="key2">
                        <DeviceTableHistory></DeviceTableHistory>

                    </Tab-pane>
                </Tabs>
            </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
    import canEditTable from '../../tables/components/canEditTable.vue';
    import DeviceList from './components/device-list.vue'
    import DeviceTableHistory from './components/device-tablehistory.vue'
    import tableData from './table_data.js';
    import { Modal } from 'iview';

    export default {
        name: 'DeviceMonitor',
        components: {
            canEditTable,
            DeviceList,
            DeviceTableHistory

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
            };
        },
        methods: {
            getData () {
                this.editInlineColumns = tableData.editInlineColumns;
//                this.editInlineData = tableData.editInlineData;
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

        },
        created () {
            this.getData();
        }
    };
</script>

<style>

</style>
