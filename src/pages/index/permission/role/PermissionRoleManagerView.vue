<template>
    <div>
        <div>
            <!-- 复合搜索-区域 -->
            <div v-show="searchConf.showListFlag">
                <div>
                    <a-form layout="inline"
                            :form="searchForm"
                            @submit="handleSearchFormQuery"
                    >
                        <a-row :gutter="6">
                            <a-col :span="searchConf.defaultColSpan">
                                <a-form-item label="权限名">
                                    <a-input v-decorator="searchConf.paramConf.name"/>
                                </a-form-item>
                            </a-col>
                            <a-col :span="searchConf.defaultColSpan">
                                <a-form-item label="编码">
                                    <a-input v-decorator="searchConf.paramConf.code"/>
                                </a-form-item>
                            </a-col>
                            <a-col :span="searchConf.defaultColSpan">
                                <a-form-item label="类型">
                                    <a-select showSearch allowClear
                                              placeholder="请选择"
                                              style="width: 180px"
                                              optionFilterProp="children"
                                              :options="searchConf.binding.role.types"
                                              :filterOption="getRoleTypeFilterOption"
                                              v-decorator="searchConf.paramConf.type"
                                    >
                                    </a-select>
                                </a-form-item>
                            </a-col>
                            <a-col :span="searchConf.defaultColSpan">
                                <a-form-item label="备注">
                                    <a-input v-decorator="searchConf.paramConf.remark"/>
                                </a-form-item>
                            </a-col>
                        </a-row>
                        <a-row>
                            <a-col :span="24" :style="{ textAlign: 'right' }">
                                <a-button type="primary" html-type="submit" icon="search"
                                          :loading="searchConf.loadingFlag"
                                >
                                    {{$t('langMap.button.actions.query')}}
                                </a-button>
                                <a-button :style="{ marginLeft: '8px' }" icon="close-square"
                                          @click="handleSearchFormReset">
                                    {{$t('langMap.button.actions.reset')}}
                                </a-button>
                            </a-col>
                        </a-row>
                    </a-form>
                </div>
                <a-divider/>
            </div>
            <!-- 操作按钮-区域-->
            <div>
                <a-row
                    :gutter="6"
                    justify="start"
                    type="flex"
                >
                    <a-col>
                        <a-button type="primary" icon="plus"
                                  @click="handleAddDefineRoleBtnClick">
                            新增
                        </a-button>
                    </a-col>
                    <a-col>
                        <a-button type="primary" icon="edit"
                                  @click="handleUpdateDefineRoleBtnClick">
                            更新
                        </a-button>
                    </a-col>
                    <a-col>
                        <a-button type="danger" icon="delete"
                                  @click="handleDefineRoleBatchDeleteByIds">
                            删除
                        </a-button>
                    </a-col>
                    <a-col>
                        <a-button type="primary" icon="book"
                                  @click="handleDefineRoleGrantPermissionsById">
                            分配权限
                        </a-button>
                    </a-col>
                    <a-col>
                        <a-button type="primary" icon="book"
                                  @click="handleDefineRoleGrantMenusById">
                            授权菜单
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
                    <span slot="typeStr" slot-scope="record">
                        <a-tag color="blue" :key="record.typeStr">
                            {{record.typeStr}}
                        </a-tag>
                    </span>

                    <template slot="action" slot-scope="text,record">
                        <span>
                            <a @click="handleDefineRoleDetailDrawerShow($event,record)">
                                详情
                            </a>
                            <a-divider type="vertical" />
                            <a-dropdown>
                                  <a-menu slot="overlay" @click="handleTableActionGroupClick($event,record)">
                                        <a-menu-item key="recordDel">删除</a-menu-item>
                                        <a-menu-item key="grantPermission">授权</a-menu-item>
                                  </a-menu>
                                  <a-button> 操作 <a-icon type="down" /> </a-button>
                            </a-dropdown>
                        </span>
                </template>
                </a-table>
            </div>
        </div>
        <!-- 弹窗dom-区域 -->
        <div>
            <define-role-create-form-comp
                ref="defineRoleCreateFormRef"
                :visible="dialogFormConf.visible"
                :formObj="dialogFormObj"
                :actionType="dialogFormConf.actionType"
                :roleTypes="searchConf.binding.role.types"
                @createFormCancel="handleDefineRoleCreateFormCancel"
                @createFormSubmit="handleDefineRoleCreateFormSubmit"
            >
            </define-role-create-form-comp>
            <role-grant-permission-form-comp
                v-if="dialogGrantPermissionConf.initFlag == true"
                :visible="dialogGrantPermissionConf.visible"
                :roleId="dialogGrantPermissionObj.roleId"
                :allItemArr="dialogGrantPermissionObj.allDataSource"
                :checkArr="dialogGrantPermissionObj.checkedIds"
                @grantPermissionFormCancel="handleRoleGrantPermissionFormCancel"
                @grantPermissionFormSubmit="handleRoleGrantPermissionFormSubmit"
            >
            </role-grant-permission-form-comp>
            <role-grant-menus-form-comp
                v-if="dialogGrantMenusConf.initFlag == true"
                :visible="dialogGrantMenusConf.visible"
                :roleId="dialogGrantMenusObj.roleId"
                :treeData="dialogGrantMenusObj.treeData"
                :checkArr="dialogGrantMenusObj.checkedIds"
                @grantMenusFormCancel="handleRoleGrantMenusFormCancel"
                @grantMenusFormSubmit="handleRoleGrantMenusFormSubmit"
            >
            </role-grant-menus-form-comp>
            <a-drawer
                :title="drawerConf.detail.defineRole.title"
                :closeable="drawerConf.detail.defineRole.closable"
                :visible="drawerConf.detail.defineRole.visible"
                :placement="drawerConf.detail.defineRole.placement"
                :mask="drawerConf.detail.defineRole.mask"
                :maskStyle="drawerConf.detail.defineRole.maskStyle"
                :wrapStyle="drawerConf.detail.defineRole.wrapStyle"
                :drawerStyle="drawerConf.detail.defineRole.drawerStyle"
                :bodyStyle="drawerConf.detail.defineRole.bodyStyle"
                :maskClosable="drawerConf.detail.defineRole.maskClosable"
                @close="handleDefineRoleDetailDrawerClose"
            >
                <simple-detail-drawer-comp
                    :dataObj="drawerConf.detail.defineRole.dataObj"
                    :visible="drawerConf.detail.defineRole.visible"
                    :drawerFieldConf="drawerConf.detail.defineRole.drawerFieldConf"
                />
            </a-drawer>
        </div>
    </div>
