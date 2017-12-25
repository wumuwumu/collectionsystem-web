<style scoped>
    .expand-row {
        /*margin-bottom: 10px;*/
    }

    .info-card {
        padding: 5px;
        margin-top: 10px;
    }

    .expand-key {
        color: #454c5b;
        font-weight: bold
    }
</style>

<template>
    <div>
        <Row class="expand-row">
            <Col :xs="24" :sm="8" :md="6" :lg="4" class="info-card">
            <span class="expand-key">手机号: </span>
            <span class="expand-value">{{ row.mobile }}</span>
            </Col>
            <Col :xs="24" :sm="8" :md="6" :lg="4" class="info-card">
            <span class="expand-key">邮箱: </span>
            <span class="expand-value">{{ row.email }}</span>
            </Col >
            <Col :xs="24" :sm="8" :md="6" :lg="4" class="info-card">
            <span class="expand-key">qq: </span>
            <span class="expand-value">{{ row.qq }}</span>
            </Col>
            <Col :xs="24" :sm="8" :md="6" :lg="4" class="info-card">
            <span class="expand-key">微信: </span>
            <span class="expand-value">{{ row.weiXin }}</span>
            </Col>
            <Col :xs="24" :sm="8" :md="6" :lg="4" class="info-card">
            <span class="expand-key">公司名: </span>
            <span class="expand-value">{{ row.company }}</span>
            </Col>
            <Col :xs="24" :sm="8" :md="6" :lg="4" class="info-card">
            <span class="expand-key">创建时间: </span>
            <span class="expand-value">{{ createTime }}</span>
            </Col>
            <Col :xs="24" :sm="8" :md="6" :lg="4" class="info-card">
            <span class="expand-key">修改时间: </span>
            <span class="expand-value">{{ modifiedTime }}</span>
            </Col>
            <Col :xs="24" :sm="8" :md="6" :lg="4" class="info-card">
            <span class="expand-key">创建用户Id: </span>
            <span class="expand-value">{{ row.createBy }}</span>
            </Col>
            <Col :xs="24" :sm="8" :md="6" :lg="4" class="info-card">
            <span class="expand-key">修改用户Id: </span>
            <span class="expand-value">{{ row.modifiedBy }}</span>
            </Col>
        </Row>
    </div>
</template>

<script>
    import DateUtil from "../../../../utils/DateUtil"
    export default {
        name: 'UserExpand',
        props: {
            row: Object
        },
        computed: {
            createTime: function () {
                return DateUtil.formatDate(this.row.createTime);
            },
            modifiedTime: function () {
                return DateUtil.formatDate(this.row.modifiedTime);
            }
        },
        methods: {}
    }
</script>