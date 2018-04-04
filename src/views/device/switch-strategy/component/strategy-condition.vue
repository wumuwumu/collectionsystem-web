<template>
    <span>{{condition}}</span>
</template>

<script>
    export default{
        props: {
            strategyInfo: {}
        },
        data: function () {
            return {}
        },
        computed: {
            condition(){
                let action = this.strategyInfo.action == 1 ? '开启' : '关闭';
                switch (this.strategyInfo.type) {

                    case 3:
                        return '采集设备(' + this.strategyInfo.collectionName + ')在值大于' + this.strategyInfo.threshold + '时' + action;
                        break;
                    case 4:
                        return '采集设备(' + this.strategyInfo.collectionName + ')在值小于' + this.strategyInfo.threshold + '时' + action;
                        break;
                }
            }
        }
    }
</script>