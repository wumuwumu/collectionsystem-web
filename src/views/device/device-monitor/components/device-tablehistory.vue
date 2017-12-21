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
                            const type = parseInt(params.row.collectionType);
                            console.log("类型：" + type);
                            switch (type) {
                                case 1:
                                    return h('div', [
                                        h('Tag', {
                                            props: {
//                                          type: 'dot',
                                                color: "blue"
                                            }
                                        }, "原值"),
                                    ]);
                                    break
                                case 2:
                                    return h('div', [
                                        h('Tag', {
                                            props: {
//                                          type: 'dot',
                                                color: "green"
                                            }
                                        }, "温度"),
                                    ]);
                                    break;
                                case 3:
                                    return h('div', [
                                        h('Tag', {
                                            props: {
//                                          type: 'dot',
                                                color: "yellow"
                                            }
                                        }, "湿度"),
                                    ]);
                                    break;
                                case 4:
                                    return h('div', [
                                        h('Tag', {
                                            props: {
//                                          type: 'dot',
                                                color: "white"
                                            }
                                        }, "气压"),
                                    ]);
                                    break;
                                case 5:
                                    return h('div', [
                                        h('Tag', {
                                            props: {
//                                          type: 'dot',
                                                color: "#99CCCC"
                                            }
                                        }, "风速"),
                                    ]);
                                    break;
                                case 6:
                                    return h('div', [
                                        h('Tag', {
                                            props: {
//                                          type: 'dot',
                                                color: "#FF6600"
                                            }
                                        }, "光照度"),
                                    ]);
                                    break;
                                case 7:
                                    return h('div', [
                                        h('Tag', {
                                            props: {
//                                          type: 'dot',
                                                color: "#99CCFF"
                                            }
                                        }, "风速"),
                                    ]);
                                    break;
                                case 8:
                                    return h('div', [
                                        h('Tag', {
                                            props: {
//                                          type: 'dot',
                                                color: "#333399"
                                            }
                                        }, "电流"),
                                    ]);
                                    break;
                                case 9:
                                    return h('div', [
                                        h('Tag', {
                                            props: {
//                                          type: 'dot',
                                                color: "#FFCC99"
                                            }
                                        }, "电压"),
                                    ]);
                                    break;
                                default:
                                    return h('div', [
                                        h('Tag', {
                                            props: {
//                                          type: 'dot',
                                                color: "red"
                                            }
                                        }, "未知"),
                                    ]);
                            }

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
