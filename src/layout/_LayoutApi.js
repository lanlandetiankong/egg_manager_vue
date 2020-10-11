//ajax远程调用
import axios from '~Config/axios/httpConfig'
//包装param参数
import qs from 'qs'

/* 不要使用 // 进行注释！！！！！！！！！！！！！！！！！！！！！！！！   */

export const LayoutApi = {
    doGetAllMenu() {
        return axios.post('/define/define_menu/user/gainGrantTree').then(res => res.data) ;
    }

}
