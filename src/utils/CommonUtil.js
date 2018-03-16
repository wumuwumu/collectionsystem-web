export default {
    pagination(pageNo, pageSize, array) {
        let offset = (pageNo - 1) * pageSize
        return (offset + pageSize >= array.length) ? array.slice(offset, array.length) : array.slice(offset, offset + pageSize)
    },
    validatePhone(phone){
        if (phone == undefined || phone == '') {
            return false
        }
        if (phone.length == 11) {
            return true
        }
        // let regex = new RegExp('\d{3}-\d{8}|\d{4}-\{7,8}');
        return false
    },
    validateEmail(email){
        if (email == undefined || email == '') {
            return false
        }
        let regex = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
        return regex.test(email)
    }
}
