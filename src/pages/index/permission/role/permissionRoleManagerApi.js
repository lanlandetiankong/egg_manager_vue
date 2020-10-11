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
        return axios.post('/define/define_role/getAllDefineRoleDtos',qs.stringify(obj)).then(res => res.data);
    },
    getDefineRoleById(defineRoleId){  //根据角色id查询角色信息
        var params = {
            defineRoleId:defineRoleId
        }
        return axios.post("/define/define_role/queryOneById",qs.stringify(params)).then(res => res.data) ;
    },
    getAllPermissionByRoleId(defineRoleId){  //根据角色id查询角色所拥有的[权限定义]列表
        var params = {
            defineRoleId:defineRoleId
        }
        return axios.post("/define/define_role/gainAllPermissionByRoleId",qs.stringify(params)).then(res => res.data) ;
    },
    getAllDefinePermissions() {     //取得所有定义的权限
        var obj = {
            queryObj:[],
            paginationObj:{}
        }
        //查询所有权限信息
        return axios.post('/define/define_permission/queryPage',qs.stringify(obj)).then(res => res.data);
    },
    getAllDefineMenuTree() {
        var obj = {
            withRoot:false  ,   //是否包含根节点
        }
        //查询所有菜单信息(树结构)
        return axios.post('/define/define_menu/queryTreeSelect',qs.stringify(obj)).then(res => res.data);
    },
    getAllMenuByRoleId(defineRoleId){  //根据角色id查询角色所拥有的[菜单定义]列表
        var params = {
            defineRoleId:defineRoleId,
            filterParentNode:true,  //是否过滤掉 有子节点的 [菜单节点]
        }
        return axios.post("/define/define_role/gainAllMenuByRoleId",qs.stringify(params)).then(res => res.data) ;
    },
    addDefineRoleByForm(formObj) {     //新增角色
        return axios.post("/define/define_role/createByForm",qs.stringify(formObj)).then(res => res.data);;
    },
    updateDefineRoleByForm(formObj) {  //更新角色
        return axios.post("/define/define_role/updateByForm",qs.stringify(formObj)).then(res => res.data) ;
    },
    batchDelDefineRole(ids) {  //批量删除
        var obj = {
            delIds:ids
        }
        return axios.post("/define/define_role/batchDeleteByIds",qs.stringify(obj,{indices: false})).then(res => res.data) ;
    },
    delOneDefineRole(delId) {  //删除
        var obj = {
            delId:delId
        }
        return axios.post("/define/define_role/deleteById",qs.stringify(obj,{indices: false})).then(res => res.data) ;
    },
    grantPermissionToRole(roleId,checkIds){     //角色授权提交
        var obj = {
            roleId:roleId,
            checkIds:checkIds
        }
        return axios.post("/define/define_role/grantPermissionToRole",qs.stringify(obj,{indices: false})).then(res => res.data) ;
    },
    grantMenusToRole(roleId,checkIds,halfCheckIds){     //[菜单授权]提交
        var obj = {
            roleId:roleId,
            checkIds:checkIds,
            halfCheckIds:halfCheckIds
        }
        return axios.post("/define/define_role/grantMenusToRole",qs.stringify(obj,{indices: false})).then(res => res.data) ;
    }
}
