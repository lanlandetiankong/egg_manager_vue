//ajax远程调用
import axios from '~Config/axios/httpConfig'
//包装param参数
import qs from 'qs'

/* 不要使用 // 进行注释！！！！！！！！！！！！！！！！！！！！！！！！   */

export const ModuleManagerApi = {
    getAllDefineModules(queryArr,pagination,sorter) {
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
        //查询所有模块信息
        return axios.post('/module/define_module/getAllDefineModuleDtos',qs.stringify(obj)).then(res => res);
    },
    getDefineModuleById(defineModuleId){  //根据模块id查询模块信息
        var params = {
            defineModuleId:defineModuleId
        }
        return axios.post("/module/define_module/getDefineModuleById",qs.stringify(params)).then(res => res) ;
    },
    addDefineModuleByForm(formObj) {     //新增模块
        return axios.post("/module/define_module/doAddDefineModule",qs.stringify(formObj));
    },
    updateDefineModuleByForm(formObj) {  //更新模块
        return axios.post("/module/define_module/doUpdateDefineModule",qs.stringify(formObj)).then(res => res) ;
    },
    batchDelDefineModule(ids) {  //批量删除
        var obj = {
            delIds:ids
        }
        return axios.post("/module/define_module/batchDelDefineModuleByIds",qs.stringify(obj,{indices: false})).then(res => res) ;
    },
    delOneDefineModule(delId) {  //删除
        var obj = {
            delId:delId
        }
        return axios.post("/module/define_module/delOneDefineModuleById",qs.stringify(obj,{indices: false})).then(res => res) ;
    }
}
