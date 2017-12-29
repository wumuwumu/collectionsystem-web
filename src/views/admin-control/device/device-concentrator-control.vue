<template>
    <div>
        <Modal
                v-model="AddaConModel"
                title="添加集中器"
                @on-ok="addUserCon">
            <tr>
                <td>集中器编号:</td>
                <td>
                    <input type="text" class="margin-left-10" placeholder="集中器编号" v-model="ConNumber">
                </td>
            </tr>
        </Modal>
        <Card>
            <Button type="primary" icon="plus" @click="addUserConPre">添加</Button>
            <Row>
                <Col :sm="24" :md="6" :lg="5">
                <div class=" margin-top-8">
                    <!--<can-edit-table refs="table2" v-model="editInlineData"  :showHeader="false"-->
                    <!--:columns-list="editInlineColumns"></can-edit-table>-->
                    <Table :columns="UserColumns" height="auto" :show-header="false" :data="UserData"
                           @on-current-change="selectUser"
                           highlight-row
                    ></Table>
                </div>
                </Col>

                <Col :sm="24" :md="18" :lg="19" class="padding-left-10">
                <Card>
                    <Table style="margin: 10px" :columns="ConColumn" :data="ConData">
                    </Table>
                    <Page :total="PageTotal" show-sizer show-total @on-change="pageChange"
                          @on-page-size-change="sizeChange"
                          style="margin:10px;text-align:center;align:right"></Page>
                </Card>
                </Col>
            </Row>
        </Card>
    </div>
</template>

<script>
    export default{
        name: 'DeviceConcentratorControl',
        data: function () {
            return {
                UserColumns: [
                    {
                        title: '账号',
                        key: 'account'
                    },
                ],
                UserData: [],
                ConColumn: [
                    {
                        title: '用户账号',
                        key: 'userAccount'
                    },
                    {
                        title: '集中器编号',
                        key: 'concentratorNumber'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        render: (h, params) => {
                            return h('div', [
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
                                            this.deleteConPre(params.row);
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                ConData: [],
                CurrentUser: {},
                page: 1,
                row: 10,
                PageTotal: 0,
                AddaConModel: false,
                ConNumber: ""
            }
        },
        methods: {
            getUserData(){
                this.$store.dispatch('GetUserList').then((result) => {
                    this.UserData = result.data;
                }).catch((err) => {
                    this.$Message.error("获取用户列表出现错误");
                });
            },
            getUserCon(){
                let data = {
                    page: this.page,
                    row: this.row,
                    userId: this.CurrentUser.id
                };
                this.$store.dispatch('GetUserConPage', data).then((result) => {
                    this.ConData = result.data;
                    this.PageTotal = result.data.length;
                }).catch((err) => {
                    this.$Message.error("获取集中器列表出现错误");
                });
            },
            selectUser(currentRow, oldCurrentRow){
                this.CurrentUser = currentRow;
                this.getUserCon();
            },
            pageChange(page){
                this.page = page;
                this.getUserCon();
            },
            sizeChange(size){
                this.row = size;
                this.getUserCon();
            },
            deleteConPre(row){
                this.$Modal.confirm({
                    title: '删除集中器',
                    content: '<p>确定删除集中器' + row.concentratorNumber + '</p>',
                    onOk: () => {
                        this.$store.dispatch('DeleteUserCon', row.id).then((result) => {
                            if (result.code == 1) {
                                this.$Message.info('删除成功');
                                this.getUserCon();
                            } else {
                                this.$Message.error("删除失败");
                            }
                        }).catch((err) => {
                            console.log("删除区域出现错误");
                            this.$Message.error(err);
                        });
                    },
                });
            },
            addUserConPre(){
                this.AddaConModel = true;
                this.ConNumber = "";
            },
            addUserCon(){
                if (this.ConNumber == "") {
                    this.$Message.info("请填写集中器编号");
                    return;
                } else {
                    let data = {
                        userId: this.CurrentUser.id,
                        userAccount: this.CurrentUser.account,
                        concentratorNumber: this.ConNumber
                    };
                    this.$store.dispatch('AddUserCon', data).then((result) => {
                        if (result.code == 1) {
                            this.$Message.info('添加成功');
                            this.getUserCon();
                        } else {
                            this.$Message.error("添加失败");
                        }
                    }).catch((err) => {
                        console.log("添加集中器出现错误");
                        this.$Message.error(err);
                    });
                }
            }
        },
        mounted(){
            this.getUserData();
        }
    }
</script>