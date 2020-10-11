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
        return axios.post('/announcement_tag/gainEnumSelect',qs.stringify(obj)).then(res => res.data);
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
        return axios.post('/announcement_draft/queryDtoPage',qs.stringify(obj)).then(res => res.data);
    },
    batchDelAnnouncementDraft(ids) {  //批量删除
        var obj = {
            delIds:ids
        }
        return axios.post("/announcement_draft/batchDeleteByIds",qs.stringify(obj,{indices: false})).then(res => res.data) ;
    },
    delOneAnnouncementDraft(delId) {  //删除
        var obj = {
            delId:delId
        }
        return axios.post("/announcement_draft/deleteById",qs.stringify(obj,{indices: false})).then(res => res.data) ;
    },
    publishOneAnnouncementDraft(publishId) {  //草稿转发布
        var obj = {
            draftId:publishId
        }
        return axios.post("/announcement_draft/publishDraft",qs.stringify(obj,{indices: false})).then(res => res.data) ;
    },
    batchPublishAnnouncementDraft(ids) {  //批量发布
        var obj = {
            draftIds:ids
        }
        return axios.post("/announcement_draft/batchPublishDraft",qs.stringify(obj,{indices: false})).then(res => res.data) ;
    },

}

