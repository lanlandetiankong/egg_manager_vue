//ajax远程调用
import axios from '~Config/axios/httpConfig'
//包装param参数
import qs from 'qs';

/* 不要使用 // 进行注释！！！！！！！！！！！！！！！！！！！！！！！！   */

export const UserTableSelectCompApi = {
    getAllUserAccounts(queryArr, pagination, sorter) {
        var sortObj = {}
        if (sorter) {
            sortObj['field'] = sorter.field;
            sortObj['order'] = sorter.order;
        }
        var obj = {
            queryObj: JSON.stringify(queryArr),
            paginationObj: JSON.stringify(pagination),
            sortObj: JSON.stringify(sortObj),
        }
        //查询所有用户信息
        return axios.post('/commmon/component/user/user_account/getAllUserAccountDtos', qs.stringify(obj)).then(res => res.data);
    },
    getAllDefineRoles() {     //取得所有定义的角色
        var obj = {
            queryObj: [],
            paginationObj: {}
        }
        return axios.post('/define/define_role/getAllDefineRoles', qs.stringify(obj)).then(res => res.data);
    },
    getAllDefineJobs() {     //取得所有定义的职务
        var obj = {
            queryObj: [],
            paginationObj: {}
        }
        return axios.post('/define/define_job/getAllDefineJobs', qs.stringify(obj)).then(res => res.data);
    },
    getAllDefineTenantEnums() {  //取得 租户 列表
        var sortObj = {     //固定 order字段 排序
            field: "orderNum",
            order: "ascend"
        }
        var obj = {
            queryObj: JSON.stringify([]),
            //paginationObj:JSON.stringify({}),
            //sortObj:JSON.stringify(sortObj),
        }
        //查询所有[租户定义]信息
        return axios.post('/organization/define_tenant/getAllDefineTenantEnums', qs.stringify(obj)).then(res => res.data);
    },
    getAllDefineDepartmentTrees() {  //取得 租户 列表
        var sortObj = {     //固定 order字段 排序
            field: "orderNum",
            order: "ascend"
        }
        var obj = {
            queryObj: JSON.stringify([]),
        }
        //查询所有[租户定义]信息
        return axios.post('/define/define_department/getAllDepartmentTreeSelect', qs.stringify(obj)).then(res => res.data);
    }
}
