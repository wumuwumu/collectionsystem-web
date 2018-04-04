export default {
    formatDate: function (time) {
        let date = new Date(time);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();
        return year + '/' + month + '/' + day + '  ' + hour + ':' + minute + ':' + second;
    },
    transSec2Time: function (s) {
        if (s > 86400 || s < 0) {
            return
        }
        let t
        let hour = Math.floor(s / 3600)
        let min = Math.floor(s / 60) % 60
        let sec = Math.floor(s % 60)
        if (hour < 10) {
            t = '0' + hour + ':'
        } else {
            t = hour + ':'
        }

        if (min < 10) {t += '0'}
        t += min + ':'
        if (sec < 10) {t += '0'}
        t += sec
        return t
    },
    transTime2Sec: function (time) {
        let s = ''
        if (time.split(':').length == 2) {
            let hour = time.split(':')[0]
            let min = time.split(':')[1]
            let sec = 0
            s = Number(hour * 3600) + Number(min * 60) + Number(sec)
        } else {
            let hour = time.split(':')[0]
            let min = time.split(':')[1]
            let sec = time.split(':')[2]
            s = Number(hour * 3600) + Number(min * 60) + Number(sec)
        }
        return s
    },
    transDate2Sec: function (time) {
        let date = new Date(time)
        let hour = date.getHours()
        let minute = date.getMinutes()
        let second = date.getSeconds()
        let s = Number(hour * 3600) + Number(minute * 60) + Number(second)
        return s
    },
    transSec2Date(s){
        if (s > 86400 || s < 0) {
            return
        }
        let hour = Math.floor(s / 3600)
        let min = Math.floor(s / 60) % 60
        let sec = Math.floor(s % 60)
        let date = new Date()
        date.setHours(hour)
        date.setMinutes(min)
        date.setSeconds(sec)
        return date
    }
}