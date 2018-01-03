/**
 * Created by wumu on 12/22/17.
 */
import fetch from '../utils/fetch';

export function getUserListPage(data) {
    return fetch({
        url: 'user/page',
        method: "post",
        data
    })
}
export function getUserList() {
    return fetch({
        url: 'user/list',
        method: "post",
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

export function addUser(data) {
    return fetch({
        url: '/user/add',
        method: 'post',
        data
    })
}

export function updateUser(data) {
    return fetch({
        url: '/user/update',
        method: 'put',
        data
    })
}

export function deleteUser(id) {
    return fetch({
        url: '/user/' + id,
        method: 'delete'
    })
}

export function getUserRoleAuthor(id) {
    return fetch({
        url: '/authorize/user/role/author',
        method: 'post',
        params: id
    })
}

export function updateUserRole(data) {
    return fetch({
        url: '/authorize/user/role/update',
        method: 'post',
        data
    })
}

export function getRoleList() {
    return fetch({
        url: '/role/list',
        method: 'post'
    })
}

export function addRole(data) {
    return fetch({
        url: '/role/add',
        method: 'post',
        data
    })
}

export function deleteRole(id) {
    return fetch({
        url: '/role/' + id,
        method: 'delete'
    })
}

export function updateRole(data) {
    return fetch({
        url: '/role/update',
        method: 'put',
        data
    })
}

export function updateRoleMenu(data) {
    return fetch({
        url: '/authorize/role/menu/update',
        method: 'post',
        data
    })
}

export function changeAdminPassword(data) {
    return fetch({
        url: '/user/changePasswd',
        method: 'post',
        data
    })
}