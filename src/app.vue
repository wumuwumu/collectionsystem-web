<template>
    <div id="main" class="app-main">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                theme: this.$store.state.app.themeColor
            };
        },
        mounted () {
            console.log("这里是app初始化的地方");
            this.updateToken();
        },
        beforeDestroy () {

        },
        methods: {
            updateToken(){
                this.$store.dispatch("UpdateToken");
            }
        }
    };
</script>

<style>
.app-main{
    width: 100%;
    height: 100%;
}
</style>
