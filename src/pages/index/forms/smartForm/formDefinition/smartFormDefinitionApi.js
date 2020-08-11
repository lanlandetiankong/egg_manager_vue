//ajax远程调用
import axios from '~Config/axios/httpConfig'
//包装param参数
import qs from 'qs'

/* 不要使用 // 进行注释！！！！！！！！！！！！！！！！！！！！！！！！   */

export const SmartFormDefinitionApi = {
    getDataPage(queryArr,pagination,sorter) {
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
        return axios.post('/forms/smartForm/formDefinition/getDataPage',qs.stringify(obj)).then(res => res.data);
    },
    getOneItemById(fid){  //根据模块id查询模块信息
        var params = {
            fid:fid
        }
        return axios.post("/forms/smartForm/formDefinition/getOneItemById",qs.stringify(params)).then(res => res.data) ;
    },
    addByForm(formObj) {     //新增模块
        return axios.post("/forms/smartForm/formDefinition/addByForm",qs.stringify(formObj)).then(res => res.data);;
    },
    updateByForm(formObj) {  //更新模块
        return axios.post("/forms/smartForm/formDefinition/updateByForm",qs.stringify(formObj)).then(res => res.data) ;
    },
    batchDelByIds(ids) {  //批量删除
        var obj = {
            delIds:ids
        }
        return axios.post("/forms/smartForm/formDefinition/batchDelByIds",qs.stringify(obj,{indices: false})).then(res => res.data) ;
    },
    delOneById(delId) {  //删除
        var obj = {
            delId:delId
        }
        return axios.post("/forms/smartForm/formDefinition/delOneById",qs.stringify(obj,{indices: false})).then(res => res.data) ;
    },
    getAllFormTypeEnums() {  //取得 租户 列表
        var sortObj = {     //固定 order字段 排序
            field: "ordering",
            order: "ascend"
        }
        var obj = {
            queryObj: JSON.stringify([]),
            //paginationObj:JSON.stringify({}),
            //sortObj:JSON.stringify(sortObj),
        }
        //查询所有[租户定义]信息
        return axios.post('/forms/smartForm/formTypeDefinition/getDataAll', qs.stringify(obj)).then(res => res.data);
    },
}
