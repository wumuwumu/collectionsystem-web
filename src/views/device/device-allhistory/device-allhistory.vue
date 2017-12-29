<style lang="less">
  @import '../../../styles/common.less';
  @import './table.less';
</style>
<template>
  <div>
    <Row class="margin-top-10">
      <Col :sm="24" :md="6" :lg="5">

      <Card>
        <p slot="title" >
          <Icon type="android-remove"></Icon>
          区域列表
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
      <Card>
        <div style="margin-bottom: 20px;margin-top: 10px">
          <Select v-model="DeviceSelectModel"  @on-change ="changeSelect"  style="width: 150px">
            <Option v-for="item in deviceList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
          <Button type="primary" shape="circle" @click="downloadHistory" style="margin-left: 20px">下载设备历史记录</Button>
          <a :href="HistoryCSVPath" style="display: none">下载文件</a>
        </div>
        <Table :columns="deviceHistoryColums" height="auto"  :data="deviceHistoryData"
               highlight-row
        ></Table>


        <Page :total="PageTotal" show-sizer show-total @on-change="pageChange" @on-page-size-change="sizeChange"
              style="margin-top:20px;text-align:center;align:right"></Page>

      </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
    import canEditTable from '../../tables/components/canEditTable.vue';
    import { Modal } from 'iview';
    import DateUtil from '../../../utils/DateUtil';

    export default {
        name: 'DeviceAllHistory',
        components: {
            canEditTable,
        },
        data () {
            return {
                editInlineData: [],
                editInlineColumns: [{
                    title: '区域',
                    key: 'areaName'
                }],
                deviceHistoryColums:[
                    {
                        title:'设备编号',
                        key:'deviceId'
                    },
                    {
                        title:'集中器编号',
                        key:'concentrator'
                    },
                    {
                        title:'节点ip',
                        key:'node'
                    },
                    {
                        title:'回路位置',
                        key:'circuit'
                    },
                    {
                        title:"数据",
                        key:'deviceData'
                    },
                    {
                        title:"时间",
                        key:'deviceDate',
                        render: (h, params) => {
                            return h('span', {
                                    props: {
                                        type: 'android-time',
                                    }
                            }, DateUtil.formatDate(params.row.deviceDate));

                        }
                    }
                ],
                deviceHistoryData:[],
                currentArea:null,
                AddAreaName:null,
                AreaId:0,
                page:1,
                size:10,
                PageTotal:0,
                deviceId:0,
                DeviceSelectModel:{},
                deviceList:[]
            };
        },
        computed:{
            HistoryCSVPath:function () {
                return 'http://127.0.0.1:6790/device/onlinelog/CSV?deviceId='+this.deviceId+"&day="+30;
            }
        },
        methods: {
            getData () {
                //从服务器获取区域数据
                this.$store.dispatch('GetUserArea').then((result) => {
                    this.editInlineData = result.data;
                }).catch((err) => {
                    console.log("获取区域出现错误");
                    this.$Message.error(err);
                });

            },
            getAreaDevice(){
                this.$store.dispatch('GetAreaDevice', this.AreaId).then((result) => {
                    this.deviceList = result.data;
                    console.log("设备"+this.deviceList);
                }).catch((err) => {
                    console.log("获取区域设备出现错误");
                    this.$Message.error(err);
                });
            },
            selectArea(currentRow , oldCurrentRow){
                this.AreaId=currentRow.id;
                this.currentArea = currentRow;
                this.getAreaDevice();
                console.log("选中的区域id"+currentRow.id);
            },

            refreshArea(){
                this.getData();
            },
            pageChange(page){
                this.page = page;
                this.updataDeviceHostory();
            },
            sizeChange(size){
                this.size = size;
                this.updataDeviceHostory();
            },
            changeSelect(currentvalue){
                this.deviceId = currentvalue;
                this.updataDeviceHostory();
                console.log(currentvalue);
            },
            updataDeviceHostory(){
                var data = {
                    page:this.page,
                    row:this.size,
                    day:30,
                    deviceId:this.deviceId
                }
                this.$store.dispatch('GetDeviceAllHistory',data).then((result) => {
                    this.deviceHistoryData = result.data;
                    this.PageTotal = result.total;
                }).catch((err) => {
                    this.$Message.error("获取历史出现错误");
                });
            },
            downloadHistory(){
                if(this.deviceId < 1){
                    this.$Message.error('请选择设备');
                    return;
                }
                var data = {
                    day:30,
                    deviceId:this.deviceId
                }
                this.$store.dispatch('DownloadCsvHistory',data).then((result) => {
                    const content = result;
                    const elink = document.createElement('a');// 创建a标签
                    elink.download = 'device'+this.deviceId+'-'+Date.parse(new Date())+'.csv'; // 文件名
                    elink.style.display = 'none';
                    const blob = new Blob([content]);
                    elink.href = URL.createObjectURL(blob);
                    document.body.appendChild(elink);
                    elink.click() // 触发点击a标签事件
                    document.body.removeChild(elink);
                }).catch((err) => {
                    this.$Message.error('下载失败');
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
