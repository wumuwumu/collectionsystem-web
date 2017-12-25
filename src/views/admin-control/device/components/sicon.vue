<style>
    @import "./style/iconfont.css";
</style>

<template>
    <i :class="classes" :style="styles"></i>
</template>

<script>
    //    const suffixCls = 'ivu-icon';
    export default{
        name: 'Sicon',
        props: {
            type: String,
            size: [Number, String],
            color: String,
        },
        computed: {
            classes () {
                return `icon iconfont icon-${this.type}`;
            },
            styles () {
                let style = {};

                if (this.size) {
                    style['font-size'] = `${this.size}px`;
                }

                if (this.color) {
                    style.color = this.color;
                }

                return style;
            }
        },
        methods: {}
    }
</script>