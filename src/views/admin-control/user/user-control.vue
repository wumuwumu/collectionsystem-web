<template>
    <div>
        <Table :columns="UserColumn" :data="UserData"></Table>
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
                        width: 40,
                        render: (h, params) => {
                            return h(UserExpand, {
                                props: {
                                    row: params.row
                                }
                            })
                        }
                    },
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
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
                    }

                ],
                UserData: [],
                page: 1,
                row: 10
            }
        },
        methods: {
            getUserListDate(){
                let data = {
                    page: this.page,
                    row: this.row
                };
                this.$store.dispatch('GetUserList', data).then((result) => {
                    this.UserData = result.data;
                }).catch((err) => {
                    this.$Message.error("获取设备树出现错误");
                });
            },
        },
        mounted: function () {
            this.getUserListDate();
        }
    }
</script>