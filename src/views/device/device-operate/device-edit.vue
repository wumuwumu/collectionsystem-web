<style scoped>
    .amap-page-container {
        height: 350px;
    }

    .device-add-input {
        max-width: 400px;
    }
</style>

<template>
    <div>
        <Col :sm="24" :md="16" style="padding: 10px">
        <Card style="padding: 10px;text-align: center">
            <Row class="margin-top-10">
                <Col :md="4" style="text-align: left">
                设备名：</Col>
                <Col :md="20" style="text-align: left">
                <Input class="device-add-input" type="text" v-model="formDevice.name" placeholder="name"></Input></Col>
            </Row>
            <Row class="margin-top-10">
                <Col :md="4" style="text-align: left">
                集中器编号：</Col>
                <Col :md="20" style="text-align: left">
                <Select v-model="formDevice.concentrator" style="width:200px">
                    <Option v-for="item in conList" :value="item.concentratorNumber" :key="item.id">
                        {{ item.concentratorNumber }}
                    </Option>
                </Select>
                </Col>
            </Row>
            <Row class="margin-top-10">
                <Col :md="4" style="text-align: left">
                节点ip：</Col>
                <Col :md="20" style="text-align: left">
                <Input class="device-add-input" :disabled="ConcentratorLink" type="text" v-model="formDevice.node"
                       placeholder="node">
                </Input></Col>
            </Row>
            <Row class="margin-top-10">
                <Col :md="4" style="text-align: left">
                回路位置：</Col>
                <Col :md="20" style="text-align: left">
                <Input class="device-add-input" type="text" v-model="formDevice.circuit" placeholder="circuit">
                </Input></Col>
            </Row>
            <Row class="margin-top-10">
                <Col :md="4" style="text-align: left">
                传感器类型：</Col>
                <Col :md="20" style="text-align: left">
                <Select v-model="formDevice.collectionType" style="width:200px">
                    <Option v-for="item in DeviceTypeList" :value="item.collectionName" :key="item.collectionName">
                        {{ item.collectionName }}
                    </Option>
                </Select></Col>
            </Row>
            <Row class="margin-top-10">
                <Col :md="4" style="text-align: left">
                地理位置：</Col>
                <Col :md="20" style="text-align: left">
                <div>
                    <div class="amap-page-container">
                        <el-amap ref="map" vid="AmapDevice" :plugin="MapPlugin" :center="mapCenter" :events="MapEvent">
                            <el-amap-marker :position="Marker.position"
                                            :vid="223223"></el-amap-marker>
                        </el-amap>
                    </div>
                    <div style="width: 100%;background-color: #cdced0;padding: 10px">
                        <el-amap-search-box class="device-add-input" :search-option="SearchOption"
                                            :on-search-result="onSearchResult"></el-amap-search-box>
                        <div style="margin-top: 10px">
                            <span>经度:</span><span>{{formDevice.longitude}}</span>
                            <span>纬度：</span><span>{{formDevice.latitude}}</span>
                        </div>
                    </div>
                </div>
                </Col>
            </Row>
            <Button style="margin-top: 10px" type="primary" @click="updateDevice">保存</Button>
            <Button style="margin-top: 10px" type="error" @click="cancel">取消</Button>
        </Card>
        </Col>
        <Col :sm="24" :md="8" style="padding-left: 20px;padding-top: 10px">
        <Card>
            <p slot="title">
                <Icon type="help"></Icon>
                帮助信息
            </p>
            <span>请按要求填写</span>
        </Card>
        </Col>
    </div>
</template>

<script>
    export default{
        name: 'DeviceEdit',
        data: function () {
            let self = this;
            return {
                DeviceId: 0,
                formDevice: {},
                ConcentratorLink: false,
                DeviceTypeList: [],
                MapPlugin: ['ToolBar', {
                    pName: 'Geolocation'
                }],
                Marker: {
                    position: [122, 36],
                },
                mapCenter: [142, 56],
                SearchOption: {
                    citylimit: true,
                },
                MapEvent: {
                    click: function (MapsEvent) {
                        self.formDevice.longitude = MapsEvent.lnglat.lng;
                        self.formDevice.latitude = MapsEvent.lnglat.lat;
                        self.Marker.position = [MapsEvent.lnglat.lng, MapsEvent.lnglat.lat];
                        self.mapCenter = [MapsEvent.lnglat.lng, MapsEvent.lnglat.lat];

                    }
                },
                conList: []
            }
        },
        methods: {
            updateDevice(){
                this.$store.dispatch('UpdateDevice', this.formDevice).then((result) => {
                    if (result.code == 1) {
                        this.$router.back();
                        this.formDevice = {};
                        this.$Message.info("更新成功");
                    } else {
                        this.$Message.error("更新失败");
                    }
                }).catch((err) => {
                    this.$Message.error("更新设备出现错误");
                });
            },
            getDeviceType(){
                if (this.DeviceTypeList.length == 0) {
                    this.$store.dispatch('GetDeviceType').then((result) => {
                        if (result.code == 1) {
                            this.DeviceTypeList = result.data;
                        } else {
                            this.$Message.error("获取设备类型失败");
                        }
                    }).catch((err) => {
                        this.$Message.error("获取设备类型出现错误");
                    });
                }
            },
            getUserCon(){
                this.$store.dispatch('GetUserCon').then((result) => {
                    if (result.code == 1) {
                        this.conList = result.data;
                    } else {
                        this.$Message.error("获取设备类型失败");
                    }
                }).catch((err) => {
                    console.log("添加设备类型出现错误");
                    this.$Message.error(err);
                });
            },
            getDevice(data){
                this.$store.dispatch('GetDevice', data).then(result => {
                    this.formDevice = result.data;
                    this.Marker.position = [this.formDevice.longitude, this.formDevice.latitude];
                    this.mapCenter = [this.formDevice.longitude, this.formDevice.latitude];
                }).catch(err => {
                    this.$Message.error("获取设备信息出现错误");
                })
            },
            cancel(){
                this.$store.commit('closeOneTag', this);
                this.$router.back(-1);
            },
            onSearchResult(pois){
                console.log(pois);
                let latSum = pois[0].lat;
                let lngSum = pois[0].lng;
                if (pois.length > 0) {
                    console.log(pois.length);
                    this.Marker.position = [lngSum, latSum];
//                    pois.forEach(poi => {
//                        let {lng, lat} = poi;
//                        lngSum += lng;
//                        latSum += lat;
////                        this.markers.push([poi.lng, poi.lat]);
//                    });
//                    let center = {
//                        lng: lngSum / pois.length,
//                        lat: latSum / pois.length
//                    };

                    this.mapCenter = [pois[0].lng, pois[0].lat];
                }
            }
        },
        created: function () {
            if (this.$route.query && this.$route.query != null && this.$route.query.id && this.$route.query.id != null) {
                this.DeviceId = this.$route.query.id;
            }
            this.getDeviceType();
            this.getDevice(this.DeviceId);
            this.getUserCon();
        }

    }
</script>