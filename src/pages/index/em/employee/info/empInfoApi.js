//ajax远程调用
import axios from '~Config/axios/httpConfig'
//包装param参数
import qs from 'qs';
import {pageUtil,axiosForExcelUtil} from '~Utils/axios/axiosUtils'

/* 不要使用 // 进行注释！！！！！！！！！！！！！！！！！！！！！！！！   */

export const EmpInfoApi = {
    getPageQuery(queryArr, pagination, sorter) {
        var sortObj = pageUtil.parseSorterToObj(sorter);
        var obj = {
            queryObj: JSON.stringify(queryArr),
            paginationObj: JSON.stringify(pagination),
            sortObj: JSON.stringify(sortObj),
        }
        //查询所有用户信息
        return axios.post('/emCtl/user/userAccount/queryDtoPage', qs.stringify(obj)).then(res => res.data);
    },
    getItemById(userAccountId) {  //根据用户id查询用户信息
        var params = {
            accountId: userAccountId
        }
        return axios.post("/emCtl/user/userAccount/queryOneById", qs.stringify(params)).then(res => res.data);
    },
    createByForm(formObj, avatarUrl) {     //新增用户
        formObj['avatarUrl'] = avatarUrl;
        var obj = {
            formObj: JSON.stringify(formObj),
        }
        return axios.post("/emCtl/user/userAccount/createByForm", qs.stringify(obj)).then(res => res.data);;
    },
    updateByForm(formObj, avatarUrl) {  //更新用户
        formObj['avatarUrl'] = avatarUrl;
        var obj = {
            formObj: JSON.stringify(formObj),
        }
        return axios.post("/emCtl/user/userAccount/updateByForm", qs.stringify(obj)).then(res => res.data);
    },
    batchDeleteByIds(ids) {  //批量删除
        var obj = {
            delIds: ids
        }
        return axios.post("/emCtl/user/userAccount/batchDeleteByIds", qs.stringify(obj, {indices: false})).then(res => res.data);
    },
    deleteById(delId) {  //删除
        var obj = {
            delId: delId
        }
        return axios.post("/emCtl/user/userAccount/deleteById", qs.stringify(obj, {indices: false})).then(res => res.data);
    },
    batchLockByIds(ids, lockFlag) {  //批量锁定
        var obj = {
            lockIds: ids,
            lockFlag: lockFlag
        }
        return axios.post("/emCtl/user/userAccount/batchUpdateLockByIds", qs.stringify(obj, {indices: false})).then(res => res.data);
    },
    lockById(lockId, lockFlag) {  //锁定
        var obj = {
            lockId: lockId,
            lockFlag: lockFlag
        }
        return axios.post("/emCtl/user/userAccount/updateLockById", qs.stringify(obj, {indices: false})).then(res => res.data);
    },
    grantRoleToUser(userAccountId, checkIds) {     //用户分配角色-提交
        var obj = {
            userAccountId: userAccountId,
            checkIds: checkIds
        }
        return axios.post("/emCtl/user/userAccount/grantRoleToUser", qs.stringify(obj, {indices: false})).then(res => res.data);
    },
    getAllRoleByUserAccountId(userAccountId) {  //根据用户id查询用户所拥有的角色列表
        var params = {
            userAccountId: userAccountId
        }
        return axios.post("/emCtl/user/userAccount/gainGrantedRole", qs.stringify(params)).then(res => res.data);
    },
    getAllDefineRoles() {     //取得所有定义的角色
        var obj = {
            queryObj: [],
            paginationObj: {}
        }
        return axios.post('/emCtl/define/defineRole/queryPage', qs.stringify(obj)).then(res => res.data);
    },
    getAllJobByUserAccountId(userAccountId) {  //根据用户id查询用户所拥有的职务列表
        var params = {
            userAccountId: userAccountId
        }
        return axios.post("/emCtl/user/userAccount/gainGrantedJob", qs.stringify(params)).then(res => res.data);
    },
    getAllDefineJobs() {     //取得所有定义的职务
        var obj = {
            queryObj: [],
            paginationObj: {}
        }
        return axios.post('/emCtl/define/defineJob/queryPage', qs.stringify(obj)).then(res => res.data);
    },
    grantJobToUser(userAccountId, checkIds) {     //用户设置职务-提交
        var obj = {
            userAccountId: userAccountId,
            checkIds: checkIds
        }
        return axios.post("/emCtl/user/userAccount/grantJobToUser", qs.stringify(obj, {indices: false})).then(res => res.data);
    },
    getAllDefineTenantEnums() {  //取得 租户 列表
        var sortObj = {}
        var obj = {
            queryObj: JSON.stringify([]),
            //paginationObj:JSON.stringify({}),
            //sortObj:JSON.stringify(sortObj),
        }
        //查询所有[租户定义]信息
        return axios.post('/emCtl/organization/defineTenant/gainEnumSelect', qs.stringify(obj)).then(res => res.data);
    },
    getAllDefineDepartmentTrees() {  //取得 租户 列表
        var sortObj = {}
        var obj = {
            queryObj: JSON.stringify([]),
        }
        //查询所有[租户定义]信息
        return axios.post('/emCtl/define/defineDepartment/queryTreeSelect', qs.stringify(obj)).then(res => res.data);
    },
    exportCheckToExcel(menuId, checkIds) {    //导出已勾选为Excel
        var _this = this ;
        var obj = {
            menuId: menuId,
            checkIds: checkIds,
        }
        return axios.post("/emCtl/excel/userAccount/exportCheckList",
            qs.stringify(obj, {indices: false}),{
                responseType: "blob"
            }
        ).then((response) => {
            if(!response){
                return;
            }
            axiosForExcelUtil.exportExcelDownload(response);
        });
    },
    exportAllToExcel(menuId) {     //导出所有为Excel
        var obj = {
            menuId: menuId,
        }
        return axios.post("/emCtl/excel/userAccount/exportAllList",
            qs.stringify(obj, {indices: false}),
            {
                responseType: "blob"
            }
        ).then(response => {
            if(!response){
                return;
            }
            axiosForExcelUtil.exportExcelDownload(response);
        });
    },
    importDataFromExcel(formData){    //[导入数据]
        return axios.post("/emCtl/excel/userAccount/importData",formData,
            {
                headers: {'Content-Type': 'multipart/form-data'}
            }
        ).then(res => res.data) ;
    }
}
