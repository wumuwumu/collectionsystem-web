/**
 * Created by wumu on 12/25/17.
 */
import * as request from '../../api/device-admin'

export default {
    state: {
        operatingDeviceType: {},
    },
    mutations: {
        SET_OPERATING_DEVICETYPE(state, deviceType){
            state.operatingDeviceType = deviceType;
        }
    },
    actions: {
        //分页获取设备类型
        GetDeviceTypePage({commit}, data){
            return new Promise((resolve, reject) => {
                request.getDeviceTypePage(data).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                })
            });
        },

        //添加采集类型
        AddDeviceType({commit}, data){
            return new Promise((resolve, reject) => {
                request.addDeviceType(data).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                })
            });
        },

        //更新采集类型
        UpdateDeviceType({commit}, data){
            return new Promise((resolve, reject) => {
                request.updateDeviceType(data).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                })
            });
        },

        //删除采集类型
        DeleteDeviceType({commit}, id){
            return new Promise((resolve, reject) => {
                request.deleteDeviceType(id).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                })
            });
        },

        //获取所有的区域树
        GetAllAreaTree({commit}){
            return new Promise((resolve, reject) => {
                request.getAllAreaTree().then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                })
            })
        },

        //分页获取用户集中器
        GetUserConPage({commit}, data){
            return new Promise((resolve, reject) => {
                request.getUserConPage(data).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                })
            })
        },

        //删除用户的集中器
        DeleteUserCon({commit}, id){
            return new Promise((resolve, reject) => {
                request.deleteUserCon(id).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                })
            })
        },

        //添加用户集中器
        AddUserCon({commit}, data){
            return new Promise((resolve, reject) => {
                request.addUserCon(data).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                })
            })
        },

        //管理员列出区域
        ListUserAdminArea({commit}, data){
            return new Promise((resolve, reject) => {
                request.listUserAdminArea(data).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                })
            })
        },

        //管理员添加区域
        AddAdminArea({commit}, data){
            return new Promise((resolve, reject) => {
                request.addAdminArea(data).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                })
            })
        },

        //管理员添加设备
        AddAdminDevice({commit}, data){
            return new Promise((resolve, reject) => {
                request.addAdminDeviceList(data).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                })
            })
        }
    }
}