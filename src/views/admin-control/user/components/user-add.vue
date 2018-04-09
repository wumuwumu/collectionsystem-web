<template>
    <div>
        <Spin size="large" fix v-if="spinShow"></Spin>
        <Card>
            <p slot="title">
                <span>{{FormItem.id ? '编辑' : '新增'}}</span>
            </p>
            <Form ref="menuRef" :model="FormItem" :label-width="80">
                <FormItem label="账号">
                    <Input v-model="FormItem.account" placeholder="用户账号(长度不能小于6位)"></Input>
                </FormItem>
                <FormItem label="名字">
                    <Input v-model="FormItem.username" placeholder="用户名字"></Input>
                </FormItem>
                <FormItem label="密码">
                    <Input v-model="FormItem.password" placeholder="密码（不能少于6位）" type="password"></Input>
                </FormItem>
                <FormItem label="手机号">
                    <Input v-model="FormItem.mobile" placeholder="手机号"></Input>
                </FormItem>
                <FormItem label="邮箱">
                    <Input v-model="FormItem.email" placeholder="邮箱"></Input>
                </FormItem>
                <FormItem label="qq">
                    <Input v-model="FormItem.qq" placeholder="qq号"></Input>
                </FormItem>
                <FormItem label="微信">
                    <Input v-model="FormItem.weiXin" placeholder="微信"></Input>
                </FormItem>
                <FormItem label="公司名">
                    <Input v-model="FormItem.company" placeholder="公司名"></Input>
                </FormItem>
                <FormItem label="状态">
                    <RadioGroup v-model="FormItem.status">
                        <Radio label="0">禁用</Radio>
                        <Radio label="1">启用</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem>
                    <Button v-show="FormItem.id" type="primary" @click="updateUser">保存</Button>
                    <Button v-show="!FormItem.id" type="primary" @click="addUser">添加</Button>
                    <Button type="primary" @click="cancelEdit">取消</Button>
                </FormItem>
            </Form>
        </Card>
    </div>
</template>

<script>
    export default{
        name: 'UserAdd',
        components: {},
        props: {},
        data: function () {
            return {
                FormItem: {
                    id: null,
                    status: "1"
                },
                spinShow: false,
            }
        },
        methods: {
            loadData(){
                if (this.$route.query && this.$route.query != null && this.$route.query.id && this.$route.query.id != null) {
                    this.FormItem.id = this.$route.query.id;
                } else {
                    this.$store.commit("SET_OPERATING_USER", {});
                }
                if (this.FormItem.id > 0) {
                    this.FormItem = this.$store.getters.operatingUser;
                }


            },
            updateUser(){
                let data = {
                    id: this.FormItem.id,
                    username: this.FormItem.username,
                    email: this.FormItem.email,
                    mobile: this.FormItem.mobile,
                    status: this.FormItem.status,
                    weiXin: this.FormItem.weiXin,
                    qq: this.FormItem.qq,
                    company: this.FormItem.company
                }
                this.spinShow = true;
                this.$store.dispatch('UpdateUser', data).then((result) => {
                    if (result.code == 1) {
                        this.updatePage();
                    } else {
                        this.spinShow = false;
                        this.$Message.error('更新失败');
                    }
                }).catch((err) => {
                    this.spinShow = false;
                    this.$Message.error("更新用户出现错误");
                });
            },
            addUser(){
                let data = {
                    account: this.FormItem.account,
                    username: this.FormItem.username,
                    email: this.FormItem.email,
                    mobile: this.FormItem.mobile,
                    status: this.FormItem.status,
                    weiXin: this.FormItem.weiXin,
                    password: this.FormItem.password,
                    qq: this.FormItem.qq,
                    company: this.FormItem.company
                };
                this.spinShow = true;
                this.$store.dispatch('AddUser', data).then((result) => {
                    if (result.code == 1) {
                        this.updatePage();
                    } else {
                        this.spinShow = false;
                        this.$Message.error('添加失败');
                    }
                }).catch((err) => {
                    this.spinShow = false;
                    this.$Message.error("添加用户出现错误");
                });
            },
            cancelEdit(){
                this.updatePage();
            },
            updatePage(){
                this.spinShow = false;
                this.$store.commit('closeOneTag', this);
                this.$router.push({path: '/user-admin/user-control'});
            }
        },
        created(){
            this.loadData();
        },
    }
</script>

