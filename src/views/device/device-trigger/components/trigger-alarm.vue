<template>
    <span>{{Alarm}}</span>
</template>

<script>
    export default{
        name: 'TriggerAlarm',
        props: {
            trigger: {}
        },
        data: function () {
            return {
//                Alarm:'11'
            }
        },
        computed: {
            Alarm: function () {
                console.log("在这里");
                console.log(this.trigger);
                switch (this.trigger.type) {
                    case 1:
                        return '开关ON';
                        break;
                    case 2:
                        return '开关OFF';
                        break;
                    case 3:
                        if (this.trigger.threshold != undefined) {
                            let data = this.trigger.threshold.split('#');
                            if (data.length == 1) {
                                return '数值大于' + data[0];
                            }
                        }
                        break;
                    case 4:
                        if (this.trigger.threshold != undefined) {
                            let data = this.trigger.threshold.split('#');
                            if (data.length == 1) {
                                return '数值小于' + data[0];
                            }
                        }
                        break;
                    case 5:
                        if (this.trigger.threshold != undefined) {
                            let data = this.trigger.threshold.split('#');
                            if (data.length == 2) {
                                return '数值小于' + data[0] + '大于' + data[1];
                            }
                        }
                        break;
                    case 6:
                        if (this.trigger.threshold != undefined) {
                            let data = this.trigger.threshold.split('#');
                            if (data.length == 2) {
                                return '数值大于' + data[0] + '小于' + data[1];
                            }
                        }
                        break;
                }
            }
        },
        methods: {},
        created: function () {

        }
    }
</script>