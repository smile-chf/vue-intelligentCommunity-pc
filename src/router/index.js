import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
import fan from './fan/index'
import exam from './exam/index'

export default new Router({
    // mode:"history",
    base: 'intelligentCommunityManageView',
    routes: [{
        path: '/',
        name: 'login',
        component: () =>
            import ('@/pages/login'),
    },{
        path: '/bigData',
        name: 'bigDataIndex',
        component: () =>
            import ('@/pages/bigData'),
    },

        {
            path: '/index',
            name: 'index',
            component: () =>
                import ('@/pages/index'),
            children: [
                ...fan,
                ...exam,
                //基础信息
                {
                    path: '/index/message_manage',
                    name: 'message_manage',
                    component: () =>
                        import ('@/pages/baseInfo/message_manage/message_manage')
                },
                {
                    path: '/index/message_manage_detail',
                    name: 'message_manage_detail',
                    component: () =>
                        import ('@/pages/baseInfo/message_manage/message_manage_detail')
                },{
                    path: '/index/user/list',
                    name: 'userList',
                    component: () =>
                        import ('@/pages/baseInfo/user/list'),
                },
                {
                    path: '/index/party_manage',
                    name: 'party_manage',
                    component: () =>
                        import ('@/pages/baseInfo/party_manage/party_manage')
                },
                {
                    path: '/index/party_member_transfer',
                    name: 'party_member_transfer',
                    component: () =>
                        import ('@/pages/baseInfo/party_member_transfer')
                },
                {
                    path: '/index/party_member_transfer_detail',
                    name: 'party_member_transfer_detail',
                    component: () =>
                        import ('@/pages/baseInfo/party_member_transfer_detail')
                },
                //三会一课
                {
                    path: '/index/meet_manage',
                    name: 'meet_manage',
                    component: () =>
                        import ('@/pages/threelesson/meet_manage'),
                },
                {
                    path: '/index/meet_location_manage',
                    name: 'meet_location_manage',
                    component: () =>
                        import ('@/pages/threelesson/meet_location_manage')
                },
                {
                    path: '/index/please_leave',
                    name: 'please_leave',
                    component: () =>
                        import ('@/pages/threelesson/please_leave')
                },
                {
                    path: '/index/add_metting',
                    name: 'add_metting',
                    component: () =>
                        import ('@/pages/threelesson/add_metting')
                },
                {
                    path: '/index/meet_type',
                    name: 'meet_type',
                    component: () =>
                        import ('@/pages/threelesson/meet_type')
                },

                //党员活动日
                {
                    path: '/index/partyMemberDay',
                    name: 'partyMemberDay',
                    component: () =>
                        import ('@/pages/partyMemberDay')
                },
                {
                    path: '/index/partyActiveAdd',
                    name: 'partyActiveAdd',
                    component: () =>
                        import ('@/pages/partyMemberDay/partyActiveAdd')
                },
                {
                    path: '/index/partyMemberDayLeave',
                    name: 'partyMemberDayLeave',
                    component: () =>
                        import ('@/pages/partyMemberDay/partyMemberDayLeave')
                },


                //  民主评议
                {
                    path: '/index/democraticComments/comments_list',
                    name: 'comments_list',
                    component: () =>
                        import ('@/pages/democraticComments/comments_list')
                }, {
                    path: '/index/democraticComments/comment_add',
                    name: 'comment_add',
                    component: () =>
                        import ('@/pages/democraticComments/comment_add')
                },
                //党务公开
                {
                    path: '/index/partyOpen/index',
                    name: 'partyOpen',
                    component: () =>
                        import ('@/pages/partyOpen')
                }, {
                    path: '/index/partyOpen/partyOpen_add',
                    name: 'partyOpen_add',
                    component: () =>
                        import ('@/pages/partyOpen/partyOpen_add')
                },
                //意见征集
                {
                    path: '/index/opinionCollection/index',
                    name: 'opinionCollection',
                    component: () =>
                        import ('@/pages/opinionCollection')
                },
                {
                    path: '/index/opinionCollection/suggest_list',
                    name: 'suggest_list',
                    component: () =>
                        import ('@/pages/opinionCollection/suggest_list')
                },
                {
                    path: '/index/opinionCollection/opinion_question',
                    name: 'opinion_question',
                    component: () =>
                        import ('@/pages/opinionCollection/opinion_question')
                },
                {
                    path: '/index/opinionCollection/config_topic',
                    name: 'config_topic',
                    component: () =>
                        import ('@/pages/opinionCollection/config_topic')
                },
                //党建相册
                {
                    path: '/index/partyPhotos/index',
                    name: 'partyPhotos',
                    component: () =>
                        import ('@/pages/partyPhotos')
                },
                {
                    path: '/index/partyPhotos/photosType',
                    name: 'photosType',
                    component: () =>
                        import ('@/pages/partyPhotos/photosType')
                },
                {
                    path: '/index/partyPhotos/partyPhoto_add',
                    name: 'partyPhoto_add',
                    component: () =>
                        import ('@/pages/partyPhotos/partyPhoto_add')
                },
                //志愿活动
                {
                    path: '/index/charitableActivity/index',
                    name: 'charitableActivity',
                    component: () =>
                        import ('@/pages/charitableActivity')
                },
                {
                    path: '/index/charitableActivity/addChartableActivity',
                    name: 'addChartableActivity',
                    component: () =>
                        import ('@/pages/charitableActivity/addChartableActivity')
                },
                {
                    path: '/index/charitableActivity/typeList',
                    name: 'typeList',
                    component: () =>
                        import ('@/pages/charitableActivity/typeList')
                },
                {
                    path: '/index/charitableActivity/itemList',
                    name: 'itemList',
                    component: () =>
                        import ('@/pages/charitableActivity/itemList')
                },
                //    在线学习
                {
                    path: '/index/onlineStudy/index',
                    name: 'onlineStudy',
                    component: () =>
                        import ('@/pages/onlineStudy')
                },
                {
                    path: '/index/onlineStudy/lesson_list',
                    name: 'lesson_list',
                    component: () =>
                        import ('@/pages/onlineStudy/lesson_list')
                },
                {
                    path: '/index/onlineStudy/lesson_list_handle',
                    name: 'lesson_list_handle',
                    component: () =>
                        import ('@/pages/onlineStudy/lesson_list_handle')
                },
            ]
        }
    ]
})
