import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: resolve => {
        require(['@/views/login.vue'], resolve);
    }
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: resolve => {
        require(['@/views/error-page/404.vue'], resolve);
    }
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: resolve => {
        require(['@//views/error-page/403.vue'], resolve);
    }
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: resolve => {
        require(['@/views/error-page/500.vue'], resolve);
    }
};

export const preview = {
    path: '/preview',
    name: 'preview',
    component: resolve => {
        require(['@/views/form/article-publish/preview.vue'], resolve);
    }
};

export const locking = {
    path: '/locking',
    name: 'locking',
    component: resolve => {
        require(['@/views/main-components/lockscreen/components/locking-page.vue'], resolve);
    }
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/device-user/device_monitor',
    component: Main,
    children: [
        {
            path: 'home', title: {i18n: 'home'}, name: 'home_index', component: resolve => {
            require(['@/views/home/home.vue'], resolve);
        }
        },
        {
            path: 'ownspace', title: '个人中心', name: 'ownspace_index', component: resolve => {
            require(['@/views/own-space/own-space.vue'], resolve);
        }
        },
        // {
        //     path: 'order/:order_id', title: '订单详情', name: 'order_info', component: resolve => {
        //     require(['@/views/advanced-router/component/order-info.vue'], resolve);
        // }
        // },  // 用于展示动态路由
        // {
        //     path: 'shopping', title: '购物详情', name: 'shopping', component: resolve => {
        //     require(['@/views/advanced-router/component/shopping-info.vue'], resolve);
        // }
        // },  // 用于展示带参路由
        {
            path: 'message', title: '消息中心', name: 'message_index', component: resolve => {
            require(['@/views/message/message.vue'], resolve);
        }
        },
        {
            path: 'device-admin/device-type-control/add',
            title: '采集类型添加',
            name: 'collectionTypeAdd',
            component: resolve => {
                require(['@/views/admin-control/device/components/device-type-add.vue'], resolve);
            }
        },
        {
            path: 'user-admin/user-control/add',
            title: '用户添加',
            name: 'userAdd',
            component: resolve => {
                require(['@/views/admin-control/user/components/user-add.vue'], resolve);
            }
        }
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path: '/device-user',
        icon: 'lock-combination',
        title: '设备监控',
        name: 'deviceuser',
        component: Main,
        children: [
            {
                path: 'device_monitor',
                icon: 'arrow-swap',
                title: '设备监控',
                name: 'device_monitor',
                component: resolve => {
                require(['@/views/device/device-monitor/device-monitor.vue'], resolve);
            }
            },
            {
                path: 'device_operater',
                icon: 'pound',
                name: 'device-operater',
                title: '设备管理',
                component: resolve => {
                    require(['@/views/device/device-operater/device-operater.vue'], resolve);
                }
            },
        ]
    },
    {
        path: '/',
        title: '用户管理',
        icon: 'android-person',
        name: 'user-control',
        component: Main,
        children:[
            {
                path: 'message', title: '消息中心', name: 'message_index', icon: 'android-textsms', component: resolve => {
                require(['@/views/message/message.vue'], resolve);
            }
            },
            {
                path: 'ownspace', title: '个人中心', name: 'ownspace_index', icon: 'person', component: resolve => {
                require(['@/views/own-space/own-space.vue'], resolve);
            }
            },
        ]

    },
    {
        path:"/device-history",
        title:'设备历史',
        icon: 'archive',
        name:'device_history',
        component:Main,
        children:[
            {
                path: 'device_history',
                icon: 'ios-list',
                name: 'device-allhistory',
                title: '设备历史记录',
                component: resolve => {
                    require(['@/views/device/device-allhistory/device-allhistory.vue'], resolve);
                }
            },
            {
                path: 'historychart', title: "历史曲线", name: "historychart", icon: 'ios-pulse', component: reslove => {
                    require(['@/views/device/device-history/device-history-chart.vue'],reslove);
            }
            },
            {
                path: 'historyofflinelog',
                title: "离线记录",
                name: "hostoryofflinelog",
                icon: 'alert',
                component: reslove => {
                require(['@/views/device/device-history/device-offline-log.vue'], reslove);
            }
            }
        ]
    },
    {
        path:"/device-ervery-report",
        title:'设备报表',
        icon: 'ios-book',
        name:'device_everyreport',
        component:Main,
        children:[
            {
                path: 'dayreport', title: "日报表", name: "dayreport", icon: 'ios-paper', component: reslove => {
                    require(['@/views/device/device-everyreport/day-report.vue'],reslove);
            }
            },
            {
                path: 'weekreport', title: "周报表", name: "weekreport", icon: 'ios-paper', component: reslove => {
                require(['@/views/device/device-everyreport/week-report.vue'],reslove);
            }
            },
            {
                path: 'dayreport', title: "月报表", name: "monthreport", icon: 'ios-paper', component: reslove => {
                require(['@/views/device/device-everyreport/month-report.vue'],reslove);
            }
            },
            {
                path: 'dayreport', title: "季报表", name: "seasonreport", icon: 'ios-paper', component: reslove => {
                require(['@/views/device/device-everyreport/season-report.vue'],reslove);
            }
            },
            {
                path: 'dayreport', title: "年报表", name: "yearreport", icon: 'ios-paper', component: reslove => {
                require(['@/views/device/device-everyreport/year-report.vue'],reslove);
            }
            },
        ]
    },
    {
        path: "/user-admin",
        title: '系统管理',
        icon: 'wrench',
        name: 'user-admin',
        access: 'admin',
        component: Main,
        children: [
            {
                path: 'user-control', title: "用户管理", name: "usercontrol", icon: 'ios-paper', component: reslove => {
                require(['@/views/admin-control/user/user-control.vue'], reslove);
            }
            },
            {
                path: 'menu-control', title: "菜单管理", name: "menucontrol", icon: 'pricetag', component: reslove => {
                require(['@/views/admin-control/user/menu-control.vue'], reslove);
            }
            },
            {
                path: 'role-control',
                title: "角色管理",
                name: "rolecontrol",
                icon: 'android-person',
                component: reslove => {
                require(['@/views/admin-control/user/role-control.vue'], reslove);
            }
            },


        ]
    },
    {
        path: '/device-admin',
        title: '设备管理',
        icon: "earth",
        access: 'admin',
        name: 'device-admin',
        component: Main,
        children: [
            {
                path: 'device-type-control',
                title: '采集类型管理',
                name: 'devicetypecontrol',
                icon: 'paper-airplane',
                component: reslove => {
                require(['@/views/admin-control/device/device-type-control.vue'], reslove);
            }
            },
            {
                path: 'device-monitor-control',
                title: '管理员设备监控',
                name: 'devicemonitorcontrol',
                icon: 'podium',
                component: reslove => {
                require(['@/views/admin-control/device/device-monitor-control.vue'], reslove);
            }
            },
            {
                path: 'device-operate-control',
                title: '管理员设备管理',
                name: 'deviceoperatecontrol',
                icon: 'ios-keypad',
                component: reslove => {
                require(['@/views/admin-control/device/device-operate-control.vue'], reslove);
            }
            },
        ]
    }
    // {
    //     path: '/access-test',
    //     icon: 'lock-combination',
    //     title: '权限测试页',
    //     name: 'accesstest',
    //     access: 0,
    //     component: Main,
    //     children: [
    //         {
    //             path: 'index', title: '权限测试页', name: 'accesstest_index', access: 0, component: resolve => {
    //             require(['@/views/access/access-test.vue'], resolve);
    //         }
    //         }
    //     ]
    // },
    // {
    //     path: '/international',
    //     icon: 'earth',
    //     title: {i18n: 'international'},
    //     name: 'international',
    //     component: Main,
    //     children: [
    //         {
    //             path: 'index', title: {i18n: 'international'}, name: 'international_index', component: resolve => {
    //             require(['@/views/international/international.vue'], resolve);
    //         }
    //         }
    //     ]
    // },
    // {
    //     path: '/component',
    //     icon: 'social-buffer',
    //     name: 'component',
    //     title: '组件',
    //     component: Main,
    //     children: [
    //         {
    //             path: 'text-editor',
    //             icon: 'compose',
    //             name: 'text-editor',
    //             title: '富文本编辑器',
    //             component: resolve => {
    //                 require(['@/views/my-components/text-editor/text-editor.vue'], resolve);
    //             }
    //         },
    //         {
    //             path: 'md-editor',
    //             icon: 'pound',
    //             name: 'md-editor',
    //             title: 'Markdown编辑器',
    //             component: resolve => {
    //                 require(['@/views/my-components/markdown-editor/markdown-editor.vue'], resolve);
    //             }
    //         },
    //         {
    //             path: 'image-editor',
    //             icon: 'crop',
    //             name: 'image-editor',
    //        {     title: '图片预览编辑',
    //             component: resolve => {
    //                 require(['@/views/my-components/image-editor/image-editor.vue'], resolve);
    //             }
    //         },
    //         {
    //             path: 'draggable-list',
    //             icon: 'arrow-move',
    //             name: 'draggable-list',
    //             title: '可拖拽列表',
    //             component: resolve => {
    //                 require(['@/views/my-components/draggable-list/draggable-list.vue'], resolve);
    //             }
    //         },
    //         {
    //             path: 'area-linkage',
    //             icon: 'ios-more',
    //             name: 'area-linkage',
    //             title: '城市级联',
    //             component: resolve => {
    //                 require(['@/views/my-components/area-linkage/area-linkage.vue'], resolve);
    //             }
    //         },
    //         {
    //             path: 'file-upload',
    //             icon: 'android-upload',
    //             name: 'file-upload',
    //             title: '文件上传',
    //             component: resolve => {
    //                 require(['@/views/my-components/file-upload/file-upload.vue'], resolve);
    //             }
    //         },
    //         {
    //             path: 'count-to',
    //             icon: 'arrow-graph-up-right',
    //             name: 'count-to',
    //             title: '数字渐变',
    //             component: resolve => {
    //                 require(['@/views/my-components/count-to/count-to.vue'], resolve);
    //             }
    //         }
    //         // {
    //         //     path: 'clipboard-page',
    //         //     icon: 'clipboard',
    //         //     name: 'clipboard-page',
    //         //     title: '一键复制',
    //         //     component: resolve => { require(['@/views/my-components/clipboard/clipboard.vue'], resolve); }
    //         // }
    //     ]
    // },
    // {
    //     path: '/form',
    //     icon: 'android-checkbox',
    //     name: 'form',
    //     title: '表单编辑',
    //     component: Main,
    //     children: [
    //         {
    //             path: 'artical-publish',
    //             title: '文章发布',
    //             name: 'artical-publish',
    //             icon: 'compose',
    //             component: resolve => {
    //                 require(['@/views/form/article-publish/article-publish.vue'], resolve);
    //             }
    //         },
    //         {
    //             path: 'workflow', title: '工作流', name: 'workflow', icon: 'arrow-swap', component: resolve => {
    //             require(['@/views/form/work-flow/work-flow.vue'], resolve);
    //         }
    //         }
    //
    //     ]
    // },
    // {
    //     path: '/charts',
    //     icon: 'ios-analytics',
    //     name: 'charts',
    //     title: '图表',
    //     component: Main,
    //     children: [
    //         { path: 'pie', title: '饼状图', name: 'pie', icon: 'ios-pie', component: resolve => { require('@/views/access/access.vue') },
    //         { path: 'histogram', title: '柱状图', name: 'histogram', icon: 'stats-bars', component: resolve => { require('@/views/access/access.vue') }

    //     ]
    // },
    // {
    //     path: '/tables',
    //     icon: 'ios-grid-view',
    //     name: 'tables',
    //     title: '表格',
    //     component: Main,
    //     children: [
    //         {
    //             path: 'dragableTable',
    //             title: '可拖拽排序',
    //             name: 'dragable-table',
    //             icon: 'arrow-move',
    //             component: resolve => {
    //                 require(['@/views/tables/dragable-table.vue'], resolve);
    //             }
    //         },
    //         {
    //             path: 'editableTable', title: '可编辑表格', name: 'editable-table', icon: 'edit', component: resolve => {
    //             require(['@/views/tables/editable-table.vue'], resolve);
    //         }
    //         },
    //         {
    //             path: 'searchableTable',
    //             title: '可搜索表格',
    //             name: 'searchable-table',
    //             icon: 'search',
    //             component: resolve => {
    //                 require(['@/views/tables/searchable-table.vue'], resolve);
    //             }
    //         },
    //         {
    //             path: 'exportableTable',
    //             title: '表格导出数据',
    //             name: 'exportable-table',
    //             icon: 'code-download',
    //             component: resolve => {
    //                 require(['@/views/tables/exportable-table.vue'], resolve);
    //             }
    //         },
    //         {
    //             path: 'table2image', title: '表格转图片', name: 'table-to-image', icon: 'images', component: resolve => {
    //             require(['@/views/tables/table-to-image.vue'], resolve);
    //         }
    //         }
    //     ]
    // },
    // {
    //     path: '/advanced-router',
    //     icon: 'ios-infinite',
    //     name: 'advanced-router',
    //     title: '高级路由',
    //     component: Main,
    //     children: [
    //         {
    //             path: 'mutative-router', title: '动态路由', name: 'mutative-router', icon: 'link', component: resolve => {
    //             require(['@/views/advanced-router/mutative-router.vue'], resolve);
    //         }
    //         },
    //         {
    //             path: 'argument-page',
    //             title: '带参页面',
    //             name: 'argument-page',
    //             icon: 'android-send',
    //             component: resolve => {
    //                 require(['@/views/advanced-router/argument-page.vue'], resolve);
    //             }
    //         }
    //     ]
    // },
    // {
    //     path: '/error-page',
    //     icon: 'android-sad',
    //     title: '错误页面',
    //     name: 'errorpage',
    //     component: Main,
    //     children: [
    //         {
    //             path: 'index', title: '错误页面', name: 'errorpage_index', component: resolve => {
    //             require(['@/views/error-page/error-page.vue'], resolve);
    //         }
    //         }
    //     ]
    // }
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    preview,
    locking,
    ...appRouter,
    page500,
    page403,
    page404
];
