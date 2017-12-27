<template>
    <div>

        <!--<Sicon type="wenduchuanganqi" :size="40" color="#f23ddd"></Sicon>-->
        <router-link :to="{ path: '/device-admin/device-type-control/add'}">
            <Button style="margin: 10px" type="info">添加</Button>
        </router-link>
        <Table style="margin: 10px" :columns="TypeColumn" :data="TypeData" border></Table>
    </div>
</template>
<script>
    import Sicon from  './components/sicon.vue'
    import DeviceIconDialog from './components/device-icon-dialog.vue'
    export default{
        name: 'DeviceTypeControl',
        components: {
            Sicon,
            DeviceIconDialog
        },
        data: function () {
            return {
                TypeData: [],
                TypeColumn: [
                    {
                        title: '图标',
                        key: 'showIcon',
                        align: 'center',
                        width: "100px",
                        render: (h, param) => {
                            return h(Sicon, {
                                    props: {
                                        type: param.row.showIcon,
                                        size: 30,
                                        color: param.row.showIconcolor
                                    }
                                }
                            );
                        }
                    },
                    {
                        title: '名称',
                        key: 'collectionName'
                    },
                    {
                        title: '计算公式',
                        key: 'collectionFormula'
                    },
                    {
                        title: '单位',
                        key: 'showUnit'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
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
                                            this.updataDeviceType(params.row);
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.deleteDeviceTypePre(params.row);
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                page: 1,
                row: 10,
                DeleteConfirm: {
                    collectionName: null
                },
            }
        },
        computed: {},
        methods: {
            getDeviceType(){
                let data = {
                    page: this.page,
                    row: this.row
                };
                this.$store.dispatch('GetDeviceTypePage', data).then((result) => {
                    this.TypeData = result.data;
                }).catch((err) => {
                    this.$Message.error("获取设备类型出现错误");
                });
            },
            updataDeviceType(row){
                this.$store.commit("SET_OPERATING_DEVICETYPE", row);
                this.$router.push({path: '/device-admin/device-type-control/add', query: {id: row.id}});
            },
            deleteDeviceType(){
                this.$store.dispatch('DeleteDeviceType', this.DeleteConfirm.id).then((result) => {
                    if (result.code != 1) {
                        this.$Message.error('删除失败');
                        return
                    }
                    this.getDeviceType();
                }).catch((err) => {
                    this.$Message.error("删除设备类型出现错误");
                });
            },
            deleteDeviceTypePre(row){
                this.DeleteConfirm = row;
                this.$Modal.confirm({
                    title: '删除采集类型',
                    content: '<p>确定删除' + row.collectionName + '</p>',
                    onOk: () => {
                        this.deleteDeviceType();
                    },
                });
            }
        },
        mounted: function () {
            this.getDeviceType();
        }
    }
</script>