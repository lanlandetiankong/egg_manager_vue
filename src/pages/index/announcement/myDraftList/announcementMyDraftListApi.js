//ajax远程调用
import axios from '~Config/axios/httpConfig'
//包装param参数
import qs from 'qs'

/* 不要使用 // 进行注释！！！！！！！！！！！！！！！！！！！！！！！！   */

export const AnnouncementMyDraftListApi = {
    getAllAnnouncementTagEnums() {  //取得 公告标签 列表
        var sortObj = {     //固定 order字段 排序
            field:"ordering",
            order:"ascend"
        }
        var obj = {
            queryObj:JSON.stringify([]),
            //paginationObj:JSON.stringify({}),
            sortObj:JSON.stringify(sortObj),
        }
        //查询所有公告标签信息
        return axios.post('/announcement_tag/getAllAnnouncementTagEnums',qs.stringify(obj)).then(res => res);
    },
    getAllMyCreateAnnouncementDrafts(queryArr,pagination,sorter) {   //取得 所有公告
        var sortObj = {}
        if(sorter){
            sortObj['field'] = sorter.field ;
            sortObj['order'] = sorter.order ;
        }
        var obj = {
            queryObj:JSON.stringify(queryArr),
            paginationObj:JSON.stringify(pagination),
            sortObj:JSON.stringify(sortObj),
            onlySelf:true
        }
        //查询所有公告信息
        return axios.post('/announcement_draft/getAllAnnouncementDrafts',qs.stringify(obj)).then(res => res);
    },
    batchDelAnnouncementDraft(ids) {  //批量删除
        var obj = {
            delIds:ids
        }
        return axios.post("/announcement_draft/batchDelAnnouncementDraftByIds",qs.stringify(obj,{indices: false})).then(res => res) ;
    },
    delOneAnnouncementDraft(delId) {  //删除
        var obj = {
            delId:delId
        }
        return axios.post("/announcement_draft/delOneAnnouncementDraftByIds",qs.stringify(obj,{indices: false})).then(res => res) ;
    },
    publishOneAnnouncementDraft(publishId) {  //草稿转发布
        var obj = {
            draftId:publishId
        }
        return axios.post("/announcement_draft/publishOneAnnouncementDraftById",qs.stringify(obj,{indices: false})).then(res => res) ;
    },
    batchPublishAnnouncementDraft(ids) {  //批量发布
        var obj = {
            draftIds:ids
        }
        return axios.post("/announcement_draft/batchPublishAnnouncementDraftByIds",qs.stringify(obj,{indices: false})).then(res => res) ;
    },

}

