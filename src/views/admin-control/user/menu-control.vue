<template>

    <div>
        <IconDialog @select="selectIcon" v-model="IconShow">
        </IconDialog>
        <Card>
            <Row style="margin-bottom: 18px">
                <Button type="info" icon="plus-round" @click="add">添加</Button>
                <Button type="error" icon="trash-a" @click="deleteMenu">删除</Button>

            </Row>

            <Spin size="large" fix v-if="spinShow"></Spin>
            <Row>
                <Col :xs="24" :sm="6" :md="6" :lg="6">
                <Card>
                    <Tree :data="MenuData" show-checkbox
                          @on-select-change="clickTree"
                          :clearable="TreeClear"
                          ref="Tree"
                    ></Tree>
                </Card>

                </Col>
                <Col :xs="24" :sm="18" :md="18" :lg="18">
                <Card class="margin-left-20" style="padding:15px;margin-left: 30px">
                    <Form ref="menuRef" :model="FormItem" :label-width="80">
                        <FormItem label="父级">
                            <Select v-model="FormItem.parentId" style="width: 150px">
                                <!--<Option value="beijing">New York</Option>-->
                                <!--<Option value="shanghai">London</Option>-->
                                <Option value=0 >顶级父级</Option>
                                <Option v-for="item in MenuData" :value="item.id" :key="item.id">{{item.title}}</Option>
                            </Select>

                        </FormItem>
                        <FormItem label="名称">
                            <Input v-model="FormItem.name" placeholder="菜单名称"></Input>
                        </FormItem>
                        <FormItem label="权限标识">
                            <Input v-model="FormItem.perms" placeholder="请按权限规则输入eg:device:list"></Input>
                        </FormItem>
                        <FormItem label="url地址">
                            <Input v-model="FormItem.url" placeholder="url"></Input>
                        </FormItem>
                        <FormItem label="图标">
                            <Icon :type="FormItem.icon" v-model="FormItem.icon"></ICon>
                            <Button type="text" @click="IconShow=true">选择</Button>
                        </FormItem>
                        <FormItem label="排序">
                            <Slider v-model="FormItem.orderNum" :max=10 :min=1></Slider>
                        </FormItem>
                        <FormItem>
                            <Button v-show="AddOrUpdate" type="primary" @click="updateMenu">保存</Button>
                            <Button v-show="AddOrUpdate" type="error" @click="otherDeleteMenu">删除</Button>
                            <Button v-show="!AddOrUpdate" type="primary" @click="addMenu">添加</Button>
                        </FormItem>
                    </Form>
                </Card>
                </Col >
            </Row>
        </Card>
    </div>
</template>

