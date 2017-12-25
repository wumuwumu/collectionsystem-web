/**
 * Created by wumu on 12/22/17.
 */
import fetch from '../utils/fetch';

export function getUserList(data) {
    return fetch({
        url: 'user/page',
        method: "post",
        data
    })
}

export function getMenuTree() {
    return fetch({
        url: '/menu/iveiwTree',
        method: 'post'
    })
}

export function getAllMenuList() {
    return fetch({
        url: '/menu/list',
        method: 'post'
    })
}

export function batchDeleteMenu(data) {
    return fetch({
        url: '/menu/batchDelete',
        method: 'post',
        data
    })
}

export function addMenu(data) {
    return fetch({
        url: '/menu/add',
        method: 'post',
        data
    })
}

export function updateMenu(data) {
    return fetch({
        url: '/menu/update',
        method: 'put',
        data
    })
}