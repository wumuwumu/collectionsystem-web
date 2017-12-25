<template>
    <div>
        <Modal
                v-model="ChildModel"
                title="请选择颜色"
                @on-ok="ok"
                @on-cancel="cancel">
            <div style="padding: 10px">
                <Row>
                    <Col span="6">
                    <Sicon :type="iconType" :color="IconColor" style="font-size: 100pt; margin-left: 10px"></Sicon>
                    </Col>

                    <Col span="18">
                    <Sketch v-model="colors" style="float: right;"/>
                    </Col>
                </Row>
                <!--<photoshop-picker v-model="colors" />-->
            </div>
        </Modal>
    </div>
</template>

<script>
    import Sicon from  './sicon.vue'
    import  {Sketch}  from 'vue-color'

    var defaultProps = {
        hex: '#194d33',
        hsl: {
            h: 150,
            s: 0.5,
            l: 0.2,
            a: 1
        },
        hsv: {
            h: 150,
            s: 0.66,
            v: 0.30,
            a: 1
        },
        rgba: {
            r: 25,
            g: 77,
            b: 51,
            a: 1
        },
        a: 1
    }

    export default{
        name: 'DeviceColorDialog',
        props: {
            value: {
                type: Boolean
            },
            iconType: {
                type: String,
                default: 'dianyachuanganqi'
            }

        },
        components: {
            Sicon,
            Sketch,
        },
        data: function () {
            return {
                ChildModel: false,
                colors: defaultProps,

            }
        },
        computed: {
            IconColor(){
                return this.colors.hex;
            },
        },
        methods: {
            ok(){
                this.$emit(
                    "select", this.IconColor
                );
                this.$emit('input', false);

            },
            cancel(){
                this.$emit('input', false);
            },
        },
        watch: {
            value: function (va) {
                this.ChildModel = va;
            }
        }
    }
</script>