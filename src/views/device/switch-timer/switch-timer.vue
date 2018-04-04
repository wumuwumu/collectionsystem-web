<style>

</style>
<template>
    <div>
        <Button type="primary" @click="addTimer" class="margin-bottom-10">添加</Button>
        <Table :columns="timerColumns" :show-header="true" :data="timerData"
               highlight-row
        ></Table>
        <Page :total="PageTotal" show-sizer show-total @on-change="pageChange" placement="top"
              @on-page-size-change="sizeChange" :page-size-opts="PageSizeOpt" :page-size="Row" :current="Page"
              style="text-align:center;align:right;margin-top: 5px"></Page>
    </div>
</template>


<script>
    export default{
        name: 'switch-timer',
        data(){
            return {
                timerColumns: [
                    {
                        title: '设备名字',
                        key: 'name',
                        align: 'center'
                    },
                    {
                        title: '集中器',
                        key: 'concentrator',
                        align: 'center'
                    },
                    {
                        title: '节点',
                        key: 'node',
                        align: 'center'
                    },
                    {
                        title: '回路',
                        key: 'circuit',
                        align: 'center'
                    },
                    {
                        title: '报警方式',
                        key: 'alarmType',
                        align: 'center'
                    },
                    {
                        title: '接收者',
                        key: 'accepter',
                        align: 'center'
                    },
                    {
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
                                            this.updateTrigger(params.row);
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
                                            this.deleteTrigger(params.row);
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                timerData: [],
                PageTotal: 0,
                PageSizeOpt: [10, 20, 30, 40],
                Page: 1,
                Row: 10,
            }
        },
        computed: {},
        methods: {
            addTimer(){
                this.$router.push({path: '/switch-timer/switch-timer-add'});
            }
        },
        created: function () {

        }
    }
</script>