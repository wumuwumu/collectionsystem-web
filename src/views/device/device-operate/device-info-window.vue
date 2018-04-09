<style>
    .info-window-key {
        font-weight: bold;
    }
</style>
<template>
    <div style="padding: 10px">
        <Row>
            <ul>
                <li><span class="info-window-key">设备名：</span><span>{{DeviceInfo.name}}</span></li>
                <li><span class="info-window-key">在线：</span><span>{{online}}</span></li>
                <li><span class="info-window-key">类型:</span><span>{{DeviceInfo.collectionType}}</span></li>
                <li><span
                        class="info-window-key">数据：</span><span>{{DeviceInfo.lastestData}}{{DeviceInfo.showUnit}}</span>
                </li>
                <li><span class="info-window-key">时间：</span><span>{{lastestTime}}</span></li>
            </ul>
        </Row>
        <Row style="margin-top: 10px">
            <Button type="primary" size="small" @click="openHistory">历史记录</Button>
        </Row>
    </div>
</template>

<script>
    import DateUtil from '../../../utils/DateUtil';
    export default{
        name: 'DeviceInfoWindow',
        props: {
            DeviceInfo: Object
        },
        computed: {
            online: function () {
                if (this.DeviceInfo.online == 1) {
                    return '在线';
                }
                return '离线';
            },
            lastestTime: function () {
                return DateUtil.formatDate(this.DeviceInfo.lastestTime);
            }

        },
        methods: {
            openHistory: function () {
                this.$emit('toHistory', this.DeviceInfo);
            }
        },
    }
</script>