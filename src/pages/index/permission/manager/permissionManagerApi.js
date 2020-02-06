//ajax远程调用
import axios from '~Config/axios/httpConfig'
//包装param参数
import qs from 'qs'

/* 不要使用 // 进行注释！！！！！！！！！！！！！！！！！！！！！！！！   */

export const PermissionManagerApi = {
    getAllDefinePermissions(query,pagination) {
        var queryObj = new Object();
        if(query){
            for (var key in query){
                queryObj[key] = query[key] ;
            }
        }
        var obj = {
            queryObj:JSON.stringify(queryObj),
            paginationObj:JSON.stringify(pagination)
        }
        //查询所有用户信息
        return axios.post('/define/define_permission/getAllDefinePermissions',qs.stringify(obj)).then(res => res);
    },
    getDefinePermissionById(definePermissionId){  //根据用户id查询用户信息
        var params = {
            definePermissionId:definePermissionId
        }
        return axios.post("/define/define_permission/getDefinePermissionById",qs.stringify(params)).then(res => res) ;
    },
    addDefinePermissionByForm(formObj) {     //新增用户
        return axios.post("/define/define_permission/doAddDefinePermission",qs.stringify(formObj));
    },
    updateDefinePermissionByForm(formObj) {  //更新用户
        return axios.post("/define/define_permission/doUpdateDefinePermission",qs.stringify(formObj)).then(res => res) ;
    },
    batchDelDefinePermission(ids) {  //批量删除
        var obj = {
            delIds:ids
        }
        return axios.post("/define/define_permission/batchDelDefinePermissionByIds",qs.stringify(obj,{indices: false})).then(res => res) ;
    },
    delOneDefinePermission(delId) {  //删除
        var obj = {
            delId:delId
        }
        return axios.post("/define/define_permission/delOneDefinePermissionByIds",qs.stringify(obj,{indices: false})).then(res => res) ;
    }
}
