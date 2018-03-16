<template>
    <div>
        <Card style="text-align: center">
            <div class="margin-top-20">
                <span style="margin-right: 30px">区域的名字:</span>
                <Input style="max-width: 300px" v-model="areaInfo.areaName" placeholder="区域的名字"></Input>
            </div>
            <div class="margin-top-20">
                <Button type="primary" @click="updateArea">更新区域</Button>
                <Button @click="cancel">取消</Button>
            </div>
        </Card>
    </div>
</template>

<script>
    export default{
        name: "AreaEdit",
        data: function () {
            return {
                areaId: 0,
                areaInfo: {},
            }
        },
        methods: {
            getArea(){
                if (this.areaId == 0) {
                    this.$Message.error("出错");
                    return;
                }
                let data = {
                    id: this.areaId
                };
                this.$store.dispatch('GetArea', data).then((result) => {
                    if (result.code == 1) {
                        this.areaInfo = result.data;
                    } else {
                        this.$Message.error("获取信息失败");
                    }
                }).catch((err) => {
                    this.$Message.error("获取信息出现错误");
                });
            },
            updateArea(){
                if (this.areaInfo == null || this.areaInfo == {}) {
                    return;
                }
                this.$store.dispatch('UpdateArea', this.areaInfo).then((result) => {
                    if (result.code == 1) {
                        this.$store.commit('closeOneTag', this);
                        this.$router.push({path: '/device-area/device-area'});
                    } else {
                        this.$Message.error("删除失败");
                    }
                }).catch((err) => {
                    console.log("删除区域出现错误");
                    this.$Message.error(err);
                });
                this.UpdateAreaName = "";
            },
            cancel(){
                this.$store.commit('closeOneTag', this);
                this.$router.push({path: '/device-area/device-area'});
            }
        },
        created () {
            if (this.$route.query && this.$route.query != null && this.$route.query.id && this.$route.query.id != null) {
                this.areaId = this.$route.query.id;
            }
            this.getArea();
        }
    }
</script>