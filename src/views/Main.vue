<style lang="less">
    @import "./main.less";
    /* 可以设置不同的进入和离开动画 */
    /* 设置持续时间和动画函数 */
    .slide-fade-enter-active {
        transition: all .3s ease;
    }

    .slide-fade-leave-active {
        transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }

    .slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active for below version 2.1.8 */
    {
        transform: translateX(10px);
        opacity: 0;
    }

    @media screen and (max-width: 500px) {
        .auto-hide {
            display: none;
        }
    }
</style>
<template>
    <div class="main" :class="{'main-hide-text': shrink}">

        <div class="sidebar-menu-con" :style="{width: shrink?'60px':'200px', overflow: shrink ? 'visible' : 'auto'}">
            <shrinkable-menu
                    :shrink="shrink"
                    @on-change="handleSubmenuChange"
                    :theme="menuTheme"
                    :before-push="beforePush"
                    :open-names="openedSubmenuArr"
                    :menu-list="menuList">
                <div slot="top" class="logo-con">
                    <!--<img v-show="!shrink" src="../images/logo.jpg" key="max-logo"/>-->
                    <!--<img v-show="shrink" src="../images/logo-min.jpg" key="min-logo"/>-->
                    <span v-show="!shrink" style="font-size: xx-large;color:#CC9900;font-weight:bold">赛通科技</span>
                    <span v-show="shrink" style="font-size: x-large;color:white;">SCI</span>
                </div>
            </shrinkable-menu>
        </div>
        <div class="main-header-con" :style="{paddingLeft: shrink?'60px':'200px'}">
            <div class="main-header">
                <div class="navicon-con">
                    <Button :style="{transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)'}" type="text"
                            @click="toggleClick">
                        <Icon type="navicon" size="32"></Icon>
                    </Button>
                </div>
                <div class="header-middle-con auto-hide">
                    <div class="main-breadcrumb">
                        <breadcrumb-nav :currentPath="currentPath"></breadcrumb-nav>
                    </div>
                </div>
                <div class="header-avator-con auto-hide">
                    <div class="auto-hide">
                        <full-screen v-model="isFullScreen" @on-change="fullscreenChange"></full-screen>
                        <lock-screen></lock-screen>
                        <message-tip v-model="mesCount"></message-tip>
                        <theme-switch></theme-switch>
                    </div>
                    <div class="user-dropdown-menu-con">
                        <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
                            <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
                                <a href="javascript:void(0)">
                                    <span class="main-user-name">{{ userName }}</span>
                                    <Icon type="arrow-down-b"></Icon>
                                </a>
                                <DropdownMenu slot="list">
                                    <DropdownItem name="ownSpace">个人中心</DropdownItem>
                                    <DropdownItem name="loginout" divided>退出登录</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                            <Avatar :src="avatorPath" style="background: #619fe7;margin-left: 10px;"></Avatar>
                        </Row>
                    </div>
                </div>
            </div>
            <div class="tags-con">
                <tags-page-opened :pageTagsList="pageTagsList"></tags-page-opened>
            </div>
        </div>
        <div class="single-page-con" :style="{left: shrink?'60px':'200px'}">
            <div class="single-page" style="min-width: 200px">
                <!--<keep-alive :include="cachePage">-->
                <!--<router-view></router-view>-->
                <!--</keep-alive>-->

                <keep-alive>
                    <!--<transition name="slide-fade">-->
                    <router-view v-if="$route.meta.keepAlive"></router-view>
                    <!--</transition>-->
                </keep-alive>
                <!--<transition name="slide-fade">-->
                <router-view v-if="!$route.meta.keepAlive"></router-view>
                <!--</transition>-->
            </div>

        </div>
    </div>
