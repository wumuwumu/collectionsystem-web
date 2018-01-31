export default {
    pagination(pageNo, pageSize, array) {
        let offset = (pageNo - 1) * pageSize
        return (offset + pageSize >= array.length) ? array.slice(offset, array.length) : array.slice(offset, offset + pageSize)
    }
}
