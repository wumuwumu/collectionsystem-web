<template>
    <div>
        <div>
            <Select :disabled = "SelectDisabled" v-model="SelectModel" size="small" style="width:100px">
                <Option v-for="item in timerSelectList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <i-button type="success" size="small" @click ="getData">立即刷新</i-button>
            <i-button type="info" size="small" @click = "timerRefresh" >{{BtnContent}}<span v-if="TimerOn">{{RefreshValue}}</span></i-button>

        </div>
        <Row :gutter="16" style="margin-top: 10px">
            <DeviceNode :DeviceInfo="item" v-for="item in AreaData" :key="item.id" @refrshData="getData()"></DeviceNode>
        </Row>
        <Page :total="PageTotal" show-sizer show-total @on-change="pageChange" :placement="top"
              @on-page-size-change="sizeChange" :page-size-opts="PageSizeOpt" :page-size="row" :current="page"
              style="text-align:center;align:right"></Page>
    </div>
</template>
<script>
    import DeviceNode from "./device-node.vue";
    import store from "../../../../store";
    import CommonUtil from '../../../../utils/CommonUtil';
    export default{
        name: 'DeviceList',
        props: {
            areaId: {
                type:Number
            }
        },
        components: {
            DeviceNode
        },
        data(){
            return {
                timerSelectList: [
                    {
                        value:10,
                        label:10
                    },
                    {
                        value:20,
                        label:20
                    },
                    {
                        value:30,
                        label:30
                    },
                    {
                        value:60,
                        label:60
                    }
                ],
                SelectModel:30,
                SelectDisabled :false,
                TimerObject:null,
                TimerOn:false,
                TimerValue:0,
                BtnContent:"定时刷新",
                RefreshValue:0,
                PageTotal: 0,
                page: 1,
                row: 12,
                AreaData: {},
                AllAreaData: {},
                PageSizeOpt: [9, 12, 15, 18],
                top: "top"

            }
        },
        computed: {
//            areaData: function () {
//                //从服务器获取区域的数据
//                this.getData();
//            },
//            AreaData: function () {
//                return store.getters.areaDevice.data;
//            }
        },
        methods: {
            getData(){
                let data = {
                    areaId: this.areaId,
                };
                this.$store.dispatch('GetAreaDouDevice', data).then((result) => {
                    console.log(result.data);
                    this.AllAreaData = result.data;
                    this.AreaData = CommonUtil.pagination(this.page, this.row, this.AllAreaData);
                    this.PageTotal = result.data.length;
                }).catch((err) => {
                    console.log("获取区域设备出现错误");
                    this.$Message.error(err);
                });
            },
            timerRefresh(){
               if(this.SelectModel){
                   if(this.TimerOn){
                       clearInterval(this.TimerObject);
                       this.TimerOn=false;
                       this.SelectDisabled=false;
                       this.TimerObject = 0;
                       this.BtnContent="定时刷新";
                       this.TimerValue =0;
                       this.RefreshValue=0;
                   }else {
                       this.RefreshValue = this.SelectModel;
                    this.TimerObject = setInterval(() =>{
                        if(this.TimerValue >this.SelectModel*1000000000000){
                            this.TimerValue=0;
                        }
                        this.RefreshValue =this.SelectModel- this.TimerValue % this.SelectModel;
                        if(this.RefreshValue == 1){
                            this.getData();
                        }
                        this.TimerValue ++;
                    },1000);

                    this.BtnContent="停止刷新";
                    this.SelectDisabled=true;
                    this.TimerOn = true;

                   }
               }else {
                   this.$Message.info("请选择一个时间段");
               }
            },
            pageChange(page){
                this.page = page;
                this.AreaData = CommonUtil.pagination(this.page, this.row, this.AllAreaData);
            },
            sizeChange(row){
                this.row = row;
                this.AreaData = CommonUtil.pagination(this.page, this.row, this.AllAreaData);
            }
        },
        watch: {
            areaId: function () {
                this.page = 1;
                this.row = 12;
                this.getData();
            }
        },
        mounted(){
            this.timerRefresh();
        },
        beforeRouteLeave :function (to, from, next) {
            // 导航离开该组件的对应路由时调用
            // 可以访问组件实例 `this`
            clearInterval(this.TimerObject);
            next();
        },
        destroyed () {
            clearInterval(this.TimerObject);
        }

    }
</script>