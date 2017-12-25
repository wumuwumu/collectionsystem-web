/**
 * Created by wumu on 12/22/17.
 */
import * as request from '../../api/user-admin'

const userAdmin = {
    state: {},
    mutations: {},
    actions: {
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
    }
}

export default userAdmin;