</template>
<script>
    import shrinkableMenu from './main-components/shrinkable-menu/shrinkable-menu.vue';
    import tagsPageOpened from './main-components/tags-page-opened.vue';
    import breadcrumbNav from './main-components/breadcrumb-nav.vue';
    import fullScreen from './main-components/fullscreen.vue';
    import lockScreen from './main-components/lockscreen/lockscreen.vue';
    import messageTip from './main-components/message-tip.vue';
    import themeSwitch from './main-components/theme-switch/theme-switch.vue';
    import Cookies from 'js-cookie';
    import util from '@/libs/util.js';

    export default {
        components: {
            shrinkableMenu,
            tagsPageOpened,
            breadcrumbNav,
            fullScreen,
            lockScreen,
            messageTip,
            themeSwitch
        },
        data () {
            return {
                shrink: false,
                isFullScreen: false,
                openedSubmenuArr: this.$store.state.app.openedSubmenuArr
            };
        },
        computed: {
            menuList () {
                return this.$store.state.app.menuList;
            },
            pageTagsList () {
                return this.$store.state.app.pageOpenedList;  // 打开的页面的页面对象
            },
            currentPath () {
                return this.$store.state.app.currentPath;  // 当前面包屑数组
            },
            avatorPath () {
                return localStorage.avatorImgPath;
            },
            cachePage () {
                return this.$store.state.app.cachePage;
            },
            lang () {
                return this.$store.state.app.lang;
            },
            menuTheme () {
                return this.$store.state.app.menuTheme;
            },
            mesCount () {
                return this.$store.state.device.deviceOnlineLogNotRead.length;
            },
            userName(){
                return this.$store.state.user.name;
            }
        },
        methods: {
            toggleClick () {
                this.shrink = !this.shrink;
            },
            handleClickUserDropdown (name) {
                if (name === 'ownSpace') {
                    util.openNewPage(this, 'ownspace_index');
                    this.$router.push({
                        name: 'ownspace_index'
                    });
                } else if (name === 'loginout') {
                    // 退出登录
                    this.$store.dispatch('LogOut').then((result) => {
                        if (result.code == 1) {
                            this.$store.commit('clearOpenedSubmenu');
                            this.$store.commit('clearAllTags');
                            this.$router.push({
                                name: 'login'
                            });
                        }
                    }).catch((err) => {
//                        console.log("请重新登录");
//                        this.$Message.error("请重新登录");
                        this.$router.push({
                            name: 'login'
                        });
                    });

                }
            },
            checkTag (name) {
                let openpageHasTag = this.pageTagsList.some(item => {
                    if (item.name === name) {
                        return true;
                    }
                });
                if (!openpageHasTag) {  //  解决关闭当前标签后再点击回退按钮会退到当前页时没有标签的问题
                    util.openNewPage(this, name, this.$route.params || {}, this.$route.query || {});
                }
            },
            handleSubmenuChange (val) {
                // console.log(val)
            },
            beforePush (name) {
                // if (name === 'accesstest_index') {
                //     return false;
                // } else {
                //     return true;
                // }
                return true;
            },
            fullscreenChange (isFullScreen) {
                // console.log(isFullScreen);
            },
            getMessageInfo(){
                this.$store.dispatch('GetDeviceOnlineLog').then((result) => {
                }).catch((err) => {
                    console.log("获取消息失败出现错误");
                    this.$Message.error(err);
                });
            },
            getRole(){
                this.$store.dispatch('GetCurrentUserRole',).then((result) => {
                    if (result.code == 1) {
                        console.log("刷新菜单");
                        this.$store.commit('updateMenulist');
                    }
                }).catch((err) => {
                    console.log("删除区域出现错误");
                    this.$Message.error(err);
                });
            },
            getUserInfo(){
                this.$store.dispatch("GetInfo").then((result) => {
                }).catch((error => {
                    console.log("获取用户信息失败");
                    this.$Message.error(error);
                }));
            }
        },
        watch: {
            '$route' (to) {
                this.$store.commit('setCurrentPageName', to.name);
                let pathArr = util.setCurrentPath(this, to.name);
                //打开菜单的路径
                if (pathArr.length > 2) {
                    this.$store.commit('addOpenSubmenu', pathArr[1].name);
                }
                this.checkTag(to.name);
                localStorage.currentPageName = to.name;
            },
            lang () {
                util.setCurrentPath(this, this.$route.name);  // 在切换语言时用于刷新面包屑
            }
        },
        mounted () {
            this.getMessageInfo();
        },
        created () {
            // 显示打开的页面的列表
            this.$store.commit('setOpenedList');
            this.getRole();
            this.getUserInfo();
        }
    };
</script>


