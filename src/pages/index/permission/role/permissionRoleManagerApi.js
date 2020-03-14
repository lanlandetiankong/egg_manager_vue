//ajax远程调用
import axios from '~Config/axios/httpConfig'
//包装param参数
import qs from 'qs'

/* 不要使用 // 进行注释！！！！！！！！！！！！！！！！！！！！！！！！   */

export const PermissionRoleManagerApi = {
    getAllDefineRoles(queryArr,pagination,sorter) {
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
        //查询所有角色信息
        return axios.post('/define/define_role/getAllDefineRoleDtos',qs.stringify(obj)).then(res => res);
    },
    getDefineRoleById(defineRoleId){  //根据角色id查询角色信息
        var params = {
            defineRoleId:defineRoleId
        }
        return axios.post("/define/define_role/getDefineRoleById",qs.stringify(params)).then(res => res) ;
    },
    getAllPermissionByRoleId(defineRoleId){  //根据角色id查询角色所拥有的权限列表
        var params = {
            defineRoleId:defineRoleId
        }
        return axios.post("/define/define_role/getAllPermissionByRoleId",qs.stringify(params)).then(res => res) ;
    },
    getAllDefinePermissions() {     //取得所有定义的权限
        var obj = {
            queryObj:[],
            paginationObj:{}
        }
        //查询所有权限信息
        return axios.post('/define/define_permission/getAllDefinePermissions',qs.stringify(obj)).then(res => res);
    },
    addDefineRoleByForm(formObj) {     //新增角色
        return axios.post("/define/define_role/doAddDefineRole",qs.stringify(formObj));
    },
    updateDefineRoleByForm(formObj) {  //更新角色
        return axios.post("/define/define_role/doUpdateDefineRole",qs.stringify(formObj)).then(res => res) ;
    },
    batchDelDefineRole(ids) {  //批量删除
        var obj = {
            delIds:ids
        }
        return axios.post("/define/define_role/batchDelDefineRoleByIds",qs.stringify(obj,{indices: false})).then(res => res) ;
    },
    delOneDefineRole(delId) {  //删除
        var obj = {
            delId:delId
        }
        return axios.post("/define/define_role/delOneDefineRoleByIds",qs.stringify(obj,{indices: false})).then(res => res) ;
    },
    grantPermissionToRole(roleId,checkIds){     //角色授权提交
        var obj = {
            roleId:roleId,
            checkIds:checkIds
        }
        return axios.post("/define/define_role/grantPermissionToRole",qs.stringify(obj,{indices: false})).then(res => res) ;
    }
}