</template>

<script>
    import {tableColumns,searchFormQueryConf} from './param_conf.js';
    import {DefineRoleDetailDrawerConf} from './drawer_conf.js'
    import {PermissionRoleManagerApi} from './permissionRoleManagerApi.js'
    import {PermissionCommonApis} from '~Apis/permission/PermissionCommonApis.js'

    import DefineRoleCreateFormComp from '~Components/index/define/permission/role/DefineRoleCreateFormComp';
    import RoleGrantPermissionFormComp from '~Components/index/define/permission/role/RoleGrantPermissionFormComp';
    import RoleGrantMenusFormComp from '~Components/index/define/permission/role/RoleGrantMenusFormComp';
    import SimpleDetailDrawerComp from '~Components/index/common/drawer/SimpleDetailDrawerComp';
    export default {
        name: "PermissionRoleManagerView",
        components: {RoleGrantPermissionFormComp, DefineRoleCreateFormComp,SimpleDetailDrawerComp,RoleGrantMenusFormComp},
        data(){
            return {
                searchConf:{
                    showListFlag:false,
                    loadingFlag:false,
                    defaultColSpan: 8,
                    paramConf: {
                        name: ["name", {rules: []}],
                        code: ["code", {rules: []}],
                        type: ["type", {rules: []}],
                        remark:["remark",{rules: []}]
                    },
                    binding:{
                        role:{
                            types:[]
                        }
                    }
                },
                searchForm:this.$form.createForm(this,{name:'search_form'}),
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
                    name: '',
                    code: '',
                    type: ''
                },
                dialogGrantPermissionConf:{
                    visible:false,
                    initFlag:false
                },
                dialogGrantPermissionObj: {
                    roleId:'',
                    all:[],
                    allDataSource:[],
                    checked:[],
                    checkedIds:[],
                },
                dialogGrantMenusConf:{
                    visible:false,
                    initFlag:false
                },
                dialogGrantMenusObj: {
                    roleId:'',
                    treeData:[],
                    checked:[],
                    checkedIds:[],
                },
                drawerConf:{
                    detail:{
                        defineRole:{
                            title:"租户信息详情",
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
                            drawerFieldConf:DefineRoleDetailDrawerConf
                        },
                    },
                },
            }
        },
        methods:{
            getRoleTypeFilterOption(input,option){
                return (option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0);
            },
            dealChangeTableSearchLoadingState(loadingFlag){   //修改[表格搜索]是否在 加载状态中
                if(typeof loadingFlag == "undefined" || loadingFlag == null){
                    loadingFlag = false ;
                }
                this.searchConf.loadingFlag = loadingFlag;
                this.tableConf.loading = loadingFlag;
            },
            dealGetRoleTypeEnumList(){  //取得 用户类型-枚举列表
                var _this = this ;
                PermissionCommonApis.getAllRoleTypes().then((res) => {
                    if(res && res.success){
                        if(res.enumList){
                            _this.searchConf.binding.role.types = res.enumList ;
                        }
                    }
                })
            },
            dealGetAllPermissionList(){  //取得 所有的权限定义
                var _this = this ;
                return PermissionRoleManagerApi.getAllDefinePermissions().then((res) => {
                    if(res && res.success){
                        if(res.gridList){
                            _this.dialogGrantPermissionObj.all = res.gridList ;
                            _this.dealAllItemToTransferDataSource(res.gridList);
                        }
                    }
                })
            },
            dealGetAllMenuTreeList(){  //取得 所有的[菜单定义]Tree
                var _this = this ;
                return PermissionRoleManagerApi.getAllDefineMenuTree().then((res) => {
                    if(res && res.success){
                        if(res.gridList){
                            _this.dialogGrantMenusObj.treeData = res.gridList ;
                        }
                    }
                })
            },
            dealAllItemToTransferDataSource(allItemArr){    //转化为 transfer可用的 数组对象
                var _this = this ;
                var dataSourceArrTemp = [] ;
                if(allItemArr && allItemArr.length > 0 ){
                    jquery.each(allItemArr,function (idx,val) {
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
                _this.dialogGrantPermissionObj.allDataSource = dataSourceArrTemp ;
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
            dealGetDialogRefFormObj() {    //返回 弹窗表单 的form对象
                return this.$refs.defineRoleCreateFormRef.defineRoleCreateForm;
            },
            dealGetAllDefineRoles() {   //取得角色列表
                var _this = this ;
                _this.dealChangeTableSearchLoadingState(true);
                PermissionRoleManagerApi.getAllDefineRoles().then((res) => {
                    if (res) {
                        this.tableConf.data = res.gridList;
                        if(res.paginationBean){ //总个数
                            this.tableConf.pagination.total = res.paginationBean.total ;
                        }
                    }
                    _this.dealChangeTableSearchLoadingState(false);
                }).catch((e) =>{
                    _this.dealChangeTableSearchLoadingState(false);
                })
            },
            dealQueryDefineRoles(queryFieldList,pagination,sorter) {    //带查询条件 检索角色列表
                var _this = this ;
                _this.dealChangeTableSearchLoadingState(true);
                PermissionRoleManagerApi.getAllDefineRoles(queryFieldList,pagination,sorter).then((res) => {
                    if (res) {
                        this.tableConf.data = res.gridList;
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
            dealBatchDelDefineRole() {  //批量删除
                var _this = this;
                var delIds = _this.tableCheckIdList;
                PermissionRoleManagerApi.batchDelDefineRole(delIds).then((res) => {
                    if (res) {
                        if (res.success) {  //已经有对错误进行预处理
                            this.$message.success(res.msg);
                            _this.handleSearchFormQuery(); //表格重新搜索
                        }
                    }
                })
            },
            dealDelOneRowById(delId) {   //根据id 删除
                var _this = this;
                PermissionRoleManagerApi.delOneDefineRole(delId).then((res) => {
                    if (res) {
                        if (res.success) {  //已经有对错误进行预处理
                            _this.$message.success(res.msg);
                            _this.handleSearchFormQuery(); //表格重新搜索
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
            dealDefineRoleGrantPermissionsById(selectRowId){        //授权页面弹窗-封装方法
                var _this = this ;
                if(_this.dialogGrantPermissionConf.initFlag == false){  //第一次进行分配权限时进行 所有权限 的数据加载
                    _this.dealGetAllPermissionList().then(()=>{
                        _this.dialogGrantPermissionConf.initFlag = true ;
                    }) ;
                }
                _this.dialogGrantPermissionObj.roleId = selectRowId ;
                if (selectRowId) {
                    PermissionRoleManagerApi.getAllPermissionByRoleId(selectRowId).then((res) => {
                        if(res){
                            _this.dialogGrantPermissionObj.checked = res.gridList;
                            var checkIdListTemp = [] ;
                            if(res.gridList && res.gridList.length > 0){
                                jquery.each(res.gridList,function (idx,val) {
                                    checkIdListTemp.push(val.fid);
                                })
                            }
                            _this.dialogGrantPermissionObj.checkedIds = checkIdListTemp;
                            _this.dialogGrantPermissionConf.visible = true;   //显示弹窗
                        }
                    })
                }   else {
                    this.$message.warning('操作失败！未取得有效的角色id！');
                }
            },
            dealDefineRoleGrantMenusById(selectRowId){        //[授权菜单]页面弹窗-封装方法
                var _this = this ;
                if(_this.dialogGrantMenusConf.initFlag == false){  //第一次进行[菜单授权]时进行 所有[菜单定义] 的数据加载
                    this.dealGetAllMenuTreeList().then(() => {
                        _this.dialogGrantMenusConf.initFlag = true ;
                    })
                }
                _this.dialogGrantMenusObj.roleId = selectRowId ;
                if (selectRowId) {
                    PermissionRoleManagerApi.getAllMenuByRoleId(selectRowId).then((res) => {
                        if(res){
                            _this.dialogGrantMenusObj.checked = res.gridList;
                            var checkIdListTemp = [] ;
                            if(res.gridList && res.gridList.length > 0){
                                jquery.each(res.gridList,function (idx,val) {
                                    checkIdListTemp.push(val.fid);
                                })
                            }
                            _this.dialogGrantMenusObj.checkedIds = checkIdListTemp;
                            _this.dialogGrantMenusConf.visible = true;   //显示弹窗
                        }
                    })
                }   else {
                    this.$message.warning('操作失败！未取得有效的角色id！');
                }
            },
            handleSearchFormQuery(e) {
                var _this = this ;
                if (e) {
                    e.preventDefault();
                }
                var paginationTemp = _this.tableConf.pagination ;
                var sorterTemp = _this.tableConf.sorter ;
                this.searchForm.validateFields((err, values) => {
                    if (!err) {
                        //取得 bean 形式 的查询条件数组
                        var searchFieldArr = _this.dealGetSearchFormQueryConf(values);
                        _this.dealQueryDefineRoles(searchFieldArr,paginationTemp,sorterTemp);
                    }
                });
            },
            handleSearchFormReset() {    //重置 搜索列表 的值
                this.searchForm.resetFields();
            },
            handleAddDefineRoleBtnClick() {     //新增权限按钮-点击
                var _this = this;
                _this.dialogFormConf.visible = true;   //显示弹窗
                _this.dialogFormConf.actionType = "create";
                _this.dialogFormObj = {};
            },
            handleUpdateDefineRoleBtnClick() {  //更新权限按钮-点击
                var _this = this;
                if (_this.tableCheckIdList.length < 1) {
                    this.$message.warning('请选择一行要更新的数据！');
                } else if (_this.tableCheckIdList.length > 1) {
                    this.$message.warning('请选择至多一行要更新的数据！');
                } else {
                    var selectRowId = _this.tableCheckIdList[0];
                    if (selectRowId) {
                        PermissionRoleManagerApi.getDefineRoleById(selectRowId).then((res) => {
                            var selectUserBean = res.bean;
                            if (selectUserBean) {
                                _this.dialogFormConf.visible = true;   //显示弹窗
                                _this.dialogFormConf.actionType = "update";
                                _this.dialogFormObj = selectUserBean;
                                //console.log(_this.dialogFormObj);
                            }
                        })
                    } else {
                        this.$message.warning('操作失败！未取得有效的权限id！');
                    }
                }
            },
            handleDefineRoleBatchDeleteByIds(e) {     // 批量删除
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
                            _this.dealBatchDelDefineRole();
                        },
                        onCancel() {
                            _this.$message.info("操作：取消删除");
                        }
                    })
                }
            },
            handleDefineRoleGrantPermissionsById(e) {     // 分配权限
                var _this = this;
                if (_this.tableCheckIdList.length < 1) {
                    this.$message.warning('请选择一行要分配权限的角色！');
                } else if (_this.tableCheckIdList.length > 1) {
                    this.$message.warning('请选择至多一行要分配权限的角色！');
                } else {
                    var selectRowId = _this.tableCheckIdList[0];
                    //封装方法 处理
                    _this.dealDefineRoleGrantPermissionsById(selectRowId);
                }
            },
            handleDefineRoleGrantMenusById(e) {     // [授权菜单]
                var _this = this;
                if (_this.tableCheckIdList.length < 1) {
                    this.$message.warning('请选择一行要授权菜单的角色！');
                } else if (_this.tableCheckIdList.length > 1) {
                    this.$message.warning('请选择至多一行要授权菜单的角色！');
                } else {
                    var selectRowId = _this.tableCheckIdList[0];
                    //封装方法 处理
                    _this.dealDefineRoleGrantMenusById(selectRowId);
                }
            },
            handleDefineRoleCreateFormCancel(e) {  // 创建/更新 权限定义表单->取消
                var _this = this;
                _this.dialogFormConf.visible = false;
            },
            handleDefineRoleCreateFormSubmit(e) {   // 创建/更新 权限表单->提交
                var _this = this;
                const dialogFormObj = _this.dealGetDialogRefFormObj();
                dialogFormObj.validateFields((err, values) => {
                    if (err) {
                        return;
                    }
                    var closeDialogFlag = true;
                    if (_this.dialogFormConf.actionType == "create") {        //新建-提交
                        PermissionRoleManagerApi.addDefineRoleByForm(values).then((res) => {
                            if (res) {
                                if (res.success) {  //异常已经有预处理了
                                    this.$message.success(res.msg);
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
                        PermissionRoleManagerApi.updateDefineRoleByForm(values).then((res) => {
                            if (res) {
                                if (res.success) {  //异常已经有预处理了
                                    this.$message.success(res.msg);
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
            handleRoleGrantPermissionFormCancel(e) {  // 角色授权表单->取消
                var _this = this;
                _this.dialogGrantPermissionConf.visible = false;
            },
            handleRoleGrantPermissionFormSubmit(e,roleId,targetIdList) {   // 角色授权->提交
                var _this = this;
                PermissionRoleManagerApi.grantPermissionToRole(roleId,targetIdList).then((res) =>{
                    var closeDialogFlag = true ;
                    if (res) {
                        if (res.success) {  //异常已经有预处理了
                            this.$message.success(res.msg);
                        } else {
                            closeDialogFlag = false;
                        }
                    } else {
                        closeDialogFlag = false;
                    }
                    if (closeDialogFlag == true) {    //关闭弹窗
                        _this.dialogGrantPermissionConf.visible = false;
                    }
                });
            },
            handleRoleGrantMenusFormCancel(e) {  // [授权菜单]表单->取消
                var _this = this;
                _this.dialogGrantMenusConf.visible = false;
            },
            handleRoleGrantMenusFormSubmit(e,roleId,checkIds,halfCheckIds) {   // [授权菜单]表单->提交
                var _this = this;
                PermissionRoleManagerApi.grantMenusToRole(roleId,checkIds,halfCheckIds).then((res) =>{
                    var closeDialogFlag = true ;
                    if (res) {
                        if (res.success) {  //异常已经有预处理了
                            this.$message.success(res.msg);
                        } else {
                            closeDialogFlag = false;
                        }
                    } else {
                        closeDialogFlag = false;
                    }
                    if (closeDialogFlag == true) {    //关闭弹窗
                        _this.dialogGrantMenusConf.visible = false;
                    }
                });
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
            handleTableChange(pagination, filters, sorter) {    //表格变动-页码跳转/排序/筛选
                this.tableConf.pagination = pagination ;
                this.tableConf.filters = filters ;
                this.tableConf.sorter = sorter ;
                this.handleSearchFormQuery();
            },
            handleTableActionGroupClick(e,record){  //表格-更多操作：按key区分操作类型
                var _this = this ;
                if(e.key == "recordDel"){   //行删除
                    _this.handleDeleteOneById(record.fid);
                }   else if(e.key == "grantPermission"){ //行锁定
                    _this.dealDefineRoleGrantPermissionsById(record.fid);
                }
            },
            handleDefineRoleDetailDrawerShow(e,record){   //Drawer-角色定义 详情展示
                if(typeof record != "undefined"){
                    this.drawerConf.detail.defineRole.dataObj = record ;
                    this.drawerConf.detail.defineRole.visible = true ;
                }   else {
                    this.$message.error("打开无效的行详情！");
                }
            },
            handleDefineRoleDetailDrawerClose(e){ //Drawer-角色定义 详情关闭
                this.drawerConf.detail.defineRole.visible = false ;
            }
        },
        computed:{
            rowSelection() {    //行选择
                return {
                    selectedRowKeys: this.tableCheckIdList,
                    onChange: (selectedRowKeys, selectedRows) => {  //勾选 修改事件
                        this.tableCheckIdList = selectedRowKeys;
                    },
                    getCheckboxProps: record => ({  //选择框的默认属性配置
                        props: {
                            name:record.fid
                        }
                    }),
                };
            }
        },
        created(){
            this.dealGetAllDefineRoles();
            this.dealGetRoleTypeEnumList();
        },
        destroyed(){
            console.log("权限角色-页面销毁 ...")
        }
    }
</script>
<style scoped>

</style>
