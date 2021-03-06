//ajax远程调用
import axios from '~Config/axios/httpConfig'
//包装param参数
import qs from 'qs'

/* 不要使用 // 进行注释！！！！！！！！！！！！！！！！！！！！！！！！   */

export const OblArticleCollectCategoryApi = {
    getTreeDataAll() {
        var obj = {
            withRoot:true  ,   //是否包含根节点
        }
        return axios.post('/oblCtl/article/oblArticleCategory/queryTreeSelect',qs.stringify(obj)).then(res => res.data);
    },
    getPageQuery(queryArr,pagination,sorter) {
        var sortObj = {};
        if(sorter){
            sorter.field = sorter.order ;
        }
        var obj = {
            queryObj:JSON.stringify(queryArr),
            paginationObj:JSON.stringify(pagination),
            sortObj:JSON.stringify(sortObj),
        }
        return axios.post('/oblCtl/article/oblArticleCategory/queryDtoPage',qs.stringify(obj)).then(res => res.data);
    },
    getItemById(fid){  //根据id查询item
        var params = {
            fid:fid
        }
        return axios.post("/oblCtl/article/oblArticleCategory/queryOneById",qs.stringify(params)).then(res => res.data) ;
    },
    createByForm(formObj) {     //新增
        return axios.post("/oblCtl/article/oblArticleCategory/createByForm",qs.stringify(formObj)).then(res => res.data);;
    },
    updateByForm(formObj) {  //更新
        return axios.post("/oblCtl/article/oblArticleCategory/updateByForm",qs.stringify(formObj)).then(res => res.data) ;
    },
    batchDeleteByIds(ids) {  //批量删除
        var obj = {
            delIds:ids
        }
        return axios.post("/oblCtl/article/oblArticleCategory/batchDeleteByIds",qs.stringify(obj,{indices: false})).then(res => res.data) ;
    },
    deleteById(delId) {  //删除
        var obj = {
            delId:delId
        }
        return axios.post("/oblCtl/article/oblArticleCategory/deleteById",qs.stringify(obj,{indices: false})).then(res => res.data) ;
    }
}
