<template>

    <div style="padding: 20px">
        <Button type="primary" @click="addArea" class="margin-bottom-10">添加</Button>
        <Table :columns="editAreaColumns" :show-header="true" :data="editAreaData"
               highlight-row
        ></Table>
        <Page :total="PageTotal" show-sizer show-total @on-change="pageChange" :placement="top"
              @on-page-size-change="sizeChange" :page-size-opts="PageSizeOpt" :page-size="Row" :current="Page"
              style="text-align:center;align:right;margin-top: 5px"></Page>
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
                PageTotal: 0,
                PageSizeOpt: [10, 20, 30, 40],
                top: "top",
                Page: 1,
                Row: 10,
            }
        },
        methods: {
            getAreaData () {
                let data = {
                    page: this.Page,
                    row: this.Row
                }
                //从服务器获取区域数据
                this.$store.dispatch('GetUserAreaPage', data).then((result) => {
                    this.editAreaData = result.data;
                    this.PageTotal = result.total;
                }).catch((err) => {
                    this.$Message.error("获取区域出现错误");
                });

            },
            addArea(){
                this.$router.push({path: '/device-area/area-add'});
            },
            updateArea(row){
                this.$router.push({path: '/device-area/area-edit', query: {id: row.id}});
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
                this.$router.push({
                    path: '/device-user/device-operater/device-control',
                    query: {id: row.id, name: row.areaName}
                });
            },
            pageChange(page){
                this.Page = page;
                this.getAreaData();
            },
            sizeChange(row){
                this.Row = row;
                this.getAreaData();
            }
        },
        mounted: function () {

        },
        created: function () {
            this.getAreaData();
        }
    }
</script>