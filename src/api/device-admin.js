/**
 * Created by wumu on 12/25/17.
 */
import  fetch from '../utils/fetch'

export function getDeviceTypePage(data) {
    return fetch({
        url: '/device/deviceType/page',
        method: 'post',
        data
    });
}

export function addDeviceType(data) {
    return fetch({
        url: '/device/deviceType/add',
        method: 'post',
        data
    })
}

export function updateDeviceType(data) {
    return fetch({
        url: '/device/deviceType/update',
        method: 'put',
        data
    })
}

export function deleteDeviceType(id) {
    return fetch({
        url: 'device/deviceType/' + id,
        method: 'delete'
    })
}


export function getAllAreaTree() {
    return fetch({
        url: '/area/allTree',
        method: 'post'
    })
}

export function getUserConPage(data) {
    return fetch({
        url: '/device/admin/con/user/read' + '?userId=' + data.userId,
        method: 'post',
        data
    })
}

export function deleteUserCon(id) {
    return fetch({
        url: '/device/admin/con/' + id,
        method: 'delete'
    })
}

export function addUserCon(data) {
    return fetch({
        url: '/device/admin/con/add',
        method: 'post',
        data
    })
}

export function listUserAdminArea(id) {
    return fetch({
        url: '/area/admin/list?userId=' + id,
        method: 'get'
    })
}


export function addAdminArea(data) {
    return fetch({
        url: '/admin/area/add',
        method: 'post',
        data
    })
}

export function addAdminDeviceList(data) {
    return fetch({
        url: '/admin/deviceList/add',
        method: 'post',
        data
    })
}