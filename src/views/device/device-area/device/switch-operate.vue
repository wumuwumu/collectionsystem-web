<style>

</style>
<template>
    <Card style="margin-top: 20px">
        <i-button type="info" size="small" @click="addSwitch()">添加控制设备</i-button>
        <p slot="title">
            <Icon type="android-remove"></Icon>
            控制设备列表
        </p>
        <div class=" margin-top-8">
            <Table ref="DeviceSelection" :columns="SwitchListColumns" :data="SwitchListData"
                   highlight-row
            ></Table>
            <Page :total="pageTotalSwitch" show-sizer show-total @on-change="pageSwitchChange"
                  @on-page-size-change="sizeSwitchChange"
                  style="margin-top:20px;text-align:center;align:right"></Page>
        </div>
    </Card>
</template>


<script>
    export default{
        name: "switch-operate",
        props: {
            area: 0
        },
        data(){
            return {
                SwitchListData: [],
                SwitchListColumns: [
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
                        title: '最长开启时间',
                        key: 'duration',
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
                                            this.deleteSwitch(params.row);
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
                                            this.updateSwitch(params.row);
                                        }
                                    }
                                }, '更新')
                            ]);
                        }
                    }
                ],
                pageSwitch: 1,
                rowSwitch: 10,
                pageTotalSwitch: 0,
            }
        },
        components: {},
        computed: {},
        watch: {
            area () {
                this.getSwitchData();
            }
        },
        methods: {
            getSwitchData(){
                let data = {
                    page: this.pageSwitch,
                    row: this.rowSwitch,
                    areaId: this.area
                }
                this.$store.dispatch('GetAreaSwitchPage', data).then((result) => {
                    this.SwitchListData = result.data;
                    this.pageTotalSwitch = result.total;
                }).catch((err) => {
                    console.log("获取区域设备出现错误");
                    this.$Message.error(err);
                });
            },
            pageSwitchChange(page){
                this.page = page;
                this.getSwitchData();
            },
            sizeSwitchChange(size){
                this.row = size;
                this.getSwitchData();
            },
            addSwitch(){
                this.$router.push({
                    path: '/device-user/device-operate/switch-add',
                    query: {id: this.area}
                });
            },
            updateSwitch(row){
                this.$router.push({
                    path: '/device-user/device-operate/switch-edit',
                    query: {id: row.id}
                });
            },
            deleteSwitch(device){
                let data = device.id;
                this.$Modal.confirm({
                    title: '删除设备',
                    content: '<p>确定删除设备' + device.name + '</p>',
                    onOk: () => {
                        this.$store.dispatch('DeleteSwitch', data).then((result) => {
                            if (result.code == 1) {
                                this.getSwitcheData();
                                this.$Message.info("删除成功");
                            } else {
                                this.$Message.error("删除失败");
                            }
                        }).catch((err) => {
                        });
                    },
                });

            },
        },
        created: function () {
            this.getSwitchData();
        }
    }
</script>