//ajax远程调用
import axios from '~Config/axios/httpConfig'
//包装param参数
import qs from 'qs'

/* 不要使用 // 进行注释！！！！！！！！！！！！！！！！！！！！！！！！   */

export const AnnouncementDisplayApi = {
    getItemById(announcementId){  //根据 公告草稿id 取得公告草稿
        var params = {
            announcementId:announcementId
        }
        return axios.post("/emCtl/announcement/queryOneById",qs.stringify(params)).then(res => res.data);
    }

}
