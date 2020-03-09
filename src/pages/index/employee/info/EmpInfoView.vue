<template>
    <div>
        <div>
            <!-- 搜索区域 -->
            <div v-show="searchConf.showListFlag">
                <div>
                    <a-form layout="inline"
                            :form="searchForm"
                            @submit="handleSearchFormQuery"
                    >
                        <a-row :gutter="10">
                            <a-col :span="searchConf.defaultColSpan">
                                <a-form-item label="账号">
                                    <a-input v-decorator="searchConf.paramConf.account" />
                                </a-form-item>
                            </a-col>
                            <a-col :span="searchConf.defaultColSpan">
                                <a-form-item label="用户名">
                                    <a-input v-decorator="searchConf.paramConf.nickName"/>
                                </a-form-item>
                            </a-col>
                            <a-col :span="searchConf.defaultColSpan">
                                <a-form-item label="邮箱">
                                    <a-input v-decorator="searchConf.paramConf.email"/>
                                </a-form-item>
                            </a-col>
                            <a-col :span="searchConf.defaultColSpan">
                                <a-form-item label="类型">
                                    <a-select showSearch allowClear
                                        placeholder="请选择"
                                        style="width: 180px"
                                        optionFilterProp="children"
                                        :options="searchConf.binding.userTypes"
                                        :filterOption="getFilterOption"
                                        v-decorator="searchConf.paramConf.userType"
                                    >
                                    </a-select>
                                </a-form-item>
                            </a-col>
                            <a-col :span="searchConf.defaultColSpan">
                                <a-form-item label="锁定状态">
                                    <a-select showSearch allowClear
                                              placeholder="请选择"
                                              style="width: 180px"
                                              optionFilterProp="children"
                                              :options="searchConf.binding.lockStates"
                                              :filterOption="getFilterOption"
                                              v-decorator="searchConf.paramConf.locked"
                                    >
                                    </a-select>
                                </a-form-item>
                            </a-col>
                        </a-row>
                        <a-row>
                            <a-col :span="24" :style="{ textAlign: 'right' }">
                                <a-button type="primary" html-type="submit" icon="search"
                                          :loading="searchConf.loadingFlag"
                                >
                                    搜索
                                </a-button>
                                <a-button :style="{ marginLeft: '8px' }" icon="close-square"
                                          @click="handleSearchFormReset">
                                    清空
                                </a-button>
                            </a-col>
                        </a-row>
                    </a-form>
                </div>
                <a-divider/>
            </div>
            <!-- 操作区域 -->
            <div>
                <a-row
                    :gutter="16"
                    justify="start"
                    type="flex"
                >
                    <a-col>
                        <a-button type="primary" icon="user-add"
                                  @click="handleAddUserAccountBtnClick">
                            新增
                        </a-button>
                    </a-col>
                    <a-col>
                        <a-button type="primary" icon="edit"
                                  @click="handleUpdateUserAccountBtnClick">
                            更新
                        </a-button>
                    </a-col>
                    <a-col>
                        <a-button type="danger" icon="user-delete"
                                  @click="handleEmployeeInfoBatchDeleteByIds">
                            删除
                        </a-button>
                    </a-col>
                    <a-col>
                        <a-button type="primary" icon="book"
                                  @click="handleUserGrantRoleById">
                            分配角色
                        </a-button>
                    </a-col>
                    <a-col>
                        <a-button type="primary" icon="book"
                                  @click="handleUserGrantJobById">
                            设置职务
                        </a-button>
                    </a-col>
                    <a-col>
                        <a-button icon="lock"
                            @click="handleEmployeeInfoBatchLockByIds(this,true)" >
                            锁定用户
                        </a-button>
                    </a-col>
                    <a-col>
                        <a-button icon="unlock"
                            @click="handleEmployeeInfoBatchLockByIds(this,false)">
                            解除锁定
                        </a-button>
                    </a-col>
                    <a-col>
                        <a-switch
                            checkedChildren="展示搜索"
                            unCheckedChildren="隐藏搜索"
                            size="large"
                            :style="{height:'30px'}"
                            v-model="searchConf.showListFlag"
                        ></a-switch>
                    </a-col>
                </a-row>
            </div>
        </div>
        <a-divider/>
        <div>
            <a-table
                :locale="{emptyText:'暂无数据'}"
                :pagination="tableConf.pagination"
                :rowKey="item => item.fid"
                :columns="tableConf.columns"
                :dataSource="tableConf.data"
                :loading="tableConf.loading"
                :rowSelection="rowSelection"
                @change="handleTableChange"
            >
                <span slot="userTypeStr" slot-scope="record">
                    <a-tag color="blue" :key="record.userTypeStr">
                        {{record.userTypeStr}}
                    </a-tag>
                </span>
                <span slot="locked" slot-scope="record">
                    <a-tag v-if="record.locked == 1" color="red" :key="record.fid">
                        已锁定
                    </a-tag>
                    <a-tag v-else-if="record.locked == 0" color="blue" :key="record.fid">
                        未锁定
                    </a-tag>
                </span>
                <template slot="action" slot-scope="text,record">
                    <span>
                        <a @click="handleEmployeeInfoDetailDrawerShow($event,record)">
                            详情
                        </a>
                        <a-divider type="vertical" />
                        <a-dropdown>
                              <a-menu slot="overlay" @click="handleTableActionGroupClick($event,record)">
                                    <a-menu-item key="recordDel">删除</a-menu-item>
                                    <a-menu-item v-if="record.locked == 0" key="recordLock">锁定</a-menu-item>
                                    <a-menu-item v-else-if="record.locked == 1" key="recordUnlock">解锁</a-menu-item>
                                    <a-menu-item key="grantRole">分配角色</a-menu-item>
                                    <a-menu-item key="grantJob">设置职务</a-menu-item>
                              </a-menu>
                              <a-button> 操作 <a-icon type="down" /> </a-button>
                        </a-dropdown>
                    </span>
                </template>
            </a-table>
        </div>
        <!-- 挂载弹窗、抽屉 等组件的dom -->
        <div>
            <employee-info-create-form-comp
                ref="employeeInfoCreateFormRef"
                :visible="dialogFormConf.visible"
                :formObj="dialogFormObj"
                :actionType="dialogFormConf.actionType"
                :userTypes="searchConf.binding.userTypes"
                @createFormCancel="handleEmployeeInfoCreateFormCancel"
                @createFormSubmit="handleEmployeeInfoCreateFormSubmit"
            />
            <user-grant-role-form-comp
                v-if="dialogGrantRoleConf.initFlag == true"
                :visible="dialogGrantRoleConf.visible"
                :userAccountId="dialogGrantRoleObj.userAccountId"
                :allItemArr="dialogGrantRoleObj.allDataSource"
                :checkArr="dialogGrantRoleObj.checkedIds"
                @grantRoleFormCancel="handleUserGrantRoleFormCancel"
                @grantRoleFormSubmit="handleUserGrantRoleFormSubmit"
            >
            </user-grant-role-form-comp>
            <user-grant-job-form-comp
                v-if="dialogGrantJobConf.initFlag == true"
                :visible="dialogGrantJobConf.visible"
                :userAccountId="dialogGrantJobObj.userAccountId"
                :allItemArr="dialogGrantJobObj.allDataSource"
                :checkArr="dialogGrantJobObj.checkedIds"
                @grantJobFormCancel="handleUserGrantJobFormCancel"
                @grantJobFormSubmit="handleUserGrantJobFormSubmit"
            >
            </user-grant-job-form-comp>
            <a-drawer
                    :title="drawerConf.detail.employeeInfo.title"
                    :closeable="drawerConf.detail.employeeInfo.closable"
                    :visible="drawerConf.detail.employeeInfo.visible"
                    :placement="drawerConf.detail.employeeInfo.placement"
                    :mask="drawerConf.detail.employeeInfo.mask"
                    :maskStyle="drawerConf.detail.employeeInfo.maskStyle"
                    :wrapStyle="drawerConf.detail.employeeInfo.wrapStyle"
                    :drawerStyle="drawerConf.detail.employeeInfo.drawerStyle"
                    :bodyStyle="drawerConf.detail.employeeInfo.bodyStyle"
                    :maskClosable="drawerConf.detail.employeeInfo.maskClosable"
                    @close="handleEmployeeInfoDetailDrawerClose"
            >
                <simple-detail-drawer-comp
                    :dataObj="drawerConf.detail.employeeInfo.dataObj"
                    :visible="drawerConf.detail.employeeInfo.visible"
                    :drawerFieldConf="drawerConf.detail.employeeInfo.drawerFieldConf"
                />
            </a-drawer>
        </div>
    </div>
