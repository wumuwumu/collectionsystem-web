


<template>
    <Card>
        <h1 style="margin-top: 30px;margin-bottom: 30px">广州赛通科技物联网采集系统</h1>
        <Row>
            <div>设备监控：用于设备的实时监控</div>
        </Row>
        <Row>
            <div>设备历史记录：用于设备的采集数据</div>
        </Row>
        <Row>
            <div>设备管理：对设备进行操作</div>
        </Row>
    </Card>
</template>
<script>
    export default {
        name:'home',
        data(){
            return{

            }
        },
        method:{
            getMessage(){
                this.$store.dispatch('GetDeviceOnlineLog').then((result) => {
                    console.log(result);
                }).catch((err) => {
                    console.log("获取区域出现错误");
                    this.$Message.error(err);
                });
            }
        },
        mounted:{

        }
    }
</script>