<script>
    import IconDialog from './components/icon-dialog.vue'
    export default{
        name: 'MenuControl',
        components: {
            IconDialog,
        },
        data: function () {
            const validateNull = (rule, value, callback) => {
                if (value.length < 1) {
                    callback(new Error('不能为空'));
                } else {
                    callback();
                }
            };
            const validatePerms = (rule, value, callback) => {
                if (value.length < 6) {
                    callback();
                } else {
                    callback();
                }
            };
            return {
                MenuData: [],
                AllMenuList: [],
                FormItem: {},
                IconShow: false,
                TreeSelectOption: {},
                TreeSelectValue: {},
                TreeClear: false,
                AddOrUpdate: false,
                spinShow: false,

            }
        },
        methods: {
            selectIcon: function (val) {
                console.log(val);
                this.FormItem.icon = val;
            },
            getMenuTreeData(){
                this.$store.dispatch('GetMenuTree').then((result) => {
                    this.MenuData = result.data;
                }).catch((err) => {
                    this.$Message.error("获取菜单树出现错误");
                });
            },
            getAllMenuList(){
                this.$store.dispatch('GetAllMenuList').then((result) => {
                    this.AllMenuList = result.data;
                }).catch((err) => {
                    this.$Message.error("获取菜单出现错误");
                });
            },
            clickTree(selectValue){
                this.AddOrUpdate = true;
//                this.TreeClear = true;
                this.FormItem = {
                    name: selectValue[0].title,
                    perms: selectValue[0].perms,
                    url: selectValue[0].url,
                    icon: selectValue[0].icon,
                    orderNum: selectValue[0].orderNum,
                    id: selectValue[0].id,
                    parentId: selectValue[0].parentId,
                    type: selectValue[0].type,
                };
            },
            updatePage(){
                this.FormItem = {};
                this.spinShow = false;
                this.getMenuTreeData();
                this.getAllMenuList();
            },
            add(){
                this.FormItem = {};
            },
            deleteMenu(){
                let select = this.$refs.Tree.getCheckedNodes();
                console.log(select);
                if (select.length < 1) {
                    this.$Message.warning("请选择");
                    return
                }
                let data = [];
                for (let value of select) {
                    data.push(value.id);
                }
                this.spinShow = true;
                this.$store.dispatch('BatchDeleteMenu', data).then((result) => {
                    if (result.code == 1) {
                        this.updatePage();
                        this.$Message.info("删除成功");
                    } else {
                        this.$Message.error("删除失败");
                    }
                }).catch((err) => {
                    this.$Message.error("删除菜单出现错误");
                });
            },
            otherDeleteMenu(){
                let data = [this.FormItem.id];
                this.spinShow = true;
                this.$store.dispatch('BatchDeleteMenu', data).then((result) => {
                    if (result.code == 1) {
                        this.updatePage();
                        this.$Message.info("删除成功");
                    } else {
                        this.$Message.error("删除失败");
                    }
                }).catch((err) => {
                    this.$Message.error("删除菜单出现错误");
                });
            },
            addMenu(){
                if (!this.validateMenu()) {
                    this.$Message.warning('请检查输入的参数');
                    return;
                }
                let typeValue = 0;
                for (let menu of this.AllMenuList) {
                    if (menu.id = this.FormItem.parentId) {
                        typeValue = menu.parentId + 1;
                    }
                }
                let data = {
                    name: this.FormItem.name,
                    perms: this.FormItem.perms,
                    url: this.FormItem.url,
                    icon: this.FormItem.icon,
                    orderNum: this.FormItem.orderNum,
                    parentId: this.FormItem.parentId,
                    type: typeValue
                };
                this.spinShow = true;
                this.$store.dispatch('AddMenu', data).then((result) => {
                    if (result.code == 1) {
                        this.updatePage();
                        this.$Message.info("添加成功");
                    } else {
                        this.$Message.error("添加失败");
                    }
                }).catch((err) => {
                    this.$Message.error("添加菜单出现错误");
                });
            },
            updateMenu(){
                if (!this.validateMenu()) {
                    this.$Message.warning('请检查输入的参数');
                    return;
                }
                let data = {
                    name: this.FormItem.name,
                    perms: this.FormItem.perms,
                    url: this.FormItem.url,
                    icon: this.FormItem.icon,
                    orderNum: this.FormItem.orderNum,
                    parentId: this.FormItem.parentId,
                    type: this.FormItem.type,
                    id: this.FormItem.id
                };

                this.spinShow = true;
                this.$store.dispatch('UpdateMenu', data).then((result) => {
                    if (result.code == 1) {
                        this.updatePage();
                        this.$Message.info("更新成功");
                    } else {
                        this.$Message.error("更新失败");
                    }
                }).catch((err) => {
                    this.$Message.error("更新菜单出现错误");
                });
            },
            validateMenu(){
                if (this.FormItem.name.length == undefined || this.FormItem.name.length < 1) {
                    return false;
                }
                if (this.FormItem.parentId == undefined || this.FormItem.parentId == null) {
                    return false;
                }
                if (this.FormItem.perms.length == undefined || this.FormItem.perms.length < 1) {
                    return false;
                }
                if (this.FormItem.icon == undefined || this.FormItem.icon == null) {
                    return false;
                }
                return true;
            }
        },

        created: function () {
            this.updatePage();
        },
        watch: {}
    }
</script>