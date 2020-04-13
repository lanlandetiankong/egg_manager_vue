//ajax远程调用
import axios from '~Config/axios/httpConfig'
//包装param参数
import qs from 'qs'

/* 不要使用 // 进行注释！！！！！！！！！！！！！！！！！！！！！！！！   */

export const UserZoneCenterApi = {
    getAllRoleByUserAccountId(userAccountId){  //根据用户id查询用户所拥有的角色列表
        var params = {
            userAccountId:userAccountId
        }
        return axios.post("/user/user_account/getAllRoleByUserAccountId",qs.stringify(params)).then(res => res.data) ;
    },
    getAllPermissionByUserAccountId(userAccountId){  //根据用户id查询用户所拥有的权限列表
        var params = {
            userAccountId:userAccountId
        }
        return axios.post("/user/user_account/getAllPermissionByUserAccountId",qs.stringify(params)).then(res => res.data) ;
    },
    getAllJobByUserAccountId(userAccountId){  //根据用户id查询用户所拥有的职务列表
        var params = {
            userAccountId:userAccountId
        }
        return axios.post("/user/user_account/getAllJobByUserAccountId",qs.stringify(params)).then(res => res.data) ;
    },
}
