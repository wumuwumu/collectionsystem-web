<template>

    <div style="padding: 20px">
        <Button type="primary" @click="addArea" class="margin-bottom-10">添加</Button>
        <Table :columns="editAreaColumns" :show-header="true" :data="editAreaData"
               @on-current-change="selectArea"
               highlight-row
        ></Table>
    </div>
</template>

<script>
    export default{
        name: "DeviceArea",
        data: function () {
            return {
                editAreaData: [],
                DeviceListData: [],
                editAreaColumns: [
                    {
                        title: '区域',
                        key: 'areaName',
                    }, {
                        title: '操作',
                        key: 'action',
                        width: 350,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
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
                                            this.updateArea(params.row);
                                        }
                                    }
                                }, '编辑'),
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
                                            this.deleteArea(params.row);
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
                                            this.deviceOperate(params.row);
                                        }
                                    }
                                }, '设备管理')
                            ]);
                        }
                    }
                ],
            }
        },
        methods: {
            getAreaData () {
                //从服务器获取区域数据
                this.$store.dispatch('GetUserArea').then((result) => {
                    this.editAreaData = result.data;
                }).catch((err) => {
                    console.log("获取区域出现错误");
                    this.$Message.error(err);
                });

            },
            addArea(){
                this.$router.push({path: '/device-user/area-add'});
            },
            updateArea(row){
                this.$router.push({path: '/device-user/area-edit', query: {id: row.id}});
            },
            deleteArea(row){
                this.$Modal.confirm({
                    title: '删除区域',
                    content: '<p>确定删除区域  ' + '<b>' + row.areaName + '</b></p>',
                    onOk: () => {
                        this.$store.dispatch('DeleteArea', row.id).then((result) => {
                            if (result.code == 1) {
                                this.getAreaData();
                            } else {
                                this.$Message.error("删除失败");
                            }
                        }).catch((err) => {
                            console.log("删除区域出现错误");
                            this.$Message.error(err);
                        });
                    }
                });
            },
            deviceOperate(row){
                this.$router.push({path: '/device-operater/device-control', query: {id: row.id, name: row.areaName}});
            }
        },
        mounted: function () {

        },
        created: function () {
            this.getAreaData();
        }
    }
</script>