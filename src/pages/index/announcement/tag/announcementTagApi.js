//ajax远程调用
import axios from '~Config/axios/httpConfig'
//包装param参数
import qs from 'qs'

/* 不要使用 // 进行注释！！！！！！！！！！！！！！！！！！！！！！！！   */

export const AnnouncementTagApi = {
    getAllAnnouncementTags(queryArr,pagination,sorter) {
        var sortObj = {}
        if(sorter){
            sortObj['field'] = sorter.field ;
            sortObj['order'] = sorter.order ;
        }
        var obj = {
            queryObj:JSON.stringify(queryArr),
            paginationObj:JSON.stringify(pagination),
            sortObj:JSON.stringify(sortObj),
        }
        //查询所有公告标签信息
        return axios.post('/announcement_tag/queryDtoPage',qs.stringify(obj)).then(res => res.data);
    },
    getAnnouncementTagById(announcementTagId){  //根据公告标签id查询公告标签信息
        var params = {
            announcementTagId:announcementTagId
        }
        return axios.post("/announcement_tag/queryOneById",qs.stringify(params)).then(res => res.data) ;
    },
    addAnnouncementTagByForm(formObj) {     //新增公告标签
        return axios.post("/announcement_tag/createByForm",qs.stringify(formObj)).then(res => res.data);;
    },
    updateAnnouncementTagByForm(formObj) {  //更新公告标签
        return axios.post("/announcement_tag/updateByForm",qs.stringify(formObj)).then(res => res.data) ;
    },
    batchDelAnnouncementTag(ids) {  //批量删除
        var obj = {
            delIds:ids
        }
        return axios.post("/announcement_tag/batchDeleteByIds",qs.stringify(obj,{indices: false})).then(res => res.data) ;
    },
    delOneAnnouncementTag(delId) {  //删除
        var obj = {
            delId:delId
        }
        return axios.post("/announcement_tag/deleteById",qs.stringify(obj,{indices: false})).then(res => res.data) ;
    }
}

