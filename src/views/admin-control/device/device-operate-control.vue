<template>
    <div>
        <!--添加设备的对话框-->
        <Modal
                v-model="AddDeviceModel"
                title="添加设备"
                @on-ok="addDevice">
            <Form ref="formInline" :model="formDevice">
                <FormItem label="设备名:">
                    <Input type="text" v-model="formDevice.name" placeholder="name">
                    </Input>
                </FormItem>
                <FormItem label="集中器编号:">
                    <Input type="text" v-model="formDevice.concentrator" placeholder="concentrator">
                    </Input>
                </FormItem>
                <FormItem label="连接在节点上:">
                    <checkbox v-model="LinkNode"/>
                </FormItem>
                <FormItem label="节点ip:">
                    <Input :disabled="!LinkNode" type="text" v-model="formDevice.node" placeholder="node">
                    </Input>
                </FormItem>
                <FormItem label="回路位置:">
                    <Input type="text" v-model="formDevice.circuit" placeholder="circuit">
                    </Input>
                </FormItem>
                <FormItem label="传感器类型:">
                    <Select v-model="formDevice.collectionType" style="width:200px">
                        <Option v-for="item in DeviceTypeList" :value="item.collectionName" :key="item.collectionName">
                            {{ item.collectionName }}
                        </Option>
                    </Select>
                </FormItem>
            </Form>
        </Modal>
        <Row>
            <Col :xs="24" :sm="6" :md="4" :lg="4">
            <Card>
                <p slot="title">
                    <Icon type="android-remove"></Icon>
                    区域管理
                </p>
                <Tree :data="AreaTreeData"
                      @on-select-change="clickTree"
                      ref="Tree"
                ></Tree>
            </Card>
            </Col>

            <Col :xs="24" :sm="18" :md="20" :lg="20" style="padding-left: 15px">
            <Card style="width:100%;height:100%;">
                <Button type="info" icon="plus" @click="addDevicePre()">添加设备</Button>
                <Button type="error" icon="trash-a" @click="deleteDevice()">删除设备</Button>
                <p slot="title">
                    <Icon type="android-remove"></Icon>
                    设备列表
                </p>
                <div class=" margin-top-8">
                    <Table ref="DeviceSelection" :columns="DeviceListColums" height="auto" :data="DeviceListData"
                           highlight-row
                    ></Table>
                </div>
            </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
    export default{
        name: 'DeviceOperateControl',
        data: function () {
            return {
                AreaTreeData: [],
                DeviceListColums: [],
                DeviceListData: [],
                DeviceListColums: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '设备名',
                        key: 'name',
                    },
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
                CurrentArea: null,
                AddDeviceModel: false,
                formDevice: {},
                DeviceTypeList: [],
                LinkNode: false,
            }
        },
        methods: {
            getDeviceData(areaId){
                this.$store.dispatch('GetAreaDevice', areaId).then((result) => {
                    this.DeviceListData = result.data;
                }).catch((err) => {
                    this.$Message.error("获取区域设备出现错误");
                });
            },
            clickTree(current){
                if (current.length < 1) {
                    return;
                }
                if (current[0].children != undefined || current[0].children != null) {
                    this.CurrentArea = null;
                    return;
                }
                this.CurrentArea = current[0];
                this.getDeviceData(this.CurrentArea.id);
            },
            getAreaTreeData(){
                this.$store.dispatch('GetAllAreaTree').then((result) => {
                    this.AreaTreeData = result.data;
                }).catch((err) => {
                    this.$Message.error("获取区域出现出现错误");
                });
            },
            addDevicePre(){
                if (this.CurrentArea == null) {
                    this.$Message.warning("请选择区域");
                    return;
                }
                this.$store.dispatch('GetDeviceType').then((result) => {
                    if (result.code == 1) {
                        this.DeviceTypeList = result.data;
                    } else {
                        this.$Message.error("获取设备类型失败");
                    }
                }).catch((err) => {
                    console.log("添加设备类型出现错误");
                    this.$Message.error(err);
                });
                this.AddDeviceModel = true;
            },
            deleteDevice(){
                var selectData = this.$refs.DeviceSelection.getSelection();
                if (selectData.length < 1) {
                    this.$Message.info("请选择设备");
                    return;
                }

                var data = [];
                for (var i = 0; i < selectData.length; i++) {
                    data.push(selectData[i].id);
                }
                this.$Modal.confirm({
                    title: '删除设备',
                    content: '<p>确定删除设备' + '</p>',
                    onOk: () => {
                        this.$store.dispatch('BatchDeleteDevice', data).then((result) => {
                            if (result.code == 1) {
                                this.getDeviceData(this.AreaId);
                                this.$Message.info("删除成功");
                            } else {
                                this.$Message.error("删除失败");
                            }
                        }).catch((err) => {
                            console.log("删除设备出现出现错误");
                            this.$Message.error(err);
                        });
                    },
                });
            },
            addDevice(){
                if (this.CurrentArea == null) {
                    this.$Message.warning("请选择区域");
                    return;
                }
                this.LinkNode ? Object.assign(this.formDevice, {parentType: 0}) : Object.assign(this.formDevice, {parentType: 1});
                Object.assign(this.formDevice, {area: this.CurrentArea.id, online: 0});
                this.$store.dispatch('AddDevice', this.formDevice).then((result) => {
                    if (result.code == 1) {
                        this.getDeviceData(this.CurrentArea.id);
                        this.formDevice = {};
                        this.$Message.info("添加成功");
                    } else {
                        this.$Message.error("添加失败");
                    }
                }).catch((err) => {
                    console.log("添加设备出现错误");
                    this.$Message.error(err);
                });
            }

        },
        mounted(){
            this.getAreaTreeData();
        }
    }
</script>