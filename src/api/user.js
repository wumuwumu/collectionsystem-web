/**
 * Created by wumu on 12/4/17.
 */
import fetch from '../utils/fetch';

export function getCurrentUserRole() {
    return fetch({
        url: '/authorize/currentuser/role/list',
        method: 'post'
    })
}


export function loginByUsername(username, password) {
    const data = {
        "username": username,
        "password":password,
        "loginType":1
    };
    return fetch({
        url: '/jwt/login',
        method: 'POST',
        data
    });
}

export function logout() {
    return fetch({
        url: '/jwt/logout',
        method: 'get'
    });
}

export function getInfo() {
    return fetch({
        url: '/baseUser/info',
        method: 'get'
    });
}

export function changPassword(data) {
    return fetch({
        url:"/baseUser/changePasswd",
        method:"post",
        data
    })
}

export function updateUserInfo(data) {
    return fetch({
        url:"/baseUser/update",
        method:'post',
        data
    })
}

export function updateToken () {
    return fetch({
        url: '/jwt/refresh',
        method: 'post'
    })
}

