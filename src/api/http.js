import request from "../utils/request";

function login() {
    return request({
        url: "",
        method: "POST",
    });
}

function getPartyWorkDetail(id) {
    return request({
        url: `/intelligentCommunity/manage/publicPartyWork/getPartyWorkDetail/${id}`,
        method: "GET",
    });
}


function queryAgeCount() {
    return request({
        url: "/intelligentCommunity/manage/statistics/member/getDepartData",
        method: "GET",
    });
}

function getCollectData(departId, year) {
    return request({
        url: '/intelligentCommunity/manage/statistics/conference/getCollectData',
        method: "GET",
        params: {
            departId,
            year
        }
    });
}

function getDepartList() {
    return request({
        url: '/intelligentCommunity/manage/statistics/conference/getDepartList',
        method: "GET",
    });
}

function getDepartTree() {
    return request({
        url: '/intelligentCommunity/manage/statistics/conference/getDepartTree',
        method: "GET",
    });
}

function getPersonalData({
    pageSize,
    pageNum,
    departId,
    username,
    startDate,
    endDate
}) {
    return request({
        url: '/intelligentCommunity/manage/statistics/conference/getPersonalData',
        method: "GET",
        params: {
            pageSize,
            pageNum,
            departId,
            username,
            startDate,
            endDate
        }
    });
}


function exportPersonalData(ids) {
    return request({
        url: '/intelligentCommunity/manage/statistics/conference/exportPersonalData',
        method: "GET",
        params: {
            ids
        }
    });
}

function getConferenceType() {
    return request({
        url: '/intelligentCommunity/manage/statistics/conference/getConferenceType',
        method: "GET",

    });
}

function getPersonalDataDetail(data) {
    return request({
        url: '/intelligentCommunity/manage/statistics/conference/getPersonalDataDetail',
        method: "GET",
        params: {
            ...data
        }
    });
}

function getDepartData(data) {
    return request({
        url: '/intelligentCommunity/manage/statistics/conference/getDepartData',
        method: "GET",
        params: {
            ...data
        }
    });
}

function getDepartDataDetail(data) {
    return request({
        url: '/intelligentCommunity/manage/statistics/conference/getDepartDataDetail',
        method: "GET",
        params: {
            ...data
        }
    });
}

function getData(year) {
    return request({
        url: '/intelligentCommunity/manage/statistics/onlineExam/getData',
        method: "GET",
        params: {
            year
        }
    });
}

function edugetCollectData() {
    return request({
        url: '/intelligentCommunity/manage/statistics/educationLesson/getCollectData',
        method: "GET",

    });
}

function getCollectStudyCountData(year) {
    return request({
        url: '/intelligentCommunity/manage/statistics/educationLesson/getCollectStudyCountData',
        method: "GET",
        params: {
            year
        }
    });
}

function getCollectStudySumData(year) {
    return request({
        url: '/intelligentCommunity/manage/statistics/educationLesson/getCollectStudySumData',
        method: "GET",
        params: {
            year
        }
    });
}

function edugetPersonalData({
    pageSize,
    pageNum,
    departId,
    username,
    startDate,
    endDate
}) {
    return request({
        url: '/intelligentCommunity/manage/statistics/educationLesson/getPersonalData',
        method: "GET",
        params: {
            pageSize,
            pageNum,
            departId,
            username,
            startDate,
            endDate
        }
    });
}

function getLessonType() {
    return request({
        url: '/intelligentCommunity/manage/statistics/educationLesson/getLessonType',
        method: "GET",

    });
}

function edugetPersonalDataDetail({
    id,
    title,
    typeId,
    pageNum
}) {
    return request({
        url: '/intelligentCommunity/manage/statistics/educationLesson/getPersonalDataDetail',
        method: "GET",
        params: {
            id,
            title,
            typeId,
            pageSize: 10,
            pageNum
        }
    });
}



function onlgetPersonalData({
    pageSize,
    pageNum,
    departId,
    username,
    startDate,
    endDate
}) {
    return request({
        url: '/intelligentCommunity/manage/statistics/onlineExam/getPersonalData',
        method: "GET",
        params: {
            pageSize,
            pageNum,
            departId,
            username,
            startDate,
            endDate
        }
    });
}

