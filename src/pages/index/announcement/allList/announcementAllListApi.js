//ajax远程调用
import axios from '~Config/axios/httpConfig'
//包装param参数
import qs from 'qs'

/* 不要使用 // 进行注释！！！！！！！！！！！！！！！！！！！！！！！！   */

export const AnnouncementAllListApi = {
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
    getAllAnnouncements(queryArr,pagination,sorter) {
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
        //查询所有公告信息
        return axios.post('/announcement/getAllAnnouncements',qs.stringify(obj)).then(res => res);
    },
    batchDelAnnouncement(ids) {  //批量删除
        var obj = {
            delIds:ids
        }
        return axios.post("/announcement/batchDelAnnouncementByIds",qs.stringify(obj,{indices: false})).then(res => res) ;
    },
    delOneAnnouncement(delId) {  //删除
        var obj = {
            delId:delId
        }
        return axios.post("/announcement/delOneAnnouncementByIds",qs.stringify(obj,{indices: false})).then(res => res) ;
    },

}

