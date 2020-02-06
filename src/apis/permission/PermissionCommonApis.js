//ajax远程调用
import axios from '~Config/axios/httpConfig'
//包装param参数
import qs from 'qs'

/* 不要使用 // 进行注释！！！！！！！！！！！！！！！！！！！！！！！！   */

export const PermissionCommonApis = {
    getAllPermissionTypes() {
        return axios.post('/common_api/permission/getAllPermissionTypeEnumList').then((res) => res) ;
    }
}
