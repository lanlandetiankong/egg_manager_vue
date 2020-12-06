//ajax远程调用
import axios from '~Config/axios/httpConfig'
//包装param参数
import qs from 'qs'

/* 不要使用 // 进行注释！！！！！！！！！！！！！！！！！！！！！！！！   */

export const ModuleManagerApi = {
    getAllDefineModules(queryArr,pagination,sorter) {
        var sortObj = {}
        if(sorter){
            sorter.field = sorter.order ;
        }
        var obj = {
            queryObj:JSON.stringify(queryArr),
            paginationObj:JSON.stringify(pagination),
            sortObj:JSON.stringify(sortObj),
        }
        //查询所有模块信息
        return axios.post('/module/define_module/queryDtoPage',qs.stringify(obj)).then(res => res.data);
    },
    getDefineModuleById(defineModuleId){  //根据模块id查询模块信息
        var params = {
            defineModuleId:defineModuleId
        }
        return axios.post("/module/define_module/queryOneById",qs.stringify(params)).then(res => res.data) ;
    },
    addDefineModuleByForm(formObj) {     //新增模块
        return axios.post("/module/define_module/createByForm",qs.stringify(formObj)).then(res => res.data);;
    },
    updateDefineModuleByForm(formObj) {  //更新模块
        return axios.post("/module/define_module/updateByForm",qs.stringify(formObj)).then(res => res.data) ;
    },
    batchDelDefineModule(ids) {  //批量删除
        var obj = {
            delIds:ids
        }
        return axios.post("/module/define_module/batchDeleteByIds",qs.stringify(obj,{indices: false})).then(res => res.data) ;
    },
    delOneDefineModule(delId) {  //删除
        var obj = {
            delId:delId
        }
        return axios.post("/module/define_module/deleteById",qs.stringify(obj,{indices: false})).then(res => res.data) ;
    }
}
