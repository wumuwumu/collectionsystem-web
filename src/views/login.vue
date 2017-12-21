<style lang="less">
    @import './login.less';
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="loginForm" :rules="rules">
                        <FormItem prop="username">
                            <Input v-model="loginForm.username" placeholder="请输入用户名">
                            <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="loginForm.password" placeholder="请输入密码">
                            <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit('loginForm')" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>

                </div>
            </Card>
        </div>
    </div>
</template>

<script>
    import Cookies from 'js-cookie';
    export default {
        data () {
            const validateName = (rule, value, callback) => {
                if (value.length < 5) {
                    callback(new Error('账号不符合要求'));
                } else {
                    callback();
                }
            };
            const validatePass = (rule, value, callback) => {
                if (value.length < 6) {
                    callback(new Error('密码不能小于6位'));
                } else {
                    callback();
                }
            };
            return {

                loginForm: {
                    username: 'admin',
                    password: '123456'
                },
                rules: {
                    username: [
                        {required: true, trigger: 'blur', validator: validateName}
                    ],
                    password: [
                        {required: true, trigger: 'blur', validator: validatePass}
                    ]
                }
            };
        },
        methods: {
            handleSubmit () {
                this.$refs.loginForm.validate((valid) => {
//                    if (valid) {
//                        Cookies.set('user', this.form.userName);
//                        Cookies.set('password', this.form.password);
//                        this.$store.commit('setAvator', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg');
//                        if (this.form.userName === 'iview_admin') {
//                            Cookies.set('access', 0);
//                        } else {
//                            Cookies.set('access', 1);
//                        }
//                        this.$router.push({
//                            name: 'home_index'
//                        });
//                    }
                    if (valid) {
                        console.log(this.loginForm);
                        this.loading = true;
                        this.$store.dispatch('LoginByUsername', this.loginForm).then((result) => {
                            if(result.code ==1 ) {
                                this.$Message.success('登录成功');
                                this.loading = false;
                                if (this.loginForm.username === 'admin') {
                                    Cookies.set('access', 0);
                                } else {
                                    Cookies.set('access', 1);
                                }
                                this.$store.commit('setAvator', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg');
                                this.$router.push({path: '/'});
                            }else {
                                this.$Message.error("登录失败");
                            }
                        }).catch((err) => {
                            this.$Message.error("登录出现错误");
                            this.loading = false;
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    };
</script>

<style>

</style>
