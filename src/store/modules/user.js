import * as request from '../../api/user';
import Cookies from 'js-cookie';

const user = {
    state: {
        user: '',
        status: '',
        email: '',
        code: '',
        uid: undefined,
        auth_type: '',
        token: Cookies.get('token'),
        name: '',
        avatar: '',
        introduction: '',
        roles: [],
        setting: {
            articlePlatform: []
        }
    },
    mutations: {
        SET_AUTH_TYPE: (state, type) => {
            state.auth_type = type;
        },
        SET_CODE: (state, code) => {
            state.code = code;
        },
        SET_TOKEN: (state, token) => {
            state.token = token;
        },
        SET_UID: (state, uid) => {
            state.uid = uid;
        },
        SET_EMAIL: (state, email) => {
            state.email = email;
        },
        SET_INTRODUCTION: (state, introduction) => {
            state.introduction = introduction;
        },
        SET_SETTING: (state, setting) => {
            state.setting = setting;
        },
        SET_STATUS: (state, status) => {
            state.status = status;
        },
        SET_NAME: (state, name) => {
            state.name = name;
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar;
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles;
        },
        LOGIN_SUCCESS: () => {
            console.log('login success')
        },
        LOGOUT_USER: state => {
            state.user = '';
        },
    },
    actions:{
        //获取用户的角色
        GetCurrentUserRole({commit}){
            return new Promise((resolve, reject) => {
                request.getCurrentUserRole().then(response => {
                    Cookies.set('access', response.data);
                    resolve(response);
                }).catch(error => {
                    reject(error);
                })
            });
        },
        // 登录
        LoginByUsername({ commit }, userInfo) {
            const username = userInfo.username.trim();
            return new Promise((resolve, reject) => {
                request.loginByUsername(username, userInfo.password).then((response) => {
                    Cookies.set('token', response.data)
                    Cookies.set('user', username)
                    // // commit('SET_TOKEN', data);
                    // commit('SET_NAME', username);
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },


        // 获取用户信息
        GetInfo({ commit, state }) {
            return new Promise((resolve, reject) => {
                request.getInfo(state.token).then(response => {
                    const data = response.data;
                    commit('SET_ROLES', JSON.stringify(data.roleList));
                    commit('SET_UID', data.id);
                    commit('SET_NAME', data.username)
                    commit('SET_INTRODUCTION', data.company);
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        // 登出
        LogOut({ commit, state }) {
            return new Promise((resolve, reject) => {
                request.logout().then((response) => {
                    commit('SET_ROLES', []);
                    Cookies.remove('token');
                    Cookies.remove('user');
                    Cookies.remove('access');
                    localStorage.clear()
                    let themeLink = document.querySelector('link[name="theme"]')
                    themeLink.setAttribute('href', '')
                    // 清空打开的页面等数据，但是保存主题数据
                    let theme = ''
                    if (localStorage.theme) {
                        theme = localStorage.theme
                    }
                    localStorage.clear()
                    if (theme) {
                        localStorage.theme = theme
                    }
                    resolve(response);
                }).catch(error => {
                    reject(error);
                    Cookies.remove('token');
                    Cookies.remove('user');
                    Cookies.remove('access');
                });
            });
        },

        //更新token
        UpdateToken({commit}){
            return new Promise(resolve => {
                request.updateToken().then((response) => {
                    Cookies.set('token', response.data, {expires: 7})
                    resolve(response)
                })
            })
        },

        // 前端 登出
        FedLogOut({commit}) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '');
                Cookies.remove('token');
                Cookies.remove('user');
                Cookies.remove('access');
                localStorage.clear()
                resolve();
            });
        },

        //修改密码
        ChangePassword({commit},data){
            return new Promise((resolve,reject) =>{
                request.changPassword(data).then((response) =>{
                    resolve(response);
                }).catch((error) =>{
                    reject(error);
                })
            });
        },
        //修改用户信息
        ChangeUserPassword({commit},data){
            return new Promise((resolve,reject)=>{
                request.updateUserInfo(data).then(response =>{
                    resolve(response);
                }).catch(error =>{
                    reject(error);
                })
            });
        },
    }
};

export default user;
