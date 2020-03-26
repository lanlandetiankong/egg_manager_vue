//ajax远程调用
import axios from '~Config/axios/httpConfig'
//包装param参数
import qs from 'qs'

/* 不要使用 // 进行注释！！！！！！！！！！！！！！！！！！！！！！！！   */

export const PermissionManagerApi = {
    getAllDefinePermissions(queryArr,pagination,sorter) {
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
        //查询所有权限信息
        return axios.post('/define/define_permission/getAllDefinePermissionDtos',qs.stringify(obj)).then(res => res);
    },
    getDefinePermissionById(definePermissionId){  //根据权限id查询权限信息
        var params = {
            definePermissionId:definePermissionId
        }
        return axios.post("/define/define_permission/getDefinePermissionById",qs.stringify(params)).then(res => res) ;
    },
    addDefinePermissionByForm(formObj) {     //新增权限
        return axios.post("/define/define_permission/doAddDefinePermission",qs.stringify(formObj));
    },
    updateDefinePermissionByForm(formObj) {  //更新权限
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
    },
    batchEnsureDefinePermission(ids) {  //批量启用
        var obj = {
            ensureIds:ids
        }
        return axios.post("/define/define_permission/batchEnsureDefinePermissionByIds",qs.stringify(obj,{indices: false})).then(res => res) ;
    },
}
