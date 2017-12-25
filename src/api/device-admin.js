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