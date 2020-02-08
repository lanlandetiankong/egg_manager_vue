//ajax远程调用
import axios from '~Config/axios/httpConfig'
//包装param参数
import qs from 'qs'

/* 不要使用 // 进行注释！！！！！！！！！！！！！！！！！！！！！！！！   */

export const PermissionRoleManagerApi = {
    getAllDefineRoles(queryArr,pagination) {
        var obj = {
            queryObj:JSON.stringify(queryArr),
            paginationObj:JSON.stringify(pagination)
        }
        //查询所有用户信息
        return axios.post('/define/define_role/getAllDefineRoles',qs.stringify(obj)).then(res => res);
    },
    getDefineRoleById(defineRoleId){  //根据用户id查询用户信息
        var params = {
            defineRoleId:defineRoleId
        }
        return axios.post("/define/define_role/getDefineRoleById",qs.stringify(params)).then(res => res) ;
    },
    addDefineRoleByForm(formObj) {     //新增用户
        return axios.post("/define/define_role/doAddDefineRole",qs.stringify(formObj));
    },
    updateDefineRoleByForm(formObj) {  //更新用户
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
    }
}
