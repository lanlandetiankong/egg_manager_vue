//ajax远程调用
import axios from '~Config/axios/httpConfig'
//包装param参数
import qs from 'qs'

/* 不要使用 // 进行注释！！！！！！！！！！！！！！！！！！！！！！！！   */

export const DepartmentManagerApi = {
    getAllDefineDepartmentTree() {
        //查询所有部门信息(树结构)
        return axios.post('/define/define_department/getAllDepartmentTreeSelect').then(res => res.data);
    },
    getAllDefineDepartments(queryArr,pagination,sorter) {
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
        //查询所有部门信息
        return axios.post('/define/define_department/getAllDefineDepartmentDtos',qs.stringify(obj)).then(res => res.data);
    },
    getDefineDepartmentById(defineDepartmentId){  //根据部门id查询部门信息
        var params = {
            defineDepartmentId:defineDepartmentId
        }
        return axios.post("/define/define_department/getDefineDepartmentById",qs.stringify(params)).then(res => res.data) ;
    },
    addDefineDepartmentByForm(formObj) {     //新增部门
        return axios.post("/define/define_department/doAddDefineDepartment",qs.stringify(formObj)).then(res => res.data);;
    },
    updateDefineDepartmentByForm(formObj) {  //更新部门
        return axios.post("/define/define_department/doUpdateDefineDepartment",qs.stringify(formObj)).then(res => res.data) ;
    },
    batchDelDefineDepartment(ids) {  //批量删除
        var obj = {
            delIds:ids
        }
        return axios.post("/define/define_department/batchDelDefineDepartmentByIds",qs.stringify(obj,{indices: false})).then(res => res.data) ;
    },
    delOneDefineDepartment(delId) {  //删除
        var obj = {
            delId:delId
        }
        return axios.post("/define/define_department/delOneDefineDepartmentById",qs.stringify(obj,{indices: false})).then(res => res.data) ;
    }
}
