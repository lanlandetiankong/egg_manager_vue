//ajax远程调用
import axios from '~Config/axios/httpConfig'
//包装param参数
import qs from 'qs'

/* 不要使用 // 进行注释！！！！！！！！！！！！！！！！！！！！！！！！   */

export const EmpInfoApi = {
    getAllUserAccounts(queryArr,pagination) {
        var obj = {
            queryObj:JSON.stringify(queryArr),
            paginationObj:JSON.stringify(pagination)
        }
        //查询所有用户信息
        return axios.post('/user/user_account/getAllUserAccounts',qs.stringify(obj)).then(res => res);
    },
    getUserAccountById(userAccountId){  //根据用户id查询用户信息
        var params = {
            accountId:userAccountId
        }
        return axios.post("/user/user_account/getUserAccountById",qs.stringify(params)).then(res => res) ;
    },
    addUserAccountByForm(formObj) {     //新增用户
        return axios.post("/user/user_account/doAddUserAccount",qs.stringify(formObj));
    },
    updateUserAccountByForm(formObj) {  //更新用户
        return axios.post("/user/user_account/doUpdateUserAccount",qs.stringify(formObj)).then(res => res) ;
    },
    batchDelUserAccount(ids) {  //批量删除
        var obj = {
            delIds:ids
        }
        return axios.post("/user/user_account/batchDelUserAccountByIds",qs.stringify(obj,{indices: false})).then(res => res) ;
    },
    delOneUserAccount(delId) {  //删除
        var obj = {
            delId:delId
        }
        return axios.post("/user/user_account/delOneUserAccountById",qs.stringify(obj,{indices: false})).then(res => res) ;
    },
    batchChangeLockStateUserAccount(ids,lockFlag) {  //批量锁定
        var obj = {
            lockIds:ids,
            lockFlag:lockFlag
        }
        return axios.post("/user/user_account/batchLockUserAccountByIds",qs.stringify(obj,{indices: false})).then(res => res) ;
    },
    lockStateChangeOneUserAccount(lockId,lockFlag) {  //锁定
        var obj = {
            lockId:lockId,
            lockFlag:lockFlag
        }
        return axios.post("/user/user_account/lockOneUserAccountById",qs.stringify(obj,{indices: false})).then(res => res) ;
    },
}
