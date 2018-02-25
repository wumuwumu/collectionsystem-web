<template>
    <div>
        <Row>
            <Col :xs="24" :sm="19" style="padding: 20px">
            <Card style="text-align: center">
                <div class="margin-top-20">
                    <span style="margin-right: 30px">区域的名字:</span>
                    <Input style="max-width: 300px" v-model="AreaItem" placeholder="区域的名字"></Input>
                </div>
                <div class="margin-top-20">
                    <Button type="primary" @click="AddArea">添加区域</Button>
                    <Button @click="cancel">取消</Button>
                </div>
            </Card>
            </Col>
            <Col :xs="24" :sm="5" style="padding: 20px">
            <Card>
                <p slot="title">
                    <Icon type="ios-film-outline"></Icon>
                    设备区域
                </p>
                <div>
                    请填写设备的区域
                </div>
            </Card>
            </Col>
        </Row>

    </div>
</template>

<script>
    export default{
        name: 'AreaAdd',
        data: function () {
            return {
                AreaItem: ""
            }
        },
        methods: {
            AddArea(){
                if (this.AreaItem != null && this.AreaItem != "") {
                    var data = {
                        "areaName": this.AreaItem
                    }
                    this.$store.dispatch('AddArea', data).then((result) => {
                        if (result.code == 1) {
                            this.$router.push({path: '/device-user/device-area'});
                        } else {
                            this.$Message.error("添加失败");
                        }
                    }).catch((err) => {
                        console.log("添加区域出现错误");
                        this.$Message.error(err);
                    });
                    this.AreaItem = "";
                }
            },
            cancel(){
                this.$router.push({path: '/device-user/device-area'});
            }
        }
    }
</script>