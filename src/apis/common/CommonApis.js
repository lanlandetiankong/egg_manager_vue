//ajax远程调用
import axios from '~Config/axios/httpConfig'
//包装param参数
import qs from 'qs'

/* 不要使用 // 进行注释！！！！！！！！！！！！！！！！！！！！！！！！   */

export const BindingCommonApis = {
    getSwitchEnumList() {
        return axios.post('/common_api/binding/getSwitchEnumList').then((res) => res) ;
    }
}