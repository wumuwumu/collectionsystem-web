<template>
    <div>
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
                <Table :columns="AreaColumns" height="auto" :show-header="false" :data="AreaData"
                       highlight-row
                ></Table>
            </Card>
            </Col>
        </Row>

    </div>
</template>

<script>
    export default {
        name: 'DeviceAreaController',
        data: function () {
            return {
                UserColumns: [
                    {
                        title: '账号',
                        key: 'account'
                    },
                ],
                UserData: [],
                AreaColumns: [
                    {
                        key: 'areaName',
                        title: '区域名'
                    }
                ],
                AreaData: []
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
            selectUser(currentRow, oldCurrentRow){
                this.CurrentUser = currentRow;
                this.getUserArea();
            },
            getUserArea(){
                this.$store.dispatch('ListUserAdminArea', this.CurrentUser.id).then((result) => {

                }).catch((err) => {
                    this.$Message.error("获取集中器列表出现错误");
                });
            }
        },
        mounted(){
            this.getUserData();
        }
    }
</script>