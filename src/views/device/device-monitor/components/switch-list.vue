<template>
    <div>
        <Row :gutter="16" style="margin-top: 10px">
            <SwitchNode :SwitchInfo="item" v-for="item in SwitchData" :key="item.id"
                        @refrshData="getData()"></SwitchNode>
        </Row>
    </div>
</template>

<script>

    import SwitchNode from "./switch-node.vue"

    export default{
        name: "switch-list",
        components: {
            SwitchNode
        },
        props: {
            areaId: 0
        },
        data: function () {
            return {
                SwitchData: []
            }
        },
        computed: {},
        watch: {
            areaId: function () {
                this.getData();
            }
        },
        methods: {
            getData(){
                this.$store.dispatch('GetAreaSwitch', this.areaId).then((result) => {
                    console.log(result)
                    this.SwitchData = result.data;
                    console.log(this.SwitchData);
                }).catch((err) => {
                    console.log("获取区域开关设备出现错误");
                    this.$Message.error(err);
                });
            },
        },
        created(){

        }
    }
</script>