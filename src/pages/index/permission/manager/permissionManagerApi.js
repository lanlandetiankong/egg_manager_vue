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
        return axios.post('/define/definePermission/queryDtoPage',qs.stringify(obj)).then(res => res.data);
    },
    getDefinePermissionById(definePermissionId){  //根据权限id查询权限信息
        var params = {
            definePermissionId:definePermissionId
        }
        return axios.post("/define/definePermission/queryOneById",qs.stringify(params)).then(res => res.data) ;
    },
    addDefinePermissionByForm(formObj) {     //新增权限
        debugger;
        if(formObj){
            if(formObj.codePrefix){
                formObj.code = formObj.codePrefix[0] + formObj.code ;
            }
        }
        return axios.post("/define/definePermission/createByForm",qs.stringify(formObj)).then(res => res.data);;
    },
    updateDefinePermissionByForm(formObj) {  //更新权限
        return axios.post("/define/definePermission/updateByForm",qs.stringify(formObj)).then(res => res.data) ;
    },
    batchDelDefinePermission(ids) {  //批量删除
        var obj = {
            delIds:ids
        }
        return axios.post("/define/definePermission/batchDelDefinePermissionByIds",qs.stringify(obj,{indices: false})).then(res => res.data) ;
    },
    delOneDefinePermission(delId) {  //删除
        var obj = {
            delId:delId
        }
        return axios.post("/define/definePermission/deleteById",qs.stringify(obj,{indices: false})).then(res => res.data) ;
    },
    batchEnsureDefinePermission(ids) {  //批量启用
        var obj = {
            ensureIds:ids
        }
        return axios.post("/define/definePermission/batchDeleteByIds",qs.stringify(obj,{indices: false})).then(res => res.data) ;
    },
}
