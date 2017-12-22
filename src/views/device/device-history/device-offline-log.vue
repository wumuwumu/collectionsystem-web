<template>
    <div>
        <Row>
            <Col :sm="24" :md="6" :lg="5">
            <Card>
                <p slot="title">
                    <Icon type="android-remove"></Icon>
                    设备列表
                </p>
                <Tree ref="deviceTree" :data="TreeData" @on-select-change="selectChange"></Tree>
            </Card>
            </Col>
            <Col :sm="24" :md="18" :lg="19" class="padding-left-10">
            <div>
                <Table :columns="OfflineColumns" :data="OfflineData"></Table>
            </div>
            </Col>
        </Row>
    </div>
</template>

<script>
    import DateUtil from '../../../utils/DateUtil';
    export default {
        name: 'DeviceOfflineLog',
        components: {},
        data: function () {
            return {
                TreeData: [],
                OfflineData: [],
                OfflineColumns: [
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
                                return row.node != null;
                            } else if (value === 2) {
                                return row.node == null;
                            }
                        },
                    },
                    {
                        title: '回路位置',
                        key: 'circuit',
                    },
                    {
                        title: '掉线时间',
                        key: 'beginTime',
                        render: (h, params) => {
                            return h('span', DateUtil.formatDate(params.row.beginTime));
                        }
                    },
                    {
                        title: '上线时间',
                        key: 'endTime',
                        render: (h, params) => {
                            return h('span', DateUtil.formatDate(params.row.endTime));
                        }
                    },
                    {
                        title: '持续时间',
                        key: 'allTime',
                        render: (h, params) => {
                            return h('span', this.formatTime(params.row.allTime));
                        }
                    }

                ],//cloumn
                CurrentDevice: 0,
                page: 1,
                row: 10,
            }
        },
        methods: {
            getTreeDate () {
                this.$store.dispatch('GetDeviceTree').then((result) => {
                    this.TreeData = result.data;
                }).catch((err) => {
                    this.$Message.error("获取设备树出现错误");
                });
            },
            getOfflineInfo(data){
                this.$store.dispatch('GetOfflineInfoPage', data).then((result) => {
                    console.log(result.data);
                    this.OfflineData = result.data;
                }).catch((err) => {
                    this.$Message.error("获取离线信息出现错误");
                });
            },
            selectChange(){
                let current = this.$refs.deviceTree.getSelectedNodes()[0];
                if (current.children != null) {
                    this.CurrentDevice = 0;
                    return;
                }
                this.CurrentDevice = current.id;
                let data = {
                    page: this.page,
                    row: this.row,
                    deviceId: current.id
                }
                this.getOfflineInfo(data);
            },
            formatTime(allTime){
                let second = Math.floor(allTime / 1000 % 60);
                let minute = Math.floor((allTime / 1000) % 3600 / 60);
                let hour = Math.floor((allTime / 1000) % (24 * 3600) / 3600);
                return hour + ':' + minute + ':' + second;
            }
        },
        mounted: function () {
            this.getTreeDate();
        }
    }
</script>