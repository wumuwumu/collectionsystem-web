<template>
    <div>
        <Modal
                v-model="PasswordModel"
                title="配置用户角色"
                @on-ok="changePassword">
            <div>
                <Form :model="PassItem" :label-width="80">
                    <FormItem label="新密码：">
                        <Input v-model="PassItem.password" placeholder="password"></Input>
                    </FormItem>
                </Form>
            </div>
        </Modal>
        <Modal
                v-model="AuthorModel"
                title="配置用户角色"
                @on-ok="authorUser">
            <div>
                <CheckboxGroup v-model="RoleAllGroup" @on-change="RoleAllGroupChange">
                    <Checkbox v-for="item in AllRole" :label="item.id" :key="item.id">{{item.roleName}}</Checkbox>
                </CheckboxGroup>
            </div>
        </Modal>
        <router-link :to="{ path: '/user-admin/user-control/add'}">
            <Button type="primary" icon="plus" style="margin: 10px">添加</Button>
        </router-link>
        <Table style="margin: 10px" :columns="UserColumn" :data="UserData">
        </Table>
        <Page :total="PageTotal" show-sizer show-total @on-change="pageChange" @on-page-size-change="sizeChange"
              style="margin:10px;text-align:center;align:right"></Page>
    </div>
</template>

<script>
    import UserExpand from './components/user-expand.vue'
    export default {
        name: 'UserControl',
        components: {
            UserExpand
        },
        data: function () {
            return {
                UserColumn: [
                    {
                        type: 'expand',
                        width: 60,
                        render: (h, params) => {
                            return h(UserExpand, {
                                props: {
                                    row: params.row
                                }
                            })
                        }
                    },
                    {
                        title: '账号',
                        key: 'account'
                    },
                    {
                        title: '用户名',
                        key: 'username',
                    },
                    {
                        title: '状态',
                        key: 'status',
                        render: (h, params) => {
                            if (params.row.status == 1) {
                                return h("span", {
                                    color: 'red'
                                }, '启用');
                            } else {
                                h("span", {
                                    color: "blue"
                                }, '禁用');
                            }

                        }
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
                                            this.updateUser(params.row);
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
                                            this.deleteUserPre(params.row);
                                        }
                                    }
                                }, '删除'),
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
                                            this.authorUserPre(params.row);
                                        }
                                    }
                                }, '授权'),
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
                                            this.updatePassword(params.row);
                                        }
                                    }
                                }, '修改密码'),
                            ]);
                        }
                    }

                ],
                UserData: [],
                page: 1,
                row: 10,
                PageTotal: 0,
                AuthorModel: false,
                RoleAllGroup: [],
                AllRole: [],
                SelectRole: [],
                CurrentUserId: 0,
                PasswordModel: false,
                PassItem: {},
            }
        },
        methods: {
            getUserListDate(){
                let data = {
                    page: this.page,
                    row: this.row
                };
                this.$store.dispatch('GetUserListPage', data).then((result) => {
                    this.UserData = result.data;
                    this.PageTotal = result.total;
                }).catch((err) => {
                    this.$Message.error("获取用户列表出现错误");
                });
            },
            updateUser(row){
                console.log(row)
                this.$store.commit("SET_OPERATING_USER", row);
                this.$router.push({path: '/user-admin/user-control/add', query: {id: row.id}});
            },
            deleteUserPre(row){
                this.$Modal.confirm({
                    title: '删除用户',
                    content: '<p>确定删除' + row.account + '</p>',
                    onOk: () => {
                        this.$store.dispatch('DeleteUser', row.id).then((result) => {
                            if (result.code != 1) {
                                this.$Message.error('删除失败');
                                return
                            }
                            this.getUserListDate();
                        }).catch((err) => {
                            this.$Message.error("删除用户出现错误");
                        });
                    },
                });
            },
            authorUserPre(row){
                let data = {
                    userId: row.id
                };
                this.$store.dispatch('GetUserRoleAuthor', data).then((result) => {
                    if (result.code != 1) {
                        this.$Message.error('获取信息失败');
                        return;
                    }
                    this.AllRole = result.data.role;
                    this.RoleAllGroup = [];
                    let userRole = result.data.userRole;
                    for (let i = 0; i < userRole.length; i++) {
                        this.RoleAllGroup.push(userRole[i].roleId);
                    }
                }).catch((err) => {
                    this.$Message.error("获取信息失败出现错误");
                });
                this.AuthorModel = true;
                this.CurrentUserId = row.id;
            },
            authorUser(){
                let data = [];
                for (let role of this.RoleAllGroup) {
                    data.push({
                        userId: this.CurrentUserId,
                        roleId: role
                    });
                }
                this.$store.dispatch('UpdateUserRole', data).then((result) => {
                    if (result.code != 1) {
                        this.$Message.error('更新信息失败');
                        return;
                    }
                    this.$Message.info('更新成功');
                }).catch((err) => {
                    this.$Message.error("更新角色出现错误");
                });
            },
            RoleAllGroupChange(roles){
                console.log(roles);
                console.log(this.RoleAllGroup);
                this.SelectRole = roles;
            },
            pageChange(page){
                this.page = page;
                this.getUserListDate();
            },
            sizeChange(size){
                this.row = size;
                this.getUserListDate();
            },
            updatePassword(row){
                this.CurrentUserId = row.id;
                this.PasswordModel = true;
            },
            changePassword(){
                if (this.PassItem.password.length < 6) {
                    this.$Message.warning("密码长度不能小于6");
                    return;
                }
                let data = {
                    id: this.CurrentUserId,
                    password: this.PassItem.password
                };
                this.$store.dispatch('ChangeAdminPassword', data).then((result) => {
                    if (result.code != 1) {
                        this.$Message.error('修改密码失败');
                        return;
                    }
                    this.PassItem.password = '';
                    this.$Message.info('修改密码成功');
                }).catch((err) => {
                    this.$Message.error("修改密码出现错误");
                });
            }

        },
        mounted: function () {
            this.getUserListDate();
        }
    }
</script>