<style>

</style>
<template>
    <div>
        <Button type="primary" @click="back" class="margin-bottom-10">返回</Button>
        <Button type="primary" @click="addStrategy" class="margin-bottom-10">添加</Button>
        <Table :columns="strategyColumns" :show-header="true" :data="strategyList"
               highlight-row
        ></Table>
    </div>
</template>


<script>
    import StrategyCondition from './component/strategy-condition.vue'
    import Vue from 'vue';
    Vue.component('StrategyCondition', StrategyCondition);
    export default{
        data(){
            return {
                switchId: 0,
                strategyList: [],
                strategyColumns: [
                    {
                        title: '开关设备',
                        key: 'switchName',
                        align: 'center'
                    },
                    {
                        title: '条件',
                        key: 'action',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                    h('StrategyCondition', {
                                        props: {
                                            strategyInfo: params.row
                                        },

                                    })
                                ]
                            )

                        }
                    },
                    {
                        title: '持续时间',
                        key: 'duration',
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
                                            this.updateStrategy(params.row);
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
                                            this.deleteStrategy(params.row);
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
            }
        },
        components: {},
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
                    this.getSwitchStrategy();
                }
            },
            getSwitchStrategy(){
                this.$store.dispatch('GetSwitchStrategy', this.switchId).then((result) => {
                    this.strategyList = result.data;
                }).catch((err) => {

                });
            },
            addStrategy(){
                this.$router.push({path: '/switch-strategy/switch-strategy-add'});
            },
            updateStrategy(row){
                this.$router.push({path: '/switch-strategy/switch-strategy-update', query: {id: row.id}});
            },
            deleteStrategy(row){
                this.$Modal.confirm({
                    title: '删除策略',
                    content: '<p>确定删除策略</p>',
                    onOk: () => {
                        this.$store.dispatch('DeleteStrategy', row.id).then((result) => {
                            if (result.code == 1) {
                                this.getSwitchStrategy();
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