</template>
<script>
    import jq from 'jquery';
    import {tableColumns,searchFormQueryConf} from './param_conf.js'
    import {EmployeeInfoDetailDrawerConf} from  './drawer_conf'
    import {EmpInfoApi} from './EmpInfoApi'
    import {UserCommonApis} from '~Apis/user/UserCommonApis.js'

    import EmployeeInfoCreateFormComp from '~Components/index/user/employee/info/EmployeeInfoCreateFormComp'
    import UserGrantRoleFormComp from '~Components/index/user/employee/info/UserGrantRoleFormComp';
    import UserGrantJobFormComp from '~Components/index/user/employee/info/UserGrantJobFormComp';
    import SimpleDetailDrawerComp from '~Components/index/common/drawer/SimpleDetailDrawerComp';

    import ACol from "ant-design-vue/es/grid/Col";
    import AFormItem from "ant-design-vue/es/form/FormItem";

    export default {
        name: "EmpInfoView",
        components: {
            SimpleDetailDrawerComp,
            UserGrantJobFormComp, UserGrantRoleFormComp, AFormItem, ACol, EmployeeInfoCreateFormComp},
        data() {
            return {
                searchConf: {
                    showListFlag:false,
                    loadingFlag: false,
                    defaultColSpan: 8,
                    paramConf: {
                        account: ["account", {rules: []}],
                        nickName: ["nickName", {rules: []}],
                        email: ["email", {rules: []}],
                        userType: ["userType", {rules: []}],
                        locked: ["locked", {rules: []}]
                    },
                    binding:{
                        userTypes:[],
                        lockStates:[]
                    }
                },
                searchForm: this.$form.createForm(this, {name: 'search_form'}),
                tableConf: {
                    data: [],
                    columns: tableColumns,
                    loading: false,
                    pagination: {
                        current:1,
                        pageSize:10,
                        pageSizeOptions:['10','20','50','100'],
                        showQuickJumper:false,
                        showSizeChanger:true,
                        total:0,
                        showTotal(total,range){
                            return `${range[0]}-${range[1]} of ${total} items` ;
                        }
                    },
                    filters:{},
                    sorter:{}
                },
                tableCheckIdList: [],
                dialogFormConf: {
                    visible: false,
                    actionType: "create"
                },
                dialogFormObj: {
                    nickName: '',
                    account: '',
                    email: '',
                    userType: '',
                    locked:'0'
                },
                dialogFormDefaultObj:{  //新建时的默认值设置
                    nickName: '',
                    account: '',
                    email: '',
                    userType: '',
                    locked:'0'
                },
                dialogGrantRoleConf:{
                    visible:false,
                    initFlag:false
                },
                dialogGrantRoleObj: {
                    userAccountId:'',
                    all:[],
                    allDataSource:[],
                    checked:[],
                    checkedIds:[],
                },
                dialogGrantJobConf:{
                    visible:false,
                    initFlag:false
                },
                dialogGrantJobObj: {
                    userAccountId:'',
                    all:[],
                    allDataSource:[],
                    checked:[],
                    checkedIds:[],
                },
                drawerConf:{
                    detail:{
                       employeeInfo:{
                           title:"用户定义详情",
                           closable:true,
                           visible:false,
                           placement:"right",
                           mask:true,
                           maskStyle:{
                               overFlowY:"auto"
                           },
                           wrapStyle:{
                               overFlowY:"auto"
                           },
                           drawerStyle:{
                               overFlowY:"auto"
                           },
                           bodyStyle:{
                               overFlowY:"auto"
                           },
                           maskClosable:true,  //点击蒙层是否关闭,
                           dataObj:{},
                           drawerFieldConf:EmployeeInfoDetailDrawerConf
                       },
                    },
                },
            }
        },
        methods: {
            dealChangeTableSearchLoadingState(loadingFlag){   //修改[表格搜索]是否在 加载状态中
                if(typeof loadingFlag == "undefined" || loadingFlag == null){
                    loadingFlag = false ;
                }
                this.searchConf.loadingFlag = loadingFlag;
                this.tableConf.loading = loadingFlag;
            },
            dealGetAllUserAccounts() {   //取得用户列表
                var _this = this ;
                _this.dealChangeTableSearchLoadingState(true);
                EmpInfoApi.getAllUserAccounts().then((res) => {
                    if (res) {
                        this.tableConf.data = res.resultList;
                        if(res.paginationBean){ //总个数
                            this.tableConf.pagination.total = res.paginationBean.total ;
                        }
                    }
                    _this.dealChangeTableSearchLoadingState(false);
                }).catch((e) =>{
                    _this.dealChangeTableSearchLoadingState(false);
                })
            },
            dealQueryUserAccounts(queryFieldArr,pagination,sorter) {    //带查询条件 检索用户列表
                var _this = this ;
                _this.dealChangeTableSearchLoadingState(true);
                EmpInfoApi.getAllUserAccounts(queryFieldArr,pagination,sorter).then((res) => {
                    if (res) {
                        this.tableConf.data = res.resultList;
                        if(res.paginationBean){ //总个数
                            this.tableConf.pagination.total = res.paginationBean.total ;
                        }
                        //清空 已勾选
                        _this.tableCheckIdList = [] ;
                    }
                    _this.dealChangeTableSearchLoadingState(false);
                }).catch((e) =>{
                    _this.dealChangeTableSearchLoadingState(false);
                })
            },
            dealBatchDelUserAccount() {  //批量删除
                var _this = this;
                var delIds = _this.tableCheckIdList;
                EmpInfoApi.batchDelUserAccount(delIds).then((res) => {
                    if (res) {
                        if (res.hasError == false) {  //已经有对错误进行预处理
                            this.$message.success(res.info);
                            _this.handleSearchFormQuery(); //表格重新搜索
                        }
                    }
                })
            },
            dealDelOneRowById(delId) {   //根据id 删除
                var _this = this;
                EmpInfoApi.delOneUserAccount(delId).then((res) => {
                    if (res) {
                        if (res.hasError == false) {  //已经有对错误进行预处理
                            _this.$message.success(res.info);
                            _this.handleSearchFormQuery(); //表格重新搜索
                        }
                    }
                })
            },
            dealBatchLockUserAccount(lockFlag) {  //批量锁定
                var _this = this;
                var delIds = _this.tableCheckIdList;
                EmpInfoApi.batchChangeLockStateUserAccount(delIds,lockFlag).then((res) => {
                    if (res) {
                        if (res.hasError == false) {  //已经有对错误进行预处理
                            this.$message.success(res.info);
                            _this.handleSearchFormQuery(); //表格重新搜索
                        }
                    }
                })
            },
            dealChangeLockOneRowById(delId,lockFlag) {   //根据id 锁定/解锁
                var _this = this;
                EmpInfoApi.lockStateChangeOneUserAccount(delId,lockFlag).then((res) => {
                    if (res) {
                        if (res.hasError == false) {  //已经有对错误进行预处理
                            _this.$message.success(res.info);
                            var tableDatas = _this.tableConf.data ;
                            var tableDatasTemp = [] ;
                            var lockedVal = lockFlag ? 1 : 0;
                            if(tableDatas && tableDatas.length > 0){
                                jq.each(tableDatas,function (idx,val) {
                                    if(val.fid == delId){   //修改锁定状态,
                                        val.locked = lockedVal
                                    }
                                    tableDatasTemp.push(val);
                                })
                            }
                            _this.tableConf.data = tableDatasTemp ;
                            //_this.handleSearchFormQuery(); //表格重新搜索
                        }
                    }
                })
            },
            dealGetSearchFormQueryConf(queryObj){   //取得查询基本配置
                var _this = this ;
                var queryFieldArr = [] ;
                if(queryObj) {
                    for (var key in queryObj){
                        var searchFieldObj = searchFormQueryConf[key];
                        if(searchFieldObj){
                            const queryVal = queryObj[key] ;
                            if(queryVal || queryVal == 0){
                                searchFieldObj['value'] = queryObj[key];
                                queryFieldArr.push(searchFieldObj);
                            }
                        }
                    }
                }
                return queryFieldArr ;
            },
            dealGetUserTypeEnumList(){  //取得 用户类型-枚举列表
                var _this = this ;
                UserCommonApis.getAllUserType().then((res) => {
                    if(res && res.hasError == false){
                        if(res.enumList){
                            _this.searchConf.binding.userTypes = res.enumList ;
                        }
                    }
                })
            },
            dealGetLockStateEnumList(){  //取得 用户锁定状态-枚举列表
                var _this = this ;
                UserCommonApis.getAllUserLockStateType().then((res) => {
                    if(res && res.hasError == false){
                        if(res.enumList){
                            _this.searchConf.binding.lockStates = res.enumList ;
                        }
                    }
                })
            },
            dealGetAllRoleList(){  //取得 所有的角色定义
                var _this = this ;
                return EmpInfoApi.getAllDefineRoles().then((res) => {
                    if(res && res.hasError == false){
                        if(res.resultList){
                            _this.dialogGrantRoleObj.all = res.resultList ;
                            _this.dealAllRoleItemToTransferDataSource(res.resultList);
                        }
                    }
                })
            },
            dealGetAllJobList(){  //取得 所有的职务定义
                var _this = this ;
                return EmpInfoApi.getAllDefineJobs().then((res) => {
                    if(res && res.hasError == false){
                        if(res.resultList){
                            _this.dialogGrantJobObj.all = res.resultList ;
                            _this.dealAllJobItemToTransferDataSource(res.resultList);
                        }
                    }
                })
            },
            dealAllRoleItemToTransferDataSource(allItemArr){    //role转化为 transfer可用的 数组对象
                var _this = this ;
                var dataSourceArrTemp = [] ;
                if(allItemArr && allItemArr.length > 0 ){
                    jq.each(allItemArr,function (idx,val) {
                        if(val){
                            dataSourceArrTemp.push({
                                key:_this.dealNullStrToEmpty(val.fid),
                                title:_this.dealNullStrToEmpty(val.name),
                                description:_this.dealNullStrToEmpty(val.remark),
                                disabled:false
                            })
                        }
                    })
                }
                _this.dialogGrantRoleObj.allDataSource = dataSourceArrTemp ;
            },
            dealAllJobItemToTransferDataSource(allItemArr){    //job转化为 transfer可用的 数组对象
                var _this = this ;
                var dataSourceArrTemp = [] ;
                if(allItemArr && allItemArr.length > 0 ){
                    jq.each(allItemArr,function (idx,val) {
                        if(val){
                            dataSourceArrTemp.push({
                                key:_this.dealNullStrToEmpty(val.fid),
                                title:_this.dealNullStrToEmpty(val.name),
                                description:_this.dealNullStrToEmpty(val.remark),
                                disabled:false
                            })
                        }
                    })
                }
                _this.dialogGrantJobObj.allDataSource = dataSourceArrTemp ;
            },
            dealNullStrToEmpty(str,repStr){ //如果遇到 Undefine或者null，替换为repStr
                if(typeof str == "undefined" || str == null){
                    if(typeof repStr != "undefined" && repStr == null){
                        return repStr ;
                    }   else {
                        return "";
                    }
                }   else {
                    return str;
                }
            },
            dealUserGrantRolesById(selectRowId){        //授权页面弹窗-封装方法
                var _this = this ;
                if(_this.dialogGrantRoleConf.initFlag == false){  //第一次进行分配角色时进行 所有角色 的数据加载
                    _this.dealGetAllRoleList().then(()=>{
                        _this.dialogGrantRoleConf.initFlag = true ;
                    }) ;
                }
                _this.dialogGrantRoleObj.userAccountId = selectRowId ;
                if (selectRowId) {
                    EmpInfoApi.getAllRoleByUserAccountId(selectRowId).then((res) => {
                        if(res){
                            _this.dialogGrantRoleObj.checked = res.resultList;
                            var checkIdListTemp = [] ;
                            if(res.resultList && res.resultList.length > 0){
                                jq.each(res.resultList,function (idx,val) {
                                    checkIdListTemp.push(val.fid);
                                })
                            }
                            _this.dialogGrantRoleObj.checkedIds = checkIdListTemp;
                            _this.dialogGrantRoleConf.visible = true;   //显示弹窗
                        }
                    })
                } else {
                    this.$message.warning('操作失败！未取得有效的角色id！');
                }
            },
            dealUserGrantJobsById(selectRowId){        //设置职务页面弹窗-封装方法
                var _this = this ;
                if(_this.dialogGrantJobConf.initFlag == false){  //第一次进行设置职务时进行 所有职务 的数据加载
                    _this.dealGetAllJobList().then(()=>{
                        _this.dialogGrantJobConf.initFlag = true ;
                    }) ;
                }
                _this.dialogGrantJobObj.userAccountId = selectRowId ;
                if (selectRowId) {
                    EmpInfoApi.getAllJobByUserAccountId(selectRowId).then((res) => {
                        if(res){
                            _this.dialogGrantJobObj.checked = res.resultList;
                            var checkIdListTemp = [] ;
                            if(res.resultList && res.resultList.length > 0){
                                jq.each(res.resultList,function (idx,val) {
                                    checkIdListTemp.push(val.fid);
                                })
                            }
                            _this.dialogGrantJobObj.checkedIds = checkIdListTemp;
                            _this.dialogGrantJobConf.visible = true;   //显示弹窗
                        }
                    })
                } else {
                    this.$message.warning('操作失败！未取得有效的职务id！');
                }
            },
            handleSearchFormQuery(e) {   //表格-搜索
                if (e) {
                    e.preventDefault();
                }
                var _this = this;
                var paginationTemp = _this.tableConf.pagination ;
                var sorterTemp = _this.tableConf.sorter ;
                this.searchForm.validateFields((err, values) => {
                    if (!err) {
                        //取得 bean 形式 的查询条件数组
                        var searchFieldArr = _this.dealGetSearchFormQueryConf(values);
                        _this.dealQueryUserAccounts(searchFieldArr,paginationTemp,sorterTemp);
                    }
                });
            },
            handleTableActionGroupClick(e,record){  //表格-更多操作：按key区分操作类型
                var _this = this ;
                if(e.key == "recordDel"){   //行删除
                    _this.handleDeleteOneById(record.fid);
                }   else if(e.key == "recordLock"){ //行锁定
                    _this.handleChangeLockOneById(record.fid,true);
                }   else if(e.key == "recordUnlock"){   //行解锁
                    _this.handleChangeLockOneById(record.fid,false);
                }   else if(e.key == "grantRole"){  //分配角色
                    _this.dealUserGrantRolesById(record.fid);
                }   else if(e.key == "grantJob"){  //设置职务
                    _this.dealUserGrantJobsById(record.fid);
                }
                //console.log('handleTableActionGroupClick', e);
                //console.log(record);
            },
            handleSearchFormReset() {    //重置 搜索列表 的值
                this.searchForm.resetFields();
            },
            handleTableChange(pagination, filters, sorter) {    //表格变动-页码跳转/排序/筛选
                this.tableConf.pagination = pagination ;
                this.tableConf.filters = filters ;
                this.tableConf.sorter = sorter ;
                this.handleSearchFormQuery();
            },
            handleAddUserAccountBtnClick() {     //新增用户按钮-点击
                var _this = this;
                _this.dialogFormConf.visible = true;   //显示弹窗
                _this.dialogFormConf.actionType = "create";
                _this.dialogFormObj = _this.dialogFormDefaultObj;
            },
            handleUpdateUserAccountBtnClick() {  //更新用户按钮-点击
                var _this = this;
                if (_this.tableCheckIdList.length < 1) {
                    this.$message.warning('请选择一行要更新的数据！');
                } else if (_this.tableCheckIdList.length > 1) {
                    this.$message.warning('请选择至多一行要更新的数据！');
                } else {
                    var selectRowId = _this.tableCheckIdList[0];
                    if (selectRowId) {
                        EmpInfoApi.getUserAccountById(selectRowId).then((res) => {
                            var selectUserBean = res.bean;
                            if (selectUserBean) {
                                _this.dialogFormConf.visible = true;   //显示弹窗
                                _this.dialogFormConf.actionType = "update";
                                _this.dialogFormObj = selectUserBean;
                                //console.log(_this.dialogFormObj);
                            }
                        })
                    } else {
                        this.$message.warning('操作失败！未取得有效的用户id！');
                    }
                }
            },
            handleEmployeeInfoCreateFormCancel(e) {  // 创建/更新 用户表单->取消
                var _this = this;
                _this.dialogFormConf.visible = false;
            },
            handleEmployeeInfoCreateFormSubmit(e,avatarUrl) {   // 创建/更新 用户表单->提交
                var _this = this;
                const dialogFormObj = _this.dealGetDialogRefFormObj();
                dialogFormObj.validateFields((err, values) => {
                    if (err) {
                        return;
                    }
                    var closeDialogFlag = true;
                    if (_this.dialogFormConf.actionType == "create") {        //新建-提交
                        EmpInfoApi.addUserAccountByForm(values,avatarUrl).then((res) => {
                            if (res) {
                                if (res.hasError == false) {  //异常已经有预处理了
                                    this.$message.success(res.info);
                                    _this.handleSearchFormQuery(); //表格重新搜索
                                } else {
                                    closeDialogFlag = false;
                                }
                            } else {
                                closeDialogFlag = false;
                            }
                            if (closeDialogFlag == true) {    //关闭弹窗
                                dialogFormObj.resetFields();
                                _this.dialogFormConf.visible = false;
                            }
                        })
                    } else if (_this.dialogFormConf.actionType == "update") {   //更新-提交
                        values['fid'] = _this.dialogFormObj.fid;   //提交时，回填fid值
                        EmpInfoApi.updateUserAccountByForm(values,avatarUrl).then((res) => {
                            if (res) {
                                if (res.hasError == false) {  //异常已经有预处理了
                                    this.$message.success(res.info);
                                    _this.handleSearchFormQuery(); //表格重新搜索
                                } else {
                                    closeDialogFlag = false;
                                }
                            } else {
                                closeDialogFlag = false;
                            }
                            if (closeDialogFlag == true) {    //关闭弹窗
                                dialogFormObj.resetFields();
                                _this.dialogFormConf.visible = false;
                            }
                        })
                    }

                });

            },
            handleEmployeeInfoBatchDeleteByIds(e) {  // 批量删除
                var _this = this;
                var selectDelIds = _this.tableCheckIdList;
                if (selectDelIds.length < 1) {
                    _this.$message.warning("请选择至少一条要删除的数据！");
                } else {
                    _this.$confirm({
                        content: '是否确认删除所选的' + selectDelIds.length + "条数据？",
                        okText: '确认',
                        cancelText: '取消',
                        onOk() {
                            _this.dealBatchDelUserAccount();
                        },
                        onCancel() {
                            _this.$message.info("操作：取消删除");
                        }
                    })
                }
            },
            handleDeleteOneById(delId) {     //删除指定行
                var _this = this;
                if (delId) {
                    _this.$confirm({
                        content: '是否确认删除所选行？',
                        okText: '确认',
                        cancelText: '取消',
                        onOk() {
                            _this.dealDelOneRowById(delId);
                        },
                        onCancel() {
                            _this.$message.info("操作：取消删除");
                        }
                    })
                } else {
                    _this.$message.warning("无效删除操作！");
                }
            },
            handleEmployeeInfoBatchLockByIds(e,lockFlag) {  // 批量锁定
                var _this = this;
                var selectDelIds = _this.tableCheckIdList;
                if (selectDelIds.length < 1) {
                    _this.$message.warning("请选择至少一条要锁定的用户！");
                } else {
                    _this.$confirm({
                        content: '是否确认锁定所选的' + selectDelIds.length + "个用户？",
                        okText: '确认',
                        cancelText: '取消',
                        onOk() {
                            _this.dealBatchLockUserAccount(lockFlag);
                        },
                        onCancel() {
                            _this.$message.info("操作：取消锁定");
                        }
                    })
                }
            },
            handleChangeLockOneById(delId,lockFlag) {     //删除指定行
                var _this = this;
                if (delId) {
                    _this.$confirm({
                        content: '是否确认锁定所选用户？',
                        okText: '确认',
                        cancelText: '取消',
                        onOk() {
                            _this.dealChangeLockOneRowById(delId,lockFlag);
                        },
                        onCancel() {
                            _this.$message.info("操作：取消锁定");
                        }
                    })
                } else {
                    _this.$message.warning("无效锁定操作！");
                }
            },
            dealGetDialogRefFormObj() {    //返回 弹窗表单 的form对象
                return this.$refs.employeeInfoCreateFormRef.employeeInfoCreateForm;
            },
            getFilterOption(input,option){
                return (option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0);
            },
            handleUserGrantRoleById(e) {     // 用户分配角色
                var _this = this;
                if (_this.tableCheckIdList.length < 1) {
                    this.$message.warning('请选择一行要分配角色的数据！');
                } else if (_this.tableCheckIdList.length > 1) {
                    this.$message.warning('请选择至多一行要分配角色的数据！');
                } else {
                    var selectRowId = _this.tableCheckIdList[0];
                    //封装方法 处理
                    _this.dealUserGrantRolesById(selectRowId);
                }
            },
            handleUserGrantRoleFormCancel(e) {  // 用户分配角色表单->取消
                var _this = this;
                _this.dialogGrantRoleConf.visible = false;
            },
            handleUserGrantRoleFormSubmit(e,userAccountId,targetIdList) {   // 用户分配角色->提交
                var _this = this;
                EmpInfoApi.grantRoleToUser(userAccountId,targetIdList).then((res) =>{
                    var closeDialogFlag = true ;
                    if (res) {
                        if (res.hasError == false) {  //异常已经有预处理了
                            this.$message.success(res.info);
                        } else {
                            closeDialogFlag = false;
                        }
                    } else {
                        closeDialogFlag = false;
                    }
                    if (closeDialogFlag == true) {    //关闭弹窗
                        _this.dialogGrantRoleConf.visible = false;
                    }
                });
            },
            handleUserGrantJobById(e) {     // 用户设置职务
                var _this = this;
                if (_this.tableCheckIdList.length < 1) {
                    this.$message.warning('请选择一行要设置职务的数据！');
                } else if (_this.tableCheckIdList.length > 1) {
                    this.$message.warning('请选择至多一行要设置职务的数据！');
                } else {
                    var selectRowId = _this.tableCheckIdList[0];
                    //封装方法 处理
                    _this.dealUserGrantJobsById(selectRowId);
                }
            },
            handleUserGrantJobFormCancel(e) {  // 用户设置职务表单->取消
                var _this = this;
                _this.dialogGrantJobConf.visible = false;
            },
            handleUserGrantJobFormSubmit(e,userAccountId,targetIdList) {   // 用户设置职务->提交
                var _this = this;
                EmpInfoApi.grantJobToUser(userAccountId,targetIdList).then((res) =>{
                    var closeDialogFlag = true ;
                    if (res) {
                        if (res.hasError == false) {  //异常已经有预处理了
                            this.$message.success(res.info);
                        } else {
                            closeDialogFlag = false;
                        }
                    } else {
                        closeDialogFlag = false;
                    }
                    if (closeDialogFlag == true) {    //关闭弹窗
                        _this.dialogGrantJobConf.visible = false;
                    }
                });
            },
            handleEmployeeInfoDetailDrawerShow(e,record){   //Drawer-用户定义 详情展示
                if(typeof record != "undefined"){
                    this.drawerConf.detail.employeeInfo.dataObj = record ;
                    this.drawerConf.detail.employeeInfo.visible = true ;
                }   else {
                    this.$message.error("打开无效的行详情！");
                }
            },
            handleEmployeeInfoDetailDrawerClose(e){ //Drawer-用户定义 详情关闭
                this.drawerConf.detail.employeeInfo.visible = false ;
            }
        },
        computed: {
            rowSelection() {    //行选择
                return {
                    selectedRowKeys: this.tableCheckIdList,
                    onChange: (selectedRowKeys, selectedRows) => {  //勾选 修改事件
                        this.tableCheckIdList = selectedRowKeys;
                    },
                    getCheckboxProps: record => ({  //选择框的默认属性配置
                        props: {},
                    }),
                };
            },
        },
        created(){
            this.dealGetAllUserAccounts();
            this.dealGetUserTypeEnumList();
            this.dealGetLockStateEnumList();
        },
        destroyed(){
            console.log("员工信息-页面销毁 ...");
        }

    }
</script>

<style scoped>

</style>
