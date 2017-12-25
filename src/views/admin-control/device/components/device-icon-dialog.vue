<template>
    <div>
        <Modal
                v-model="ChildModel"
                title="请选择图标"
                @on-ok="ok"
                @on-cancel="cancel">
            <div>
                <Scroll>
                    <ul>
                        <li style="float: left; width: 52px;" v-for="item in StyleData" @click="selectIcon(item)">
                            <Sicon style="font-size: xx-large;" :key="item" :type="item"
                            ></Sicon>
                        </li>
                    </ul>
                </Scroll>
            </div>
        </Modal>
    </div>
</template>
<script>
    import Sicon from './sicon.vue'
    export default{
        name: 'DeviceIconDialog',
        props: ["value"],
        components: {
            Sicon
        },
        data: function () {
            return {
                ChildModel: false,
                StyleData: [
                    'dianyachuanganqi',
                    'wenduchuanganqi',
                    'yeweichuanganqi',
                    'fa-Induction',
                    'sensor',
                    'sensor-shoushi',
                    'sensor-PM25',
                    'sensor-guangzhao',
                    'sensor-co2',
                    'sensor-yishui',
                    'chuanganqi',
                    'hongwaixian',
                    'menci',
                    'yanwubaojing',
                    'zhinengmensuo',
                    'keranqiti',
                    'huanjingjiance',
                    'dengdai',
                    'yiyanghuatanchuanganqi',
                    'wenshiduchuanganqi',
                    'wenshiduchuanganqi2',
                    'yanwuchuanganqi2',
                    'chuanganqi_shuijin-fuben',
                    'chuanganqi1',
                    'dianlichuanganqi',
                    'yanwuchuanganqi',
                    'huanjingchuanganqi',
                    'wenshiduchuanganqi1',
                    'chuanganqi2',
                    'chuanganqi3',
                    'chenjiangchuanganqi',
                    'liuliangchuanganqi',
                    'yinglichuanganqi',
                    'chenjiangchuanganqi1',
                    'SHP',
                    'YWC',
                    'SHT',
                    'chuanganqi4',
                    'maosuochuanganqi',
                    'yuliangchuanganqi',
                    'chuanganqi5',
                    'yishuichuanganqi',
                    'dianliuchuanganqi',
                    'wenshiduchuanganqi3',
                    'yalichuanganqi',
                    'yishuichuanganqi1',
                    'ditu_chuanganqi',
                    'hongwaichuanganqi',
                    'ranqichuanganqi',
                    'wenduchuanganqi1',
                    'shiduchuanganqi',
                    'yanganchuanganqi',
                    'weibochuanganqi',
                    'guangzhaochuanganqi',
                    'qitichuanganqi',
                    'chenjiangchuanganqi2',
                    'chuanganqi6',
                    'cgq',
                    'chuanganqi7',
                    'mencichuanganqi',
                    'fengyuchuanganqi',
                    'guangzhaochuanganqi1',
                    'chuanganqishujucaiji',
                    'chuanganqi_shuijin',
                    'yanwuchuanganqi1',
                    'COchuanganqi',
                    'shuiwenchuanganqijianhua',
                    'yeweichuanganqijianhua',
                    'shuiyachuanganqijianhua',
                    'mic-1-copy-copy-copy',
                ],
                Icon: '',

            }
        },
        methods: {
            ok(){
                this.$emit(
                    "select", this.Icon
                );
                this.$emit('input', false);

            },
            cancel(){
                this.$emit('input', false);
            },
            selectIcon(item){
                this.Icon = item;
                this.ChildModel = false;
                this.$emit('input', false);
                this.$emit(
                    "select", this.Icon
                );
            }
        },
        watch: {
            value: function (va) {
                this.ChildModel = va;
            }
        }
    }
</script>
