//ajax远程调用
import axios from '~Config/axios/httpConfig'
//包装param参数
import qs from 'qs'

/* 不要使用 // 进行注释！！！！！！！！！！！！！！！！！！！！！！！！   */

export const AnnouncementCreateApi = {
    addAnnouncementByForm(formObj) {     //发布公告
        return axios.post("/announcement/addAnnouncement",qs.stringify(formObj));
    },
    addAnnouncementFromDraftByForm(formObj) {     //发布 更新后的公告草稿
        if(formObj){
            formObj["createTime"] = undefined;
            formObj["updateTime"] = undefined;
        }
        return axios.post("/announcement/addAnnouncementFromDraft",qs.stringify(formObj));
    },
    addAnnouncementDraftByForm(formObj) {     //提交公告到草稿箱
        return axios.post("/announcement_draft/addAnnouncementDraft",qs.stringify(formObj));
    },
    updateAnnouncementDraftByForm(formObj) {     //更新公告草稿
        if(formObj){
            formObj["createTime"] = undefined;
            formObj["updateTime"] = undefined;
        }
        return axios.post("/announcement_draft/updateAnnouncementDraft",qs.stringify(formObj));
    },
    getAnnouncementDraftById(draftId){  //根据 公告草稿id 取得公告草稿
        var params = {
            draftId:draftId
        }
        return axios.post("/announcement_draft/getAnnouncementDraftById",qs.stringify(params));
    },
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

}
