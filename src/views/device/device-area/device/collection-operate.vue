<style>

</style>
<template>
    <Card style="margin-top: 20px">
        <i-button type="info" size="small" @click="addDevice()">添加设备</i-button>
        <!--<Button type="primary" size="small" @click="updateDevicePre()">更新设备</Button>-->
        <p slot="title">
            <Icon type="android-remove"></Icon>
            采集设备列表
        </p>
        <div class=" margin-top-8">
            <Table ref="DeviceSelection" :columns="DeviceListColumns" :data="DeviceListData"
                   highlight-row
            ></Table>
            <Page :total="pageTotalCollection" show-sizer show-total @on-change="pageCollectionChange"
                  @on-page-size-change="sizeCollectionChange"
                  style="margin-top:20px;text-align:center;align:right"></Page>
        </div>
    </Card>
</template>


<script>
    export default{
        name: 'collection-operate',
        props: {
            area: 0
        },
        data(){
            return {
                DeviceListData: [],
                DeviceListColumns: [
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
                                return row.node != 0;
                            } else if (value === 2) {
                                return row.node == 0;
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
                pageCollection: 1,
                rowCollection: 10,
                pageTotalCollection: 0,
            }
        },
        components: {},
        computed: {},
        watch: {
            area() {
                this.getDeviceData();
            }
        },
        methods: {
            getDeviceData(){
                let data = {
                    page: this.pageCollection,
                    row: this.rowCollection,
                    areaId: this.area
                }
                this.$store.dispatch('GetAreaDevicePage', data).then((result) => {
                    this.DeviceListData = result.data;
                    this.pageTotalCollection = result.total;
                }).catch((err) => {
                    console.log("获取区域设备出现错误");
                    this.$Message.error(err);
                });
            },
            deleteDevice(device){
                let data = device.id;
                this.$Modal.confirm({
                    title: '删除设备',
                    content: '<p>确定删除设备' + device.name + '</p>',
                    onOk: () => {
                        this.$store.dispatch('DeleteDevice', data).then((result) => {
                            if (result.code == 1) {
                                this.getDeviceData();
                                this.$Message.info("删除成功");
                            } else {
                                this.$Message.error("删除失败");
                            }
                        }).catch((err) => {
                            console.log("删除设备出现出现错误");
                            this.$Message.error(err);
                        });
                    },
                });

            },
            updateDevicePre(device){
                this.$router.push({
                    path: '/device-user/device-operate/device-edit',
                    query: {id: device.id}
                });
            },
            addDevice(){
                this.$router.push({
                    path: '/device-user/device-operate/device-add',
                    query: {id: this.area}
                });
            },
            pageCollectionChange(page){
                this.page = page;
                this.getDeviceData(this.area);
            },
            sizeCollectionChange(size){
                this.row = size;
                this.getDeviceData(this.area);
            },
        },
        created: function () {
            this.getDeviceData();
        }
    }
</script>