<style>
    .amap-page-container {
        /*width: 500px;*/
        height: 300px;
    }
</style>

<template>
    <div style="padding: 10px">
        <Card span="24">
            <p slot="title">
                <Icon type="ios-film-outline"></Icon>
                {{AreaName}}
            </p>
            <div class="amap-page-container">
                <el-amap ref="map" vid="amapDevice" :plugin="MapPlugin" :center="MapCenter" :zoom="Zoom">
                    <el-amap-marker v-for="marker in Markers" :position="marker.position" :events="marker.events"
                                    :key="marker.id"
                                    :vid="marker.id" :title="marker.name" :content="marker.content"></el-amap-marker>

                    <el-amap-info-window v-if="InfoWindow" :position="InfoWindow.position" :visible="InfoWindow.visible"
                                         :contentRender="InfoWindow.contentRender"></el-amap-info-window>
                </el-amap>
            </div>
        </Card>
        <Card style="margin-top: 15px">
            <p slot="title">采集设备列表</p>
            <Row :gutter="16" style="margin-top: 10px">
                <DeviceControlNode @toHistory="goHistory" @clickNode="openInfoWindow(item)" :DeviceInfo="item"
                                   v-for="item in DeviceListData" :key="item.id"></DeviceControlNode>
            </Row>
        </Card>

        <Card style="margin-top: 15px">
            <p slot="title">控制设备列表</p>
            <Row :gutter="16" style="margin-top: 10px">
                <SwitchControlNode @refrshData="getSwitchData" :SwitchInfo="item"
                                   v-for="item in SwitchListData" :key="item.id"></SwitchControlNode>
            </Row>
        </Card>

    </div>
</template>

<script>
    import DeviceControlNode from './device-control-node.vue'
    import { AMapManager } from 'vue-amap';
    import DeviceInfoWindow from './device-info-window.vue';
    import SwitchControlNode from './switch-control-node.vue';
    let amapManager = new AMapManager;
    export default{
        name: 'DeviceControl',
        components: {
            DeviceControlNode,
            DeviceInfoWindow,
            SwitchControlNode
        },
        data: function () {
            return {
                areaId: 0,
                AreaName: "",
                DeviceListData: [],
                SwitchListData: [],
                MapPlugin: ['ToolBar', {
                    pName: 'MapType',
                    defaultType: 0,
                    events: {
                        init(o) {
                            console.log(o);
                        }
                    }
                }],
                Markers: [],
                InfoWindow: '',
                InfoWindows: new Map(),
                MapCenter: [120, 40],
                Zoom: 5,
            }
        },
        methods: {
            getData(){
                let data = {
                    areaId: this.areaId,
                };
                this.$store.dispatch('GetAreaDouDevice', data).then((result) => {
                    this.DeviceListData = result.data;

                    let markers = [];
                    let windows = new Map();

                    let self = this;
                    let position = null;
                    for (let device of result.data) {
                        if (device.longitude != null && device.latitude != null) {
                            position = [device.longitude, device.latitude];
                            let marker = {
                                position: position,
                                name: device.name,
                                events: {
                                    click() {
                                        self.InfoWindows.forEach(window => {
                                            window.visible = false;
                                        });
                                        self.InfoWindow = self.InfoWindows.get(device.id);
                                        self.$nextTick(() => {
                                            self.InfoWindow.visible = true;
                                        });
                                    }
                                },
                                id: device.id
                            };
                            markers.push(marker);
                            let temWin = {
                                position: position,
                                contentRender: h => h(DeviceInfoWindow, {
                                    props: {
                                        DeviceInfo: device
                                    },
                                    on: {
                                        toHistory: function (device) {
                                            self.goHistory(device);
                                        }
                                    },
                                }),
                                visible: false
                            }
                            windows.set(device.id, temWin);
                        }
                    }
                    if (position != null) {
                        this.MapCenter = position;
                    }
                    this.Markers = markers;
                    this.InfoWindows = windows;

                }).catch((err) => {
                    this.$Message.error("获取区域设备出现错误");
                });
            },
            getSwitchData(){
                let data = {
                    areaId: this.areaId,
                };
                this.$store.dispatch('GetAreaSwitch', data).then((result) => {
                    this.SwitchListData = result.data;
                }).catch((err) => {
                });
            },
            openInfoWindow(device) {
                this.InfoWindows.forEach(window => {
                    window.visible = false;
                });
                let window = this.InfoWindows.get(device.id);
                if (window != null && window != undefined) {
                    this.InfoWindow = window;
                    this.$nextTick(() => {
                        this.InfoWindow.visible = true;
                    });
                }

            },
            goHistory(device) {
                this.$router.push({
                    path: '/device-user/device-monitor/current-history',
                    query: {id: device.id}
                });
            },
            timerRefresh(){
                this.TimerObject = setInterval(() => {
                    this.getData();
                }, 30 * 1000);
            },
        },
        created(){
            if (this.$route.query && this.$route.query != null && this.$route.query.id && this.$route.query.id != null) {
                this.areaId = this.$route.query.id;
                this.AreaName = this.$route.query.name;
            }
            this.getData();
            this.getSwitchData();
            this.timerRefresh();
        },
        beforeRouteLeave: function (to, from, next) {
            clearInterval(this.TimerObject);
            next();
        },
        destroyed () {
            clearInterval(this.TimerObject);
        }
    }
</script>