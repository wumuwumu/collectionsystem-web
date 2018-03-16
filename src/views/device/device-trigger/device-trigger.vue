<template>
    <div>
        <Button type="primary" @click="addTrigger" class="margin-bottom-10">添加</Button>
        <Table :columns="editTriggerColumns" :show-header="true" :data="editTriggerData"
               highlight-row
        ></Table>
        <Page :total="PageTotal" show-sizer show-total @on-change="pageChange" :placement="top"
              @on-page-size-change="sizeChange" :page-size-opts="PageSizeOpt" :page-size="Row" :current="Page"
              style="text-align:center;align:right;margin-top: 5px"></Page>
    </div>
</template>

<script>
    import Vue from 'vue';
    import SciSpan from '../../main-components/sci-span.vue'
    import TriggerAlarm from './components/trigger-alarm.vue'
    Vue.component('TriggerAlarm', TriggerAlarm);
    export default{
        name: 'DeviceTrigger',
        components: {
            SciSpan, TriggerAlarm
        },
        data: function () {
            return {
                editTriggerColumns: [
                    {
                        title: '名字',
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
                        title: '触发条件',
                        key: 'action',
                        align: "center",
                        render: (h, params) => {
                            return h('div', [
                                    h('TriggerAlarm', {
                                        props: {
                                            trigger: params.row
                                        },

                                    })
                                ]
                            )

                        }
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
                editTriggerData: [],
                PageTotal: 0,
                PageSizeOpt: [10, 20, 30, 40],
                top: "top",
                Page: 1,
                Row: 10,
            }
        },
        methods: {
            getTriggerData: function () {
                let data = {
                    page: this.Page,
                    row: this.Row
                }
                this.$store.dispatch('GetUserDeviceTrigger', data).then((result) => {
                    this.editTriggerData = result.data;
                    this.PageTotal = result.total;
                }).catch((err) => {
                    this.$Message.error("获取触发器出现错误");
                });
            },
            addTrigger(){
                this.$router.push({path: '/device-trigger/trigger-add'});
            },
            deleteTrigger(row){
                this.$Modal.confirm({
                    title: '删除触发器',
                    content: '<p>确定删除触发器  ' + '<b>' + row.name + '</b></p>',
                    onOk: () => {
                        this.$store.dispatch('DeleteTrigger', row.id).then((result) => {
                            if (result.code == 1) {
                                this.getTriggerData();
                            } else {
                                this.$Message.error("删除失败");
                            }
                        }).catch((err) => {
                            this.$Message.error("删除出现错误");
                        });
                    }
                });
            },
            updateTrigger(row){
                this.$router.push({path: '/device-trigger/trigger-update', query: {id: row.id}});
            },
            pageChange(page){
                this.Page = page;
                this.getTriggerData();
            },
            sizeChange(row){
                this.Row = row;
                this.getTriggerData();
            }
        },
        created: function () {
            this.getTriggerData();
        }
    }
</script>