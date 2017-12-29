/**
 * Created by wumu on 12/5/17.
 */
import fetch from '../utils/fetch';
import {baseUrl} from '../utils/fetch';

export function unlock(password) {
    const data = {
        "password": password
    };
    return fetch({
        url: '/jwt/unlock',
        method: 'post',
        data
    });
}

export function getALlArea() {
    return fetch({
        url: '/area/user/list',
        method: 'get'
    });
}

export function deleteArea(id) {
    return fetch({
        url: '/area/' + id,
        method: 'delete'
    });
}

export function updataArea(data) {
    return fetch({
        url: '/area/update',
        method: 'put',
        data
    });
}

export function addArea(area) {
    return fetch({
        url: '/area/add',
        method: 'post',
        data: area
    });
}

export function getAreaDevice(data) {
    return fetch({
        url: '/device/devicelist/area/list' + "?areaId=" + data,
        method: 'get',
    });
}

export function getAreaDevicePage(data) {
    return fetch({
        url: '/device/devicelist/area/page' + "?areaId=" + data.areaId,
        method: 'post',
        data
    });
}

export function getAreaDouDevice(data) {
    return fetch({
        url: '/device/devicelist/area/douList',
        method: 'get',
        params: data
    });
}

export function getDeviceHistory(data) {
    console.log("getDeviceHistory" + data.deviceId);
    return fetch({
        url: '/device/history/simplelist',
        method: 'post',
        params: data
    });
}

export function getDeviceType() {
    return fetch({
        url:'device/deviceType/list',
        method:'post'
    })
}

export function addDevice(device) {
    return fetch({
        url:'device/devicelist/add',
        method:'post',
        data:device
    })
}

export function batchDeleteData(data) {
    return fetch({
        url:'device/devicelist/batchDelete',
        method:'post',
        data
    })
}
export function getDeviceOnlineLog() {
    return fetch({
        url:"/device/onlinelog/user",
        method :'get'
    })
}

export function readMessage(id) {
    return fetch({
        url:'device/onlinelog/read',
        method:'post',
        params:id
    })
}

export  function deleteMessage(id) {
    return fetch({
        url:'device/onlinelog/delete',
        method:'post',
        params:id
    })
}
//获取历史数据，包括相关信息
export function getDeviceAllHistory(data) {
    return fetch({
        url:'/device/history/page',
        method:'post',
        data
    })
}

export function downloadCsvHistory(data) {
    return fetch({
        url:'/device/onlinelog/CSV',
        method:'get',
        params:data
    })
}

export function getDeviceTree() {
    return fetch({
        url:"device/devicelist/user/tree",
        method:'post'
    })
}

export function getBetweenHistory(data) {
    return fetch({
        url:"device/history/between",
        method:'post',
        data
    })
}

export function getBetweenHistoryPage(data) {
    return fetch({
        url:"device/history/pagebetween",
        method:'post',
        data
    })
}

export function getBetweenAllHistory(data) {
    return fetch({
        url: 'device/history/betweenAll',
        method: 'post',
        data
    })
}

export function getOfflineInfoPage(data) {
    return fetch({
            url: '/device/offlineLog/deviceIdPage',
            method: 'post',
            params: data
        }
    )
}

export function getDeviceDayReport(data) {
    return fetch({
        url: '/device/history/dayreport',
        method: 'post',
        data
    })
}

// export function getDeviceDayExcel(data) {
//     return  new Promise((resolve, reject) => {
//         console.log(data);
//         // Get file name from url.
//         var url = baseUrl+"/device/history/excel/dayexcel";
//         var xhr = new XMLHttpRequest();
//         xhr.responseType = 'blob';
//         xhr.onload = function() {
//             resolve(xhr);
//         };
//         xhr.onerror = reject;
//
//
//         xhr.open('post', url);
//
//         xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
//         console.log(data);
//         xhr.send(JSON.stringify(data));
//     }).then(function(xhr) {
//         console.log("第一部");
//         var a = document.createElement('a');
//         a.href = window.URL.createObjectURL(xhr.response); // xhr.response is a blob
//         console.log("第二部");
//         a.download = "qwqwqw"; // Set the file name.
//         a.style.display = 'none';
//         console.log("第三部");
//         document.body.appendChild(a);
//         a.click();
//         return xhr;
//     });
// }

export function getDeviceDayExcel(data) {
    return fetch({
        url: '/device/history/excel/dayexcel',
        method: 'post',
        responseType: 'blob',
        data
    })
}

export function getDeviceMonthReport(data) {
    return fetch({
        url: '/device/history/monthreport',
        method: 'post',
        data
    })
}

export function getDeviceMonthExcel(data) {
    return fetch({
        url: '/device/history/excel/monthexcel',
        method: 'post',
        responseType: 'blob',
        data
    })
}