<template>
    <Card>
        <Row>
            <Col style="margin: 10px">
            <Button type="primary" size="large" @click="backDeviceMonitor">
                <Icon type="chevron-left"></Icon>
                返回
            </Button>
            </Col>
            <Col>
            <DeviceHistoryNode :CurrentDevice="CurrentDeviceId"></DeviceHistoryNode>
            </Col>
        </Row>
    </Card>
</template>

<script>
    import DeviceHistoryNode from '../../device-history/device-history-node.vue'

    export default{
        name: 'current-history',
        data: function () {
            return {
                CurrentDeviceId: 0,
            }
        },
        components: {
            DeviceHistoryNode
        },
        methods: {
            loadData(){
                if (this.$route.query && this.$route.query != null && this.$route.query.id && this.$route.query.id != null) {
                    this.CurrentDeviceId = this.$route.query.id;
                }
            },
            backDeviceMonitor(){
                this.$store.commit('closeOneTag', this);
                this.$router.push({path: '/device-user/device_monitor'});
            }
        },
        created: function () {
            this.loadData();
        }
    }
</script>