<template>
    <div>
        <Card shadow>
            <Table :columns="columns7" :data="page_device_list" ref="table"></Table>
        </Card>
    </div>
</template>

<script>
    import DeviceChart from './device-chart.vue'
    import store from "../../../../store"
    export default {
        name: 'DeviceTableHistory',
        components: {
            DeviceChart
        },
        data(){
            return {
                columns7: [
                    {
                        type: 'expand',
                        ellipsis: 'true',

                        render: (h, params) => {
                            return h(DeviceChart, {
                                props: {
                                    deviceId:params.row.id
                                }
                            })
                        }
                    },
                    {
                        title: '设备名',
                        key: 'name',
//                    ellipsis:'true',
                    },
                    {
                        title: '集中器编号',
//                    ellipsis:'true',
                        key: 'concentrator',

                    },
                    {
                        title: '节点ip',
//                    ellipsis:'true',
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
                                return row.node != null;
                            } else if (value === 2) {
                                return row.node == null;
                            }
                        },
                    },
                    {
                        title: '回路位置',
//                    ellipsis:'true',
                        key: 'circuit',
                    },
                    {
                        title: '类型',
                        ellipsis: 'true',
                        key: 'collectionType',
                        render: (h, params) => {
                            return h('div', [
                                h('Tag', {
                                    props: {
//                                          type: 'dot',
                                        color: "red"
                                    }
                                }, params.row.collectionType),
                            ]);

                        }
                    },

                ],//cloumn
            }
        },
        computed: {
            page_device_list :function () {
                return store.getters.areaDevice.data;
            }
        },
        props: {},
        methods: {},
    };
</script>

<style>

</style>
