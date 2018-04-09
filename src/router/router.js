import Main from '@/views/Main.vue'

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: resolve => {
        require(['@/views/login.vue'], resolve)
    }
}

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: resolve => {
        require(['@/views/error-page/404.vue'], resolve)
    }
}

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: resolve => {
        require(['@//views/error-page/403.vue'], resolve)
    }
}

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: resolve => {
        require(['@/views/error-page/500.vue'], resolve)
    }
}

export const locking = {
    path: '/locking',
    name: 'locking',
    component: resolve => {
        require(['@/views/main-components/lockscreen/components/locking-page.vue'], resolve)
    }
}

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/device-user/device-monitor',
    component: Main,
    children: [
        {
            path: 'home', title: {i18n: 'home'}, name: 'home_index', component: resolve => {
            require(['@/views/home/home.vue'], resolve)
        }
        },
        // {
        //     path: 'ownspace', title: '个人中心', name: 'ownspace_index', component: resolve => {
        //     require(['@/views/own-space/own-space.vue'], resolve)
        // }
        // },
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
        // {
        //     path: 'message', title: '消息中心', name: 'message_index', component: resolve => {
        //     require(['@/views/message/message.vue'], resolve);
        // }
        // },
        {
            path: 'device-admin/device-type-control/add',
            title: '采集类型添加',
            name: 'collectionTypeAdd',
            component: resolve => {
                require(['@/views/admin-control/device/components/device-type-add.vue'], resolve)
            }
        },
        {
            path: 'user-admin/user-control/add',
            title: '用户添加',
            name: 'userAdd',
            component: resolve => {
                require(['@/views/admin-control/user/components/user-add.vue'], resolve)
            }
        },
        {
            path: 'device-area/area-edit',
            title: '区域编辑',
            name: 'area_edit',
            component: resolve => {
                require(['@/views/device/device-area/area-edit.vue'], resolve)
            }
        },
        {
            path: '/device-user/device-operate',
            icon: 'pound',
            name: 'device-operate',
            title: '采集设备管理',
            component: resolve => {
                require(['@/views/device/device-area/device/device-operate.vue'], resolve)
            }
        },
        {
            path: '/device-user/device-monitor/current-history',
            title: '当前设备的历史',
            name: 'CurrentHistory',
            component: resolve => {
                require(['@/views/device/device-monitor/components/current-history.vue'], resolve)
            }
        },
        {
            path: '/device-user/device-monitor/switch-configuration',
            title: '开关设备配置',
            name: 'switch_configuration',
            component: resolve => {
                require(['@/views/device/device-monitor/components/switch-configuration.vue'], resolve)
            }
        },
        {
            path: '/device-user/device-operate/device-control',
            title: '设备管理',
            name: 'device_Control',
            component: resolve => {
                require(['@/views/device/device-operate/device-control.vue'], resolve)
            }
        },
        {
            path: '/device-user/device-operate/device-add',
            title: '设备添加',
            name: 'device_add',
            component: resolve => {
                require(['@/views/device/device-operate/device-add.vue'], resolve)
            }
        },
        {
            path: '/device-user/device-operate/device-edit',
            title: '设备编辑',
            name: 'device_edit',
            component: resolve => {
                require(['@/views/device/device-operate/device-edit.vue'], resolve)
            }
        },
        {
            path: '/device-user/device-operate/switch-add',
            title: '开关设备添加',
            name: 'switch_add',
            component: resolve => {
                require(['@/views/device/device-operate/switch-add.vue'], resolve)
            }
        },
        {
            path: '/device-user/device-operate/switch-edit',
            title: '开关设备更新',
            name: 'switch_edit',
            component: resolve => {
                require(['@/views/device/device-operate/switch-edit.vue'], resolve)
            }
        },
        {
            path: '/device-trigger/trigger-update',
            title: '编辑设备触发器',
            icon: 'archive',
            name: 'trigger_update',
            component: resovle => {
                require(['@/views/device/device-trigger/trigger-update.vue'], resovle)
            }
        },
        {
            path: '/switch-timer/switch-timer-update',
            title: '更新定时',
            icon: 'archive',
            name: 'switch-timer-update',
            component: resolve => {
                require(['@/views/device/switch-timer/switch-timer-update.vue'], resolve)
            }
        },
        {
            path: '/switch-strategy/switch-strategy-update',
            title: '更新策略',
            icon: 'archive',
            name: 'switch-strategy_update',
            component: reslove => {
                require(['@/views/device/switch-strategy/switch-strategy-update.vue'], reslove)
            }
        }
    ]
}

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path: '/device-user',
        icon: 'lock-combination',
        title: '设备监控',
        name: 'device-user',
        component: Main,
        children: [
            {
                path: 'device-monitor',
                icon: 'arrow-swap',
                title: '设备监控',
                name: 'device_monitor',
                component: resolve => {
                    require(['@/views/device/device-monitor/device-monitor.vue'], resolve)
                },
                meta: {
                    keepAlive: true // 需要被缓存
                }
            }
        ]
    },
    {
        path: '/device-area',
        icon: 'lock-combination',
        title: '区域管理',
        name: 'device-area',
        component: Main,
        children: [
            {
                path: 'device-area',
                icon: 'arrow-swap',
                title: '区域管理',
                name: 'device_area',
                component: resolve => {
                    require(['@/views/device/device-area/device-area.vue'], resolve)
                }
            },
            {
                path: 'area-add',
                icon: 'arrow-swap',
                title: '区域添加',
                name: 'area_add',
                component: resolve => {
                    require(['@/views/device/device-area/area-add.vue'], resolve)
                }
            },
        ]
    },
    {
        path: '/device-trigger',
        title: '设备触发器',
        icon: 'archive',
        name: 'device_trigger',
        component: Main,
        children: [
            {
                path: 'trigger-list',
                title: '设备触发器',
                icon: 'archive',
                name: 'trigger_list',
                component: resolve => {
                    require(['@/views/device/device-trigger/device-trigger.vue'], resolve)
                }
            },
            {
                path: 'trigger-add',
                title: '添加设备触发器',
                icon: 'archive',
                name: 'trigger_add',
                component: resovle => {
                    require(['@/views/device/device-trigger/trigger-add.vue'], resovle)
                }
            }
        ]
    },
    {
        path: '/switch-timer',
        title: '设备定时',
        icon: 'archive',
        name: 'switch_timer',
        component: Main,
        children: [
            {
                path: 'switch-timer-list',
                title: '设备定时',
                icon: 'archive',
                name: 'switch_timer_list',
                component: resolve => {
                    require(['@/views/device/switch-timer/switch-timer.vue'], resolve)
                }
            },
            {
                path: 'switch-timer-add',
                title: '添加定时',
                icon: 'archive',
                name: 'switch-timer_add',
                component: resolve => {
                    require(['@/views/device/switch-timer/switch-timer-add.vue'], resolve)
                }
            }

        ]

    },
    {
        path: '/switch-strategy',
        title: '开关设备策略',
        icon: 'archive',
        name: 'switch_strategy',
        component: Main,
        children: [
            {
                path: 'switch-strategy-list',
                title: '策略列表',
                icon: 'archive',
                name: 'switch-strategy-list',
                component: resolve => {
                    require(['@/views/device/switch-strategy/switch-strategy.vue'], resolve)
                }
            },
            {
                path: 'switch-strategy-add',
                title: '添加策略',
                icon: 'archive',
                name: 'switch-strategy_add',
                component: reslove => {
                    require(['@/views/device/switch-strategy/switch-strategy-add.vue'], reslove)
                }
            }

        ]
    },
    {
        path: '/device-history',
        title: '设备历史',
        icon: 'archive',
        name: 'device_history',
        component: Main,
        children: [
            // {
            //     path: 'device_history',
            //     icon: 'ios-list',
            //     name: 'device-all-history',
            //     title: '设备历史记录',
            //     component: resolve => {
            //         require(['@/views/device/device-allhistory/device-allhistory.vue'], resolve)
            //     }
            // },
            {
                path: 'historychart', title: '历史曲线', name: 'history-chart', icon: 'ios-pulse', component: reslove => {
                require(['@/views/device/device-history/device-history-chart.vue'], reslove)
            }
            },
            {
                path: 'historyofflinelog',
                title: '离线记录',
                name: 'hostory-offline-log',
                icon: 'alert',
                component: reslove => {
                    require(['@/views/device/device-history/device-offline-log.vue'], reslove)
                }
            }
        ]
    },
    {
        path: '/device-ervery-report',
        title: '设备报表',
        icon: 'ios-book',
        name: 'device-every-report',
        component: Main,
        children: [
            {
                path: 'dayreport', title: '日报表', name: 'day-report', icon: 'ios-paper', component: reslove => {
                require(['@/views/device/device-everyreport/day-report.vue'], reslove)
            }
            },
            // {
            //     path: 'weekreport', title: "周报表", name: "weekreport", icon: 'ios-paper', component: reslove => {
            //     require(['@/views/device/device-everyreport/week-report.vue'],reslove);
            // }
            // },
            {
                path: 'monthreport', title: '月报表', name: 'month-report', icon: 'ios-paper', component: reslove => {
                require(['@/views/device/device-everyreport/month-report.vue'], reslove)
            }
            },
            // {
            //     path: 'dayreport', title: "季报表", name: "seasonreport", icon: 'ios-paper', component: reslove => {
            //     require(['@/views/device/device-everyreport/season-report.vue'],reslove);
            // }
            // },
            // {
            //     path: 'dayreport', title: "年报表", name: "yearreport", icon: 'ios-paper', component: reslove => {
            //     require(['@/views/device/device-everyreport/year-report.vue'],reslove);
            // }
            // },
        ]
    },
    {
        path: '/',
        title: '用户中心',
        icon: 'android-person',
        name: 'user-center',
        component: Main,
        children: [
            {
                path: 'message', title: '消息中心', name: 'message_index', icon: 'android-textsms', component: resolve => {
                require(['@/views/message/message.vue'], resolve)
            }
            },
            {
                path: 'ownspace', title: '个人中心', name: 'ownspace_index', icon: 'person', component: resolve => {
                require(['@/views/own-space/own-space.vue'], resolve)
            }
            },
        ]

    },
    {
        path: '/user-admin',
        title: '系统管理',
        icon: 'wrench',
        name: 'user-admin',
        access: 'admin',
        component: Main,
        children: [
            {
                path: 'user-control', title: '用户管理', name: 'user-control', icon: 'ios-paper', component: reslove => {
                require(['@/views/admin-control/user/user-control.vue'], reslove)
            }
            },
            {
                path: 'menu-control', title: '菜单管理', name: 'menu-control', icon: 'pricetag', component: reslove => {
                require(['@/views/admin-control/user/menu-control.vue'], reslove)
            }
            },
            {
                path: 'role-control',
                title: '角色管理',
                name: 'role-control',
                icon: 'android-person',
                component: reslove => {
                    require(['@/views/admin-control/user/role-control.vue'], reslove)
                }
            },

        ]
    },
    {
        path: '/device-admin',
        title: '设备管理',
        icon: 'earth',
        access: 'admin',
        name: 'device-admin',
        component: Main,
        children: [
            {
                path: 'device-type-control',
                title: '采集类型管理',
                name: 'device-type-control',
                icon: 'paper-airplane',
                component: reslove => {
                    require(['@/views/admin-control/device/device-type-control.vue'], reslove)
                },
                meta: {
                    keepAlive: true // 需要被缓存
                }
            },
            {
                path: 'device-con-control',
                title: '集中器管理',
                name: 'device-con-control',
                icon: 'drag',
                component: reslove => {
                    require(['@/views/admin-control/device/device-concentrator-control.vue'], reslove)
                },
                meta: {
                    keepAlive: false // 需要被缓存
                }
            },
            {
                path: 'device-monitor-control',
                title: '用户设备监控',
                name: 'devicemonitorcontrol',
                icon: 'podium',
                component: reslove => {
                    require(['@/views/admin-control/device/device-monitor-control.vue'], reslove)
                },
                meta: {
                    keepAlive: true // 不需要被缓存
                }
            },
            {
                path: 'device-operate-control',
                title: '设备管理',
                name: 'device-operate-control',
                icon: 'ios-keypad',
                component: reslove => {
                    require(['@/views/admin-control/device/device-operate-control.vue'], reslove)
                },
                meta: {
                    keepAlive: true // 需要被缓存
                }
            },
        ]
    }
]

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    locking,
    ...appRouter,
    page500,
    page403,
    page404
]
