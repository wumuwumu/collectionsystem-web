<style lang="less">
    @import './message.less';
</style>

<template>
    <div class="message-main-con">
        <div class="message-mainlist-con">
            <div>
                <Button size="large" long type="text">
                    <transition name="mes-current-type-btn">
                        <Icon v-show="currentMessageType === 'unread'" type="checkmark"></Icon>
                    </transition>
                    <span class="mes-type-btn-text" @click="setCurrentMesType('unread')">未读消息</span>
                    <Badge class="message-count-badge-outer" class-name="message-count-badge"
                           :count="unreadCount"></Badge>
                </Button>
            </div>
            <div>
                <Button size="large" long type="text">
                    <transition name="mes-current-type-btn">
                        <Icon v-show="currentMessageType === 'hasread'" type="checkmark"></Icon>
                    </transition>
                    <span class="mes-type-btn-text" @click="setCurrentMesType('hasread')">已读消息</span>
                    <Badge class="message-count-badge-outer" class-name="message-count-badge"
                           :count="hasreadCount"></Badge>
                </Button>
            </div>
            <div>
                <Button @click="deleteUserAll" size="large" long type="text">
                    <span class="mes-type-btn-text">删除用户所有消息</span>
                </Button>
            </div>
        </div>
        <div class="message-content-con">
            <transition name="view-message">
                <div v-if="showMesTitleList" class="message-title-list-con">
                    <Table ref="messageList" :columns="mesTitleColumns" :data="currentMesList" :show-header="false"
                           :no-data-text="noDataText"></Table>
                    <Page :total="PageTotal" show-sizer show-total @on-change="pageChange"
                          @on-page-size-change="sizeChange"
                          style="margin-top:20px;text-align:center;align:right"></Page>
                </div>
            </transition>
            <transition name="back-message-list">
                <div v-if="!showMesTitleList" class="message-view-content-con">
                    <div class="message-content-top-bar">
                        <span class="mes-back-btn-con"><Button type="text" @click="backMesTitleList"><Icon
                                type="chevron-left"></Icon>&nbsp;&nbsp;返回</Button></span>
                        <h3 class="mes-title">{{ mes.title }}</h3>
                    </div>
                    <p class="mes-time-con">
                        <Icon type="android-time"></Icon>&nbsp;&nbsp;{{ mes.time }}
                    </p>
                    <div class="message-content-body">
                        <p class="message-content">{{ mes.content }}</p>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
    import CommonUtil from '../../utils/CommonUtil';
    export default {
        name: 'message_index',
        data () {
            const markAsreadBtn = (h, params) => {
                return h('Button', {
                    props: {
                        size: 'small'
                    },
                    on: {
                        click: () => {
                            var data = {
                                id:params.row.id
                            }
                            this.$store.dispatch('ReadMessage',data).then((result) => {
                                if (result.code) {
                                    this.$Message.info('操作成功');
                                    this.currentPage=0
                                    this.getMessageInfo();
                                } else {
                                    this.$Message.error('操作失败');
                                }
                            }).catch((err) => {
                                this.$Message.error('读消息失败');
                            });
                        }
                    }
                }, '标为已读');
            };
            const deleteMesBtn = (h, params) => {
                return h('Button', {
                    props: {
                        size: 'small',
                        type: 'error'
                    },
                    on: {
                        click: () => {
                            var data = {
                                id:params.row.id
                            }
                            this.$store.dispatch('DeleteMessage',data).then((result) => {
                                if (result.code) {
                                    this.$Message.info('操作成功');
                                    this.currentPage=1;
                                    this.getMessageInfo();
                                } else {
                                    this.$Message.error('操作失败');
                                }
                            }).catch((err) => {
                                this.$Message.error('删除消息失败');
                            });
                        }
                    }
                }, '删除');
            };
            return {
                currentMesList: [],
                unreadMesList: [],
                hasreadMesList: [],
                currentMessageType: 'unread',
                showMesTitleList: true,
                unreadCount: 0,
                hasreadCount: 0,
                currentPage:0,  //0为未读页面，1为已读
                noDataText: '暂无未读消息',
                mes: {
                    title: '',
                    time: '',
                    content: ''
                },
                mesTitleColumns: [
                    // {
                    //     type: 'selection',
                    //     width: 50,
                    //     align: 'center'
                    // },
                    {
                        title: ' ',
                        key: 'message',
                        align: 'left',
                        ellipsis: true,
                        render: (h, params) => {
                            return h('a', {
                                on: {
                                    click: () => {
                                        this.showMesTitleList = false;
                                        this.mes.title = params.row.message;
                                        this.mes.time = this.formatDate(params.row.time);
                                    }
                                }
                            }, params.row.message);
                        }
                    },
                    {
                        title: ' ',
                        key: 'time',
                        align: 'center',
                        width: 180,
                        render: (h, params) => {
                            return h('span', [
                                h('Icon', {
                                    props: {
                                        type: 'android-time',
                                        size: 12
                                    },
                                    style: {
                                        margin: '0 5px'
                                    }
                                }),
                                h('span', {
                                    props: {
                                        type: 'android-time',
                                        size: 12
                                    }
                                }, this.formatDate(params.row.time))
                            ]);
                        }
                    },
                    {
                        title: ' ',
                        key: 'asread',
                        align: 'center',
                        width: 100,
                        render: (h, params) => {
                            if (this.currentMessageType === 'unread') {
                                return h('div', [
                                    markAsreadBtn(h, params)
                                ]);
                            } else if (this.currentMessageType === 'hasread') {
                                return h('div', [
                                    deleteMesBtn(h, params)
                                ]);
                            }
                        }
                    }
                ],
                PageTotal: 0,
                page: 1,
                row: 10,
                AllMesList: [],

            };
        },
        methods: {
            formatDate (time) {
                let date = new Date(time);
                let year = date.getFullYear();
                let month = date.getMonth() + 1;
                let day = date.getDate();
                let hour = date.getHours();
                let minute = date.getMinutes();
                let second = date.getSeconds();
                return year + '/' + month + '/' + day + '  ' + hour + ':' + minute + ':' + second;
            },
            backMesTitleList () {
                this.showMesTitleList = true;
            },
            setCurrentMesType (type) {
                if (this.currentMessageType !== type) {
                    this.showMesTitleList = true;
                }
                this.currentMessageType = type;
                this.page = 1;
                this.row = 10;
                this.PageTotal = 0;
                if (type === 'unread') {
                    this.noDataText = '暂无未读消息';
                    this.currentMesList = CommonUtil.pagination(this.page, this.row, this.unreadMesList);
                    this.PageTotal = this.unreadMesList.length;
                } else if (type === 'hasread') {
                    this.noDataText = '暂无已读消息';
                    this.currentMesList = CommonUtil.pagination(this.page, this.row, this.hasreadMesList);
                    this.PageTotal = this.hasreadMesList.length;
                } else {
                    this.noDataText = '暂无无消息';
                    this.currentMesList = this.recyclebinList;
                }
            },
            getMessageInfo(){
                this.$store.dispatch('GetDeviceOnlineLog').then((result) => {

                    this.unreadMesList = result.data.notRead;
                    this.hasreadMesList = result.data.read;
                    if(this.currentPage == 0){
                        this.AllMenuList = this.unreadMesList;
                    }else {
                        this.AllMenuList = this.hasreadMesList;
                    }

                    this.currentMesList = CommonUtil.pagination(this.page, this.row, this.AllMenuList);
                }).catch((err) => {
                    this.$Message.error("获取消息失败出现错误");
                });
            },
            pageChange(page){
                this.page = page;
                this.currentMesList = CommonUtil.pagination(this.page, this.row, this.AllMenuList);
            },
            sizeChange(row){
                this.row = row;
                this.currentMesList = CommonUtil.pagination(this.page, this.row, this.AllMenuList);
            },
            deleteUnread(){
                this.$Modal.confirm({
                    title: '删除',
                    content: '<p>删除全部未读消息</p>',
                    onOk: () => {
                        this.$Message.info('Clicked ok');
                    },
                    onCancel: () => {
                        this.$store.dispatch('DeleteUnreadMessage').then((result) => {
                            if (result.code) {
                                this.$Message.info('操作成功');
                                this.getMessageInfo();
                            } else {
                                this.$Message.error('操作失败');
                            }
                        }).catch((err) => {
                            this.$Message.error('失败');
                        });
                    }
                });
            },
            deleteRead(){
                this.$Modal.confirm({
                    title: 'Title',
                    content: '<p>删除全部已读消息</p>',
                    onOk: () => {
                        this.$store.dispatch('DeleteReadMessage').then((result) => {
                            if (result.code) {
                                this.$Message.info('操作成功');
                                this.getMessageInfo();
                            } else {
                                this.$Message.error('操作失败');
                            }
                        }).catch((err) => {
                            this.$Message.error('失败');
                        });
                    },
                    onCancel: () => {
                    }
                });
            },
            deleteUserAll(){
                this.$Modal.confirm({
//                    title: 'Title',
                    content: '<p>删除全部消息</p>',
                    onOk: () => {
                        this.$store.dispatch('DeleteUserMessage').then((result) => {
                            if (result.code) {
                                this.$Message.info('操作成功');
                                this.getMessageInfo();
                            } else {
                                this.$Message.error('操作失败');
                            }
                        }).catch((err) => {
                            this.$Message.error('失败');
                        });
                    },
                    onCancel: () => {
                    }
                });
            }
        },
        mounted () {
            this.getMessageInfo();
            this.unreadMesList = this.$store.state.device.deviceOnlineLogNotRead;
            this.hasreadMesList = this.$store.state.device.deviceOnlineLogRead;
            this.PageTotal = this.unreadMesList.length;
            this.AllMenuList = this.unreadMesList;
            this.currentMesList = CommonUtil.pagination(this.page, this.row, this.unreadMesList);
            this.unreadCount = this.unreadMesList.length;
            this.hasreadCount = this.hasreadMesList.length;
        },
        watch: {
            unreadMesList: function () {
                this.unreadMesList = this.$store.state.device.deviceOnlineLogNotRead;
                this.unreadCount = this.unreadMesList.length;
            },
            hasreadMesList: function () {
                this.hasreadMesList = this.$store.state.device.deviceOnlineLogRead;
                this.hasreadCount = this.hasreadMesList.length;
            },
            unreadCount :function () {
                this.unreadCount = this.unreadMesList.length;
            },
            hasreadCount : function () {
                this.hasreadCount = this.hasreadMesList.length;
            }
        }
    };
</script>

