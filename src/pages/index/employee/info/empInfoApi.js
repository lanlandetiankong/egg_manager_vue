//ajax远程调用
import axios from '~Config/axios/httpConfig'
//包装param参数
import qs from 'qs';
import {axiosForExcelUtil} from '~Utils/axios/axiosUtils'

/* 不要使用 // 进行注释！！！！！！！！！！！！！！！！！！！！！！！！   */

export const EmpInfoApi = {
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
        return axios.post('/user/user_account/getAllUserAccountDtos', qs.stringify(obj)).then(res => res.data);
    },
    getUserAccountById(userAccountId) {  //根据用户id查询用户信息
        var params = {
            accountId: userAccountId
        }
        return axios.post("/user/user_account/getUserAccountById", qs.stringify(params)).then(res => res.data);
    },
    addUserAccountByForm(formObj, avatarUrl) {     //新增用户
        formObj['avatarUrl'] = avatarUrl;
        var obj = {
            formObj: JSON.stringify(formObj),
        }
        return axios.post("/user/user_account/doAddUserAccount", qs.stringify(obj)).then(res => res.data);;
    },
    updateUserAccountByForm(formObj, avatarUrl) {  //更新用户
        formObj['avatarUrl'] = avatarUrl;
        var obj = {
            formObj: JSON.stringify(formObj),
        }
        return axios.post("/user/user_account/doUpdateUserAccount", qs.stringify(obj)).then(res => res.data);
    },
    batchDelUserAccount(ids) {  //批量删除
        var obj = {
            delIds: ids
        }
        return axios.post("/user/user_account/batchDelUserAccountByIds", qs.stringify(obj, {indices: false})).then(res => res.data);
    },
    delOneUserAccount(delId) {  //删除
        var obj = {
            delId: delId
        }
        return axios.post("/user/user_account/delOneUserAccountById", qs.stringify(obj, {indices: false})).then(res => res.data);
    },
    batchChangeLockStateUserAccount(ids, lockFlag) {  //批量锁定
        var obj = {
            lockIds: ids,
            lockFlag: lockFlag
        }
        return axios.post("/user/user_account/batchLockUserAccountByIds", qs.stringify(obj, {indices: false})).then(res => res.data);
    },
    lockStateChangeOneUserAccount(lockId, lockFlag) {  //锁定
        var obj = {
            lockId: lockId,
            lockFlag: lockFlag
        }
        return axios.post("/user/user_account/lockOneUserAccountById", qs.stringify(obj, {indices: false})).then(res => res.data);
    },
    grantRoleToUser(userAccountId, checkIds) {     //用户分配角色-提交
        var obj = {
            userAccountId: userAccountId,
            checkIds: checkIds
        }
        return axios.post("/user/user_account/grantRoleToUser", qs.stringify(obj, {indices: false})).then(res => res.data);
    },
    getAllRoleByUserAccountId(userAccountId) {  //根据用户id查询用户所拥有的角色列表
        var params = {
            userAccountId: userAccountId
        }
        return axios.post("/user/user_account/getAllRoleByUserAccountId", qs.stringify(params)).then(res => res.data);
    },
    getAllDefineRoles() {     //取得所有定义的角色
        var obj = {
            queryObj: [],
            paginationObj: {}
        }
        return axios.post('/define/define_role/getAllDefineRoles', qs.stringify(obj)).then(res => res.data);
    },
    getAllJobByUserAccountId(userAccountId) {  //根据用户id查询用户所拥有的职务列表
        var params = {
            userAccountId: userAccountId
        }
        return axios.post("/user/user_account/getAllJobByUserAccountId", qs.stringify(params)).then(res => res.data);
    },
    getAllDefineJobs() {     //取得所有定义的职务
        var obj = {
            queryObj: [],
            paginationObj: {}
        }
        return axios.post('/define/define_job/getAllDefineJobs', qs.stringify(obj)).then(res => res.data);
    },
    grantJobToUser(userAccountId, checkIds) {     //用户设置职务-提交
        var obj = {
            userAccountId: userAccountId,
            checkIds: checkIds
        }
        return axios.post("/user/user_account/grantJobToUser", qs.stringify(obj, {indices: false})).then(res => res.data);
    },
    getAllDefineTenantEnums() {  //取得 租户 列表
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
        return axios.post('/organization/define_tenant/getAllDefineTenantEnums', qs.stringify(obj)).then(res => res.data);
    },
    exportCheckToExcel(menuId, checkIds) {    //导出已勾选为Excel
        var _this = this ;
        var obj = {
            menuId: menuId,
            checkIds: checkIds,
        }
        return axios.post("/excel/user_account/exportCheckList",
            qs.stringify(obj, {indices: false}),{
                responseType: "blob"
            }
        ).then((response,e,els) => {
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
        return axios.post("/excel/user_account/exportAllList",
            qs.stringify(obj, {indices: false}),
            {
                responseType: "blob"
            }
        ).then(response => {
            if(!response){
                return;
            }
            //将response 新建成文件流
            var blob = new Blob([response], {type: 'application/vnd.ms-excel;charset=utf-8'})
            //创建下载地址以及a标签,并且模拟a标签的点击事件进行下载文件。
            var url = window.URL.createObjectURL(blob);
            var aLink = document.createElement("a");
            aLink.style.display = "none";
            aLink.download = '短讯接收人列表模板.xlsx';
            aLink.href = url;
            document.body.appendChild(aLink)
            aLink.click();
        });
    },
}
