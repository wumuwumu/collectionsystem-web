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
        }
    }
}