<style>

</style>
<template>

    <Card>
        <Button type="primary" icon="chevron-left" @click="back">返回</Button>
        <Tabs value="name1">
            <TabPane label="定时" name="name1">

            </TabPane>
            <TabPane label="策略" name="name2">

            </TabPane>
        </Tabs>
    </Card>
</template>


<script>
    export default{
        data(){
            return {}
        },
        components: {},
        computed: {},
        methods: {
            back(){
                this.$router.back();
            }
        },
        created: function () {

        }
    }
</script>