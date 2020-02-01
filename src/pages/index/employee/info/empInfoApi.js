//ajax远程调用
import axios from '~Config/axios/httpConfig'
//包装param参数
import qs from 'qs'

/* 不要使用 // 进行注释！！！！！！！！！！！！！！！！！！！！！！！！   */

export const EmpInfoApi = {
    getAllUserAccounts(query) {
        var queryObj = new Object();
        if(query){
            for (var key in query){
                queryObj[key] = query[key] ;
            }
        }
        var obj = {
            queryObj:JSON.stringify(queryObj)
        }
        //查询所有用户信息
        return axios.post('/user/user_account/getAllUserAccounts',qs.stringify(obj)).then(res => res);
    },
    addUserAccountByForm(formObj) {
        //新增用户
        return axios.post("/user/user_account/doAddUserAccount",qs.stringify(formObj)).then(res => res) ;
    },
    updateUserAccountByForm(formObj) {
        //新增用户
        return axios.post("/user/user_account/doUpdateUserAccount",qs.stringify(formObj)).then(res => res) ;
    },
    batchDelUserAccount(ids) {
        var obj = {
            delIds:ids
        }
        //新增用户
        return axios.post("/user/user_account/doUpdateUserAccount",qs.stringify(obj)).then(res => res) ;
    }
}
