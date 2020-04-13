//ajax远程调用
import axios from '~Config/axios/httpConfig'
//包装param参数
import qs from 'qs'

/* 不要使用 // 进行注释！！！！！！！！！！！！！！！！！！！！！！！！   */

export const EmpJobApi = {
    getAllDefineJobs(queryArr,pagination,sorter) {
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
        //查询所有职务信息
        return axios.post('/define/define_job/getAllDefineJobDtos',qs.stringify(obj)).then(res => res.data);
    },
    getDefineJobById(defineJobId){  //根据职务id查询职务信息
        var params = {
            defineJobId:defineJobId
        }
        return axios.post("/define/define_job/getDefineJobById",qs.stringify(params)).then(res => res.data) ;
    },
    addDefineJobByForm(formObj) {     //新增职务
        return axios.post("/define/define_job/doAddDefineJob",qs.stringify(formObj)).then(res => res.data);;
    },
    updateDefineJobByForm(formObj) {  //更新职务
        return axios.post("/define/define_job/doUpdateDefineJob",qs.stringify(formObj)).then(res => res.data) ;
    },
    batchDelDefineJobs(ids) {  //批量删除
        var obj = {
            delIds:ids
        }
        return axios.post("/define/define_job/batchDelDefineJobByIds",qs.stringify(obj,{indices: false})).then(res => res.data) ;
    },
    delOneDefineJob(delId) {  //删除
        var obj = {
            delId:delId
        }
        return axios.post("/define/define_job/delOneDefineJobById",qs.stringify(obj,{indices: false})).then(res => res.data) ;
    }
}
