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
                        <a-row :gutter="10">
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
            <!-- 操作按钮-区域-->
            <div>
                <a-row
                    :gutter="16"
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

                    <span slot="action" slot-scope="text,record">
                        <a-dropdown>
                              <a-menu slot="overlay" @click="handleTableActionGroupClick($event,record)">
                                    <a-menu-item key="recordDel">删除</a-menu-item>
                                    <a-menu-item key="grantPermission">授权</a-menu-item>
                              </a-menu>
                              <a-button> 操作 <a-icon type="down" /> </a-button>
                        </a-dropdown>
                </span>
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
        </div>
    </div>
</template>

<script>
    import jq from 'jquery' ;
    import {tableColumns,searchFormQueryConf} from './param_conf.js';
    import {PermissionRoleManagerApi} from './permissionRoleManagerApi.js'
    import {PermissionCommonApis} from '~Apis/permission/PermissionCommonApis.js'

    import DefineRoleCreateFormComp from '~Components/define/permission/role/DefineRoleCreateFormComp';
    import RoleGrantPermissionFormComp from '~Components/define/permission/role/RoleGrantPermissionFormComp';
    export default {
        name: "PermissionRoleManagerView",
        components: {RoleGrantPermissionFormComp, DefineRoleCreateFormComp},
        data(){
            return {
                searchConf:{
                    showListFlag:true,
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
                }
            }
        },
        methods:{
            getRoleTypeFilterOption(input,option){
                return (option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0);
            },
            dealGetRoleTypeEnumList(){  //取得 用户类型-枚举列表
                var _this = this ;
                PermissionCommonApis.getAllRoleTypes().then((res) => {
                    if(res && res.hasError == false){
                        if(res.enumList){
                            _this.searchConf.binding.role.types = res.enumList ;
                        }
                    }
                })
            },
            dealGetAllPermissionList(){  //取得 所有的权限定义
                var _this = this ;
                return PermissionRoleManagerApi.getAllDefinePermissions().then((res) => {
                    if(res && res.hasError == false){
                        if(res.resultList){
                            _this.dialogGrantPermissionObj.all = res.resultList ;
                            _this.dealAllItemToTransferDataSource(res.resultList);
                        }
                    }
                })
            },
            dealAllItemToTransferDataSource(allItemArr){    //转化为 transfer可用的 数组对象
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
            dealGetAllDefineRoles() {   //取得权限列表
                PermissionRoleManagerApi.getAllDefineRoles().then((res) => {
                    if (res) {
                        this.tableConf.data = res.resultList;
                        if(res.paginationBean){ //总个数
                            this.tableConf.pagination.total = res.paginationBean.total ;
                        }
                    }
                })
            },
            dealQueryDefineRoles(queryFieldList,pagination,sorter) {    //带查询条件 检索权限列表
                PermissionRoleManagerApi.getAllDefineRoles(queryFieldList,pagination,sorter).then((res) => {
                    if (res) {
                        this.tableConf.data = res.resultList;
                        if(res.paginationBean){ //总个数
                            this.tableConf.pagination.total = res.paginationBean.total ;
                        }
                    }
                })
            },
            dealBatchDelDefineRole() {  //批量删除
                var _this = this;
                var delIds = _this.tableCheckIdList;
                PermissionRoleManagerApi.batchDelDefineRole(delIds).then((res) => {
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
                PermissionRoleManagerApi.delOneDefineRole(delId).then((res) => {
                    if (res) {
                        if (res.hasError == false) {  //已经有对错误进行预处理
                            _this.$message.success(res.info);
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
                            _this.dialogGrantPermissionObj.checked = res.resultList;
                            var checkIdListTemp = [] ;
                            if(res.resultList && res.resultList.length > 0){
                                jq.each(res.resultList,function (idx,val) {
                                    checkIdListTemp.push(val.fid);
                                })
                            }
                            _this.dialogGrantPermissionObj.checkedIds = checkIdListTemp;
                            _this.dialogGrantPermissionConf.visible = true;   //显示弹窗
                        }
                    })
                } else {
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
                    this.$message.warning('请选择一行要分配权限的数据！');
                } else if (_this.tableCheckIdList.length > 1) {
                    this.$message.warning('请选择至多一行要分配权限的数据！');
                } else {
                    var selectRowId = _this.tableCheckIdList[0];
                    //封装方法 处理
                    _this.dealDefineRoleGrantPermissionsById(selectRowId);
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
                                if (res.hasError == false) {  //异常已经有预处理了
                                    this.$message.success(res.info);
                                    _this.handleSearchFormQuery(); //表格重新搜索
                                } else {
                                    closeDialogFlag = false;
                                }
                            } else {
                                closeDialogFlag = false;
                            }
                        })
                    } else if (_this.dialogFormConf.actionType == "update") {   //更新-提交
                        values['fid'] = _this.dialogFormObj.fid;   //提交时，回填fid值
                        PermissionRoleManagerApi.updateDefineRoleByForm(values).then((res) => {
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
                        })
                    }
                    if (closeDialogFlag == true) {    //关闭弹窗
                        dialogFormObj.resetFields();
                    }
                });
                _this.dialogFormConf.visible = false;
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
                        if (res.hasError == false) {  //异常已经有预处理了
                            this.$message.success(res.info);
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
        },
        computed:{
            rowSelection() {    //行选择
                const {selectedRowKeys} = this;
                return {
                    onChange: (selectedRowKeys, selectedRows) => {  //勾选 修改事件
                        this.tableCheckIdList = selectedRowKeys;
                    },
                    getCheckboxProps: record => ({  //选择框的默认属性配置
                        props: {},
                    }),
                };
            }
        },
        created(){
            this.dealGetAllDefineRoles();
            this.dealGetRoleTypeEnumList();
        }
    }
</script>
<style scoped>

</style>
