/**
 * Created by wumu on 12/5/17.
 */
import Cookies from 'js-cookie';
import * as request from '../../api/device'
import baseUrl from '../../utils/fetch';

const device = {
    state: {
        areaDevice: {},
        deviceOnlineLogRead: [],
        deviceOnlineLogNotRead: []
    },
    mutations: {
        SET_AREADEVICE: (state, areaDevice) => {
            state.areaDevice = areaDevice;
        },
        SET_DEVICEONLINEREAD: (state, deviceOnlineLogRead) => {
            state.deviceOnlineLogRead = deviceOnlineLogRead;
        },
        SET_DEVICEONLINENOTREAD: (state, deviceOnlineLogNotRead) => {
            state.deviceOnlineLogNotRead = deviceOnlineLogNotRead;
        },
    },
    actions: {
        // 解锁
        Unlock({commit}, password) {
            return new Promise((resolve, reject) => {
                request.unlock(password).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        //获取用户区域
        GetUserArea({commit}) {
            return new Promise((resolve, reject) => {
                request.getALlArea().then(response => {
                    console.log(response.data);
                    resolve(response.data);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        //添加区域
        AddArea({commit}, area) {
            return new Promise((resolve, reject) => {
                request.addArea(area).then(response => {
                    console.log(response.data);
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        //删除区域
        DeleteArea({commit}, id) {
            return new Promise((resolve, reject) => {
                request.deleteArea(id).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        //更新区域
        UpdateArea({commit}, area) {
            return new Promise((resolve, reject) => {
                request.updataArea(area).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        //获取区域设备
        GetAreaDevice({commit}, areaId) {
            return new Promise((resolve, reject) => {
                request.getAreaDevice(areaId).then(response => {
                    // commit("SET_AREADEVICE", response);
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },

        //获取区域设备和类型
        GetAreaDouDevice({commit}, data) {
            return new Promise((resolve, reject) => {
                request.getAreaDouDevice(data).then(response => {
                    commit("SET_AREADEVICE", response);
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },

        //获取设备简单历史
        GetDeviceHistory({commit}, data){
            return new Promise((resolve, reject) => {
                request.getDeviceHistory(data).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                })
            });
        },

        //获取设备类型
        GetDeviceType({commit}){
            return new Promise((resolve, reject) => {
                request.getDeviceType().then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                })
            });
        },

        //添加设备
        AddDevice({commit}, device){
            return new Promise((resolve, reject) => {
                request.addDevice(device).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error);
                })
            });
        },

        //删除设备
        BatchDeleteDevice({commit}, data){
            return new Promise((resolve, reject) => {
                request.batchDeleteData(data).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error);
                })
            });
        },
        //获取设备上下线消息
        GetDeviceOnlineLog({commit}){
            return new Promise((resolve, reject) => {
                request.getDeviceOnlineLog().then(response => {
                    commit("SET_DEVICEONLINEREAD", response.data.read);
                    commit("SET_DEVICEONLINENOTREAD", response.data.notRead);
                    resolve(response)
                }).catch(error => {
                    reject(error);
                })
            });
        },
        //读消息
        ReadMessage({commit}, id){
            return new Promise((resolve, reject) => {
                request.readMessage(id).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error);
                })
            });
        },
        //删除消息
        DeleteMessage({commit}, id){
            return new Promise((resolve, reject) => {
                request.deleteMessage(id).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                })
            });
        },
        //获取包括信息的历史记录
        GetDeviceAllHistory({commit}, data){
            return new Promise((resolve, reject) => {
                request.getDeviceAllHistory(data).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                })
            })
        },
        //下载历史csv
        DownloadCsvHistory({commit},data){
            return new Promise((resolve, reject) => {
                request.downloadCsvHistory(data).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                })
            })
        },
        //获取设备树
        GetDeviceTree({commit}){
            return new Promise((resolve, reject) => {
                request.getDeviceTree().then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                })
            })
        },

        //获取两个时间点的历史
        GetBetweenHistory({commit},data){
            return new Promise((resolve, reject) => {
                request.getBetweenHistory(data).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                })
            })
        },

        // 分页获取两个时间点的历史
        GetBetweenHistoryPage({commit},data){
            return new Promise((resolve, reject) => {
                request.getBetweenHistoryPage(data).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                })
            })
        },

        //获取两个时间点中间的历史和掉线信息
        GetBetweemAllHistory({commit}, data){
            return new Promise((resolve, reject) => {
                request.getBetweenAllHistory(data).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                })
            })
        },

        //获取掉线信息
        GetOfflineInfoPage({commit}, data){
            return new Promise((resolve, reject) => {
                request.getOfflineInfoPage(data).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                })
            })
        },

        //获取日报表
        GetDeviceDayReport({commit}, data){
            return new Promise((resolve, reject) => {
                request.getDeviceDayReport(data).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                })
            })
        },

        //获取设备的日报表excel
        GetDeviceDayExcel({commit}, data){
            // return request.getDeviceDayExcel(data);
            return new Promise((resolve, reject) => {
                request.getDeviceDayExcel(data).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                })
            })
        }
    }
};

export default device;

