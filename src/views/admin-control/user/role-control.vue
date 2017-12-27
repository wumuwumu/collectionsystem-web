<style>
    @import '../../../styles/common.less';
    @import './components/style/role-list.less';
</style>

<template>
    <Card style="padding: 15px">
        <Modal
                v-model="AuthorModel"
                title="配置权限"
                @on-ok="authorRole">
            <div>
                <Tree :data="MenuData" show-checkbox
                      ref="Tree"
                ></Tree>
            </div>
        </Modal>
        <Spin size="large" fix v-if="spinShow"></Spin>
        <Button type="primary" icon="plus" @click="addRolePre">添加</Button>
        <Row style="margin-top: 15px">
            <Col :xs="24" :sm="6" :md="6" :lg="6">
            <Card>
                <p slot="title">
                    <Icon type="ios-paper-outline"></Icon>
                    角色列表
                </p>
                <div>
                    <ul class="iview-admin-draggable-list">
                        <li v-for="(item , index) in RoleList" :key="index" class="notwrap" :data-index="index"
                            style="font-size: small"
                            @click="clickRole(item)">
                            <Icon type="android-contacts"></Icon>
                            {{ item.roleName }}
                        </li>
                    </ul>
                </div>
            </Card>
            </Col>

            <Col :xs="24" :sm="18" :md="18" :lg="18" style="padding-left: 15px">
            <Card style="padding: 10px">
                <Form ref="roleRef" :model="FormItem" :label-width="80">
                    <FormItem label="名称">
                        <Input v-model="FormItem.roleName" placeholder="角色名称"></Input>
                    </FormItem>
                    <FormItem label="角色标识">
                        <Input v-model="FormItem.roleSign" placeholder="请输入英文"></Input>
                    </FormItem>
                    <FormItem label="描述">
                        <Input v-model="FormItem.remark" placeholder="角色的标志"></Input>
                    </FormItem>
                    <FormItem>
                        <Button v-show="AddOrUpdate" type="primary" icon="android-arrow-up" @click="updateRole">保存
                        </Button>
                        <Button style="margin-left: 10px" v-show="AddOrUpdate" type="error" icon="trash-a"
                                @click="otherDeleteRole">删除
                        </Button>
                        <Button style="margin-left: 10px" v-show="!AddOrUpdate" type="primary" icon="plus"
                                @click="addRole">添加
                        </Button>
                        <Button style="margin-left: 10px" v-show="AddOrUpdate" type="success" icon="flag"
                                @click="addRoleMenu">授权
                        </Button>
                    </FormItem>
                </Form>
            </Card>
            </Col>
        </Row>

    </Card>
</template>

<script>
    export default{
        name: 'RoleControl',
        data: function () {
            return {
                RoleList: [],
                AddOrUpdate: false,
                FormItem: {},
                spinShow: false,
                AuthorModel: false,
                MenuData: [],
            }
        },
        methods: {
            getRoleList(){
                this.$store.dispatch('GetRoleList').then((result) => {
                    if (result.code != 1) {
                        this.$Message.error('获取菜单列表失败');
                        return;
                    }
                    this.RoleList = result.data;
                }).catch((err) => {
                    this.$Message.error("获取菜单列表出现错误");
                });
            },
            addRolePre(){
                this.FormItem = {};
            },
            updateRole(){
                let data = {
                    id: this.FormItem.id,
                    roleName: this.FormItem.roleName,
                    roleSign: this.FormItem.roleSign,
                    remark: this.FormItem.remark
                };
                this.spinShow = true;
                this.$store.dispatch('UpdateRole', data).then((result) => {
                    this.spinShow = false;
                    if (result.code != 1) {
                        this.$Message.error('添加角色失败');
                        return;
                    }
                    this.$Message.info('更新成功');
                    this.getRoleList();
                }).catch((err) => {
                    this.spinShow = false;
                    this.$Message.error("添加角色出现错误");
                });
            },
            otherDeleteRole(){
                this.spinShow = true;
                this.$store.dispatch('DeleteRole', this.FormItem.id).then((result) => {
                    this.spinShow = false;
                    if (result.code != 1) {
                        this.$Message.error('删除角色失败');
                        return;
                    }
                    this.$Message.info('删除成功');
                    this.getRoleList();
                }).catch((err) => {
                    this.$Message.error("删除角色出现错误");
                    this.spinShow = false;
                });
            },
            addRole(){
                let data = {
                    roleName: this.FormItem.roleName,
                    roleSign: this.FormItem.roleSign,
                    remark: this.FormItem.remark
                };
                this.spinShow = true;
                this.$store.dispatch('AddRole', data).then((result) => {
                    this.spinShow = false;
                    if (result.code != 1) {
                        this.$Message.error('添加角色失败');
                        return;
                    }
                    this.$Message.info('添加成功');
                    this.getRoleList();
                }).catch((err) => {
                    this.spinShow = false;
                    this.$Message.error("添加角色出现错误");
                });
            },
            clickRole(row){
                this.AddOrUpdate = true;
                this.FormItem = row;
            },
            addRoleMenu(){
                this.getAllMenuList();
                this.AuthorModel = true;
            },
            authorRole(){
                let roles = this.$refs.Tree.getCheckedNodes();
                console.log(roles);
                let data = [];
                for (let item of roles) {
                    data.push({
                        roleId: this.FormItem.id,
                        menuId: item.id
                    });
                }
                this.spinShow = true;
                this.$store.dispatch('UpdateRoleMenu', data).then((result) => {
                    this.spinShow = false;
                    if (result.code != 1) {
                        this.$Message.error('授权失败');
                        return;
                    }
                    this.$Message.info('授权成功');
                }).catch((err) => {
                    this.spinShow = false;
                    this.$Message.error("授权出现错误");
                });
            },
            getAllMenuList(){
                this.$store.dispatch('GetMenuTree').then((result) => {
                    this.MenuData = result.data;
                }).catch((err) => {
                    this.$Message.error("获取菜单出现错误");
                });
            },
        },
        created(){
            this.getRoleList();
        }
    }
</script>