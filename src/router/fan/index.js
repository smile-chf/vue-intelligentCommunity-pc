let router = [{
        path: '/index/visual',
        name: 'visual',
        component: () =>
            import('@/pages/echarts/index')
    },
    {
        path: '/index/typelist',
        name: 'typelist',
        component: () =>
            import('../../pages/partyOpen/typelist')
    },
    {
        path: '/index/statistics',
        name: 'statistics',
        component: () =>
            import('../../pages/exam/statistics.vue')
    },
    {
        path: '/index/commentlist',
        name: 'commentlist',
        component: () =>
            import('../../pages/partyOpen/commentlist/index.vue')
    },

    {
        path: '/personnelPortrait',
        name: 'personnelPortrait',
        component: () =>
            import('../../pages/PartyAccount/personnelPortrait')
    },
    {
        path: '/threeLessonsStatistics',
        name: 'threeLessonsStatistics',
        component: () =>
            import('../../pages/PartyAccount/threeLessonsStatistics/index.vue'),
        children: [{
                path: '/threeLessonsStatistics/allStatistics',
                name: 'allStatistics',
                component: () =>
                    import('../../pages/PartyAccount/threeLessonsStatistics/allStatistics'),
            },
            {
                path: '/threeLessonsStatistics/personageStatistics',
                name: 'personageStatistics',
                component: () =>
                    import('../../pages/PartyAccount/threeLessonsStatistics/personageStatistics'),
            },
            {
                path: '/threeLessonsStatistics/orgStatistics',
                name: 'orgStatistics',
                component: () =>
                    import('../../pages/PartyAccount/threeLessonsStatistics/orgStatistics'),
            },
        ]
    },
    {
        path: '/index/peesonageDetails',
        name: 'peesonageDetails',
        component: () =>
            import('../../pages/PartyAccount/threeLessonsStatistics/personageStatistics/peesonageDetails')
    },
    {
        path: '/index/orgDetails',
        name: 'orgDetails',
        component: () =>
            import('../../pages/PartyAccount/threeLessonsStatistics/orgStatistics/orgDetails/index.vue')
    },
    {
        path: '/index/learningInstruction',
        name: 'learningInstruction',
        component: () =>
            import('../../pages/PartyAccount/learningInstruction/index.vue'),
        children: [{
                path: '/index/learningInstruction/learningallStatistics',
                name: 'learningallStatistics',
                component: () =>
                    import('../../pages/PartyAccount/learningInstruction/learningallStatistics/index.vue')
            },
            {
                path: '/index/learningInstruction/learningotherStatistics',
                name: 'learningotherStatistics',
                component: () =>
                    import('../../pages/PartyAccount/learningInstruction/learningotherStatistics/index.vue')
            },
        ]
    },
    {
        path: '/index/learnDetails',
        name: 'learnDetails',
        component: () =>
            import('../../pages/PartyAccount/learningInstruction/learningotherStatistics/learnDetails')
    },
    {
        path: '/index/onlineStudyStatistics',
        name: 'onlineStudyStatistics',
        component: () =>
            import('../../pages/PartyAccount/onlineStudyStatistics/index.vue'),
        children: [{
                path: '/index/onlineStudyStatistics/allOnline',
                name: 'allOnline',
                component: () =>
                    import('../../pages/PartyAccount/onlineStudyStatistics/allOnline/index.vue')
            },
            {
                path: '/index/onlineStudyStatistics/otherOnline',
                name: 'otherOnline',
                component: () =>
                    import('../../pages/PartyAccount/onlineStudyStatistics/otherOnline/index.vue')
            },
        ]
    },
    {
        path: '/index/onlineDetails',
        name: 'onlineDetails',
        component: () =>
            import('../../pages/PartyAccount/onlineStudyStatistics/otherOnline/onlineDetails')
    },
    {
        path: '/index/partyOpenStatistics',
        name: 'partyOpenStatistics',
        component: () =>
            import('../../pages/PartyAccount/partyOpenStatistics/index.vue'),
        children: [{
                path: '/index/partyOpenStatistics/allOpenStatistics',
                name: 'allOpenStatistics',
                component: () =>
                    import('../../pages/PartyAccount/partyOpenStatistics/allOpenStatistics')
            },
            {
                path: '/index/partyOpenStatistics/otherlOpenStatistics',
                name: 'otherlOpenStatistics',
                component: () =>
                    import('../../pages/PartyAccount/partyOpenStatistics/otherlOpenStatistics/index.vue')
            },
        ]
    },
    {
        path: '/index/openDetails',
        name: 'onlineDetails',
        component: () =>
            import('../../pages/PartyAccount/partyOpenStatistics/otherlOpenStatistics/openDetails')
    },
    {
        path: '/index/register',
        name: 'register',
        component: () =>
            import('../../pages/register/index.vue')
    },
];
export default router
