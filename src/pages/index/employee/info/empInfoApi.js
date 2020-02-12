//ajax远程调用
import axios from '~Config/axios/httpConfig'
//包装param参数
import qs from 'qs'

/* 不要使用 // 进行注释！！！！！！！！！！！！！！！！！！！！！！！！   */

export const EmpInfoApi = {
    getAllUserAccounts(queryArr,pagination,sorter) {
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
    grantRoleToUser(userAccountId,checkIds){     //用户分配角色-提交
        var obj = {
            userAccountId:userAccountId,
            checkIds:checkIds
        }
        return axios.post("/user/user_account/grantRoleToUser",qs.stringify(obj,{indices: false})).then(res => res) ;
    },
    getAllRoleByUserAccountId(userAccountId){  //根据用户id查询用户所拥有的角色列表
        var params = {
            userAccountId:userAccountId
        }
        return axios.post("/user/user_account/getAllRoleByUserAccountId",qs.stringify(params)).then(res => res) ;
    },
    getAllDefineRoles() {     //取得所有定义的角色
        var obj = {
            queryObj:[],
            paginationObj:{}
        }
        return axios.post('/define/define_role/getAllDefineRoles',qs.stringify(obj)).then(res => res);
    },
    getAllJobByUserAccountId(userAccountId){  //根据用户id查询用户所拥有的职务列表
        var params = {
            userAccountId:userAccountId
        }
        return axios.post("/user/user_account/getAllJobByUserAccountId",qs.stringify(params)).then(res => res) ;
    },
    getAllDefineJobs() {     //取得所有定义的职务
        var obj = {
            queryObj:[],
            paginationObj:{}
        }
        return axios.post('/define/define_job/getAllDefineJobs',qs.stringify(obj)).then(res => res);
    },
    grantJobToUser(userAccountId,checkIds){     //用户设置职务-提交
        var obj = {
            userAccountId:userAccountId,
            checkIds:checkIds
        }
        return axios.post("/user/user_account/grantJobToUser",qs.stringify(obj,{indices: false})).then(res => res) ;
    },
}
