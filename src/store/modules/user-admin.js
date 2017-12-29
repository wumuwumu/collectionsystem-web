/**
 * Created by wumu on 12/22/17.
 */
import * as request from '../../api/user-admin'

const userAdmin = {
    state: {
        operatingUser: {},
    },
    mutations: {
        SET_OPERATING_USER(state, user){
            state.operatingUser = user;
        }
    },
    actions: {
        //分页获取用户的列表
        GetUserListPage({commit}, data) {
            return new Promise((resolve, reject) => {
                request.getUserListPage(data).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },

        //获取用户的列表
        GetUserList({commit}, data) {
            return new Promise((resolve, reject) => {
                request.getUserList(data).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },

        //获取菜单树
        GetMenuTree({commit}){
            return new Promise((resolve, reject) => {
                request.getMenuTree().then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },

        //获取所有的菜单list
        GetAllMenuList({commit}){
            return new Promise((resolve, reject) => {
                request.getAllMenuList().then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },

        //批量删除权限
        BatchDeleteMenu({commit}, data){
            return new Promise((resolve, reject) => {
                request.batchDeleteMenu(data).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },

        //添加菜单
        AddMenu({commit}, data){
            return new Promise((resolve, reject) => {
                request.addMenu(data).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },

        //更新菜单
        UpdateMenu({commit}, data){
            return new Promise((resolve, reject) => {
                request.updateMenu(data).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },

        //添加用户
        AddUser({commit}, data){
            return new Promise((resolve, reject) => {
                request.addUser(data).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },

        //更新用户
        UpdateUser({commit}, data){
            return new Promise((resolve, reject) => {
                request.updateUser(data).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },

        //删除用户
        DeleteUser({commit}, data){
            return new Promise((resolve, reject) => {
                request.deleteUser(data).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },

        //获取用户授权显示的信息
        GetUserRoleAuthor({commit}, data){
            return new Promise((resolve, reject) => {
                request.getUserRoleAuthor(data).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },

        //更新用户的权限
        UpdateUserRole({commit}, data){
            return new Promise((resolve, reject) => {
                request.updateUserRole(data).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },

        //获取角色列表
        GetRoleList({commit}){
            return new Promise((resolve, reject) => {
                request.getRoleList().then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },

        //添加角色
        AddRole({commit}, data){
            return new Promise((resolve, reject) => {
                request.addRole(data).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },

        //更新角色
        UpdateRole({commit}, data){
            return new Promise((resolve, reject) => {
                request.updateRole(data).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },

        //删除角色
        DeleteRole({commit}, id){
            return new Promise((resolve, reject) => {
                request.deleteRole(id).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },

        //修改角色权限
        UpdateRoleMenu({commit}, data){
            return new Promise((resolve, reject) => {
                request.updateRoleMenu(data).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        }
    }
}

export default userAdmin;