function pubgetPersonalData({
    pageSize,
    pageNum,
    departId,
    username,
    startDate,
    endDate
}) {
    return request({
        url: '/intelligentCommunity/manage/statistics/publicPartyWork/getPersonalData',
        method: "GET",
        params: {
            pageSize,
            pageNum,
            departId,
            username,
            startDate,
            endDate
        }
    });
}


function onlgetPersonalDataDetail({
    id,
    title,
    type,
    pageNum
}) {
    return request({
        url: '/intelligentCommunity/manage/statistics/onlineExam/getPersonalDataDetail',
        method: "GET",
        params: {
            id,
            title,
            type,
            pageSize: 10,
            pageNum
        }
    });
}


function pubgetCollectData(year) {
    return request({
        url: '/intelligentCommunity/manage/statistics/publicPartyWork/getCollectData',
        method: "GET",
        params: {
            year
        }
    });
}

function getMemberListData({
    pageSize,
    pageNum,
    departId,
    username,
    startDate,
    endDate
}) {
    return request({
        url: '/intelligentCommunity/manage/statistics/member/getMemberListData',
        method: "GET",
        params: {
            pageSize,
            pageNum,
            departId,
            username,
            startDate,
            endDate
        }
    });
}

function queryCommentatorsListById(id, pageNum) {
    return request({
        url: "/intelligentCommunity/manage/publicPartyWork/queryCommentatorsListById",
        method: "POST",
        data: {
            id
        },
        params: {
            pageNum,
            pageSize: 10
        }
    });
}

function queryPersonnelListById(id, pageNum) {
    return request({
        url: "/intelligentCommunity/manage/publicPartyWork/queryPersonnelListById",
        method: "POST",
        data: {
            id
        },
        params: {
            pageNum,
            pageSize: 10
        }
    });
}

function queryCommentById(id, pageNum) {
    return request({
        url: "/intelligentCommunity/manage/publicPartyWork/queryCommentContent",
        method: "POST",
        data: {
            id
        },
        params: {
            pageNum,
            pageSize: 10
        }
    });
}

function updateAuditById(id, audit) {
    return request({
        url: "/intelligentCommunity/manage/publicPartyWork/updateAuditById",
        method: "POST",
        data: {
            id,
            audit
        },

    });
}


function getExamsMemberList({
    id,
    username,
    departId,
    status,
    order,
    pageNum
}) {
    return request({
        url: "/intelligentCommunity/manage/exam/getExamsMemberList",
        method: "POST",
        data: {
            id,
            username,
            departId,
            status,
            order
        },
        params: {
            pageNum,
            pageSize: 10,
        }
    });
}

function getExamsMemberDetails(id,mid) {
    return request({
        url: '/intelligentCommunity/manage/exam/getExamsMemberDetails',
        method: "GET",
        params: {
            id,
            mid
        }
    });
}
function getListByPage({pageNum,pageSize,name}) {
    return request({
        url: '/intelligentCommunity/manage/partyCompanyRegister/getListByPage',
        method: "GET",
        params: {
            pageNum,pageSize,name
        }
    });
}
function getById(id) {
    return request({
        url: `/intelligentCommunity/manage/partyCompanyRegister/getById/${id}`,
        method: "GET",
    
    });
}


export {
    getListByPage,
    getExamsMemberDetails,
    getExamsMemberList,
    updateAuditById,
    queryPersonnelListById,
    queryCommentatorsListById,
    login,
    getPartyWorkDetail,
    queryAgeCount,
    getCollectData,
    getDepartList,
    getDepartTree,
    getPersonalData,
    exportPersonalData,
    getConferenceType,
    getPersonalDataDetail,
    getDepartData,
    getDepartDataDetail,
    getData,
    edugetCollectData,
    getCollectStudyCountData,
    getCollectStudySumData,
    edugetPersonalData,
    onlgetPersonalData,
    getLessonType,
    edugetPersonalDataDetail,
    onlgetPersonalDataDetail,
    pubgetCollectData,
    pubgetPersonalData,
    getMemberListData,
    queryCommentById,
    getById
};
