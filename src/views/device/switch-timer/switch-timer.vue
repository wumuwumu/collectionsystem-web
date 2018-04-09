<style>

</style>
<template>
    <div>
        <Button type="primary" @click="back" class="margin-bottom-10">返回</Button>
        <Button type="primary" @click="addTimer" class="margin-bottom-10">添加</Button>
        <Table :columns="timerColumns" :show-header="true" :data="timerList"
               highlight-row
        ></Table>
    </div>
</template>


<script>
    import DateUtil from '../../../utils/DateUtil'
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
                        title: '开始时间',
                        key: 'startTime',
                        align: 'center',
                        render: (h, params) => {
                            return h('span', {
                                props: {
                                    type: 'android-time',
                                }
                            }, DateUtil.formatDate(params.row.startTime));

                        }
                    },
                    {
                        title: '循环方式',
                        key: 'loop',
                        align: 'center',
                        render: (h, params) => {
                            function transLoop (loop) {
                                console.log(loop);
                                let data = loop;
                                data = data.replace('1', "星期一");
                                data = data.replace('2', "星期二");
                                data = data.replace('3', "星期三");
                                data = data.replace('4', '星期四');
                                data = data.replace('5', '星期五');
                                data = data.replace("6", "星期六");
                                data = data.replace("7", "星期天");
                                return data;
                            }

                            return h('span', {
                                props: {
                                    type: 'android-time',
                                }
                            }, transLoop(params.row.loop));

                        }
                    },
                    {
                        title: '动作',
                        key: 'action',
                        align: 'center',
                        render: (h, params) => {
                            function transAction (action) {
                                if (action > 0) {
                                    return '开';
                                } else {
                                    return '关';
                                }

                            }

                            return h('span', {
                                props: {
                                    type: 'android-time',
                                }
                            }, transAction(params.row.action));

                        }
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
                                            this.updateTimer(params.row);
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
                                            this.deleteTimer(params.row);
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                timerList: [],
                switchId: 0

            }
        },
        computed: {},
        methods: {
            back(){
                this.$router.back();
            },
            loadId(){
                if (this.$route.query && this.$route.query != null && this.$route.query.id && this.$route.query.id != null) {
                    this.switchId = this.$route.query.id;
                }
                if (this.switchId > 0) {
                    this.getTimer();
                }
            },
            addTimer(){
                this.$router.push({path: '/switch-timer/switch-timer-add'});
            },
            getTimer: function () {
                this.$store.dispatch('GetSwitchTimer', this.switchId).then((result) => {
                    this.timerList = result.data;
                }).catch((err) => {
                });
            },
            updateTimer(row){
                this.$router.push({path: '/switch-timer/switch-timer-update', query: {id: row.id}})
            },
            deleteTimer(row){
                this.$Modal.confirm({
                    title: '删除定时',
                    content: '<p>确定删除定时</p>',
                    onOk: () => {
                        this.$store.dispatch('DeleteTimer', row.id).then((result) => {
                            if (result.code == 1) {
                                this.getTimer();
                            } else {
                                this.$Message.error("删除失败");
                            }
                        }).catch((err) => {
                            this.$Message.error("删除出现错误");
                        });
                    }
                });
            }
        },
        created: function () {
            this.loadId();
        }
    }
</script>