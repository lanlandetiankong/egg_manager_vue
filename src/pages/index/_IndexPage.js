//ajax远程调用
import axios from '~Config/axios/httpConfig'
//包装param参数
import qs from 'qs'

/* 不要使用 // 进行注释！！！！！！！！！！！！！！！！！！！！！！！！   */

export const IndexPageApi = {
    doGetAllMenu() {
        var param = {

        }
        return axios.post('/define/define_menu/get/all_menu',qs.stringify(param)).then(res => res) ;
    }

}
