//ajax远程调用
import axios from '~Config/axios/httpConfig'
//包装param参数
import qs from 'qs'

/* 不要使用 // 进行注释！！！！！！！！！！！！！！！！！！！！！！！！   */

export const TenantManagerApi = {
    getAllDefineTenants(queryArr,pagination,sorter) {
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
        //查询所有租户信息
        return axios.post('/organization/define_tenant/getAllDefineTenantDtos',qs.stringify(obj)).then(res => res);
    },
    getDefineTenantById(defineTenantId){  //根据租户id查询租户信息
        var params = {
            defineTenantId:defineTenantId
        }
        return axios.post("/organization/define_tenant/getDefineTenantById",qs.stringify(params)).then(res => res) ;
    },
    addDefineTenantByForm(formObj) {     //新增租户
        return axios.post("/organization/define_tenant/doAddDefineTenant",qs.stringify(formObj));
    },
    updateDefineTenantByForm(formObj) {  //更新租户
        return axios.post("/organization/define_tenant/doUpdateDefineTenant",qs.stringify(formObj)).then(res => res) ;
    },
    batchDelDefineTenant(ids) {  //批量删除
        var obj = {
            delIds:ids
        }
        return axios.post("/organization/define_tenant/batchDelDefineTenantByIds",qs.stringify(obj,{indices: false})).then(res => res) ;
    },
    delOneDefineTenant(delId) {  //删除
        var obj = {
            delId:delId
        }
        return axios.post("/organization/define_tenant/delOneDefineTenantById",qs.stringify(obj,{indices: false})).then(res => res) ;
    }
}
