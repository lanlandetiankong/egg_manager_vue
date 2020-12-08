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
                                <a-form-item :label="$t('langMap.table.fields.common.superiorName')">
                                    <a-tree-select
                                        style="width: 150px"
                                        :placeholder="$t('langMap.button.placeholder.filterSuperiors')"
                                        showSearch allowClear
                                        :treeNodeFilterProp="searchConf.treeSelectConf.pid.treeNodeFilterProp"
                                        :treeDefaultExpandAll="searchConf.treeSelectConf.pid.treeDefaultExpandAll"
                                        v-decorator="searchConf.paramConf.pid"
                                        :treeData="searchConf.treeSelectConf.pid.treeData"
                                        @change="handleParentTreeOfSearchChange"
                                    >
                                    </a-tree-select>
                                </a-form-item>
                            </a-col>
                            <a-col :span="searchConf.defaultColSpan">
                                <a-form-item :label="$t('langMap.table.fields.common.name')">
                                    <a-input allowClear
                                        v-decorator="searchConf.paramConf.name"/>
                                </a-form-item>
                            </a-col>
                            <a-col :span="searchConf.defaultColSpan">
                                <a-form-item :label="$t('langMap.table.fields.common.code')">
                                    <a-input allowClear
                                        v-decorator="searchConf.paramConf.code"/>
                                </a-form-item>
                            </a-col>
                            <a-col :span="searchConf.defaultColSpan">
                                <a-form-item :label="$t('langMap.table.fields.common.name')">
                                    <a-input-number allowClear
                                                    :style="{width:'130px'}"
                                                    v-decorator="searchConf.paramConf.level"/>
                                </a-form-item>
                            </a-col>
                            <a-col :span="searchConf.defaultColSpan">
                                <a-form-item :label="$t('langMap.table.fields.common.description')">
                                    <a-input v-decorator="searchConf.paramConf.description"/>
                                </a-form-item>
                            </a-col>
                            <a-col :span="searchConf.defaultColSpan">
                                <a-form-item :label="$t('langMap.table.fields.common.remark')">
                                    <a-input    allowClear
                                        v-decorator="searchConf.paramConf.remark"/>
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
                                  @click="handleAddDefineDepartmentBtnClick">
                            {{$t('langMap.button.actions.addByForm')}}
                        </a-button>
                    </a-col>
                    <a-col>
                        <a-button type="primary" icon="edit"
                                  @click="handleUpdateDefineDepartmentBtnClick">
                            {{$t('langMap.button.actions.updateByForm')}}
                        </a-button>
                    </a-col>
                    <a-col>
                        <a-button type="danger" icon="delete"
                                  @click="handleDefineDepartmentBatchDeleteByIds">
                            {{$t('langMap.button.actions.batchDelByIds')}}
                        </a-button>
                    </a-col>
                    <a-col>
                        <a-switch
                            :checkedChildren="$t('langMap.table.config.showQuery')"
                            :unCheckedChildren="$t('langMap.table.config.hiddenQuery')"
                            size="large"
                            :style="{height:'30px'}"
                            v-model="searchConf.showListFlag"
                        ></a-switch>
                    </a-col>
                </a-row>
            </div>
            <a-divider/>
            <!-- 表格-区域 -->
            <div>
                <a-table
                    :locale="{emptyText:$t('langMap.table.config.emptyData')}"
                    :pagination="tableConf.pagination"
                    :rowKey="item => item.fid"
                    :columns="tableConf.columns"
                    :dataSource="tableConf.data"
                    :loading="tableConf.loading"
                    :rowSelection="rowSelection"
                    @change="handleTableChange"
                >
                    <template slot="action" slot-scope="text,record">
                        <span>
                            <a @click="handleEmployeeDepartmentDetailDrawerShow($event,record)">
                                {{$t('langMap.drawer.actions.detail')}}
                            </a>
                            <a-divider type="vertical" />
                            <a-button type="danger" size="small" @click="handleDeleteOneById(record.fid)">{{$t('langMap.button.actions.delById')}}</a-button>
                        </span>
                    </template>
                </a-table>
            </div>
        </div>
        <!-- 弹窗dom-区域 -->
        <div>
            <define-department-create-form-comp
                v-if="dialogFormConf.initFlag"
                ref="defineDepartmentCreateFormRef"
                :visible="dialogFormConf.visible"
                :formObj="dialogFormObj"
                :actionType="dialogFormConf.actionType"
                :parentSelectTrees="searchConf.treeSelectConf.pid.treeData"
                @createFormCancel="handleDefineDepartmentCreateFormCancel"
                @createFormSubmit="handleDefineDepartmentCreateFormSubmit"
            >
            </define-department-create-form-comp>
            <a-drawer
                :title="drawerConf.detail.employeeDepartment.title"
                :closeable="drawerConf.detail.employeeDepartment.closable"
                :visible="drawerConf.detail.employeeDepartment.visible"
                :placement="drawerConf.detail.employeeDepartment.placement"
                :mask="drawerConf.detail.employeeDepartment.mask"
                :maskStyle="drawerConf.detail.employeeDepartment.maskStyle"
                :wrapStyle="drawerConf.detail.employeeDepartment.wrapStyle"
                :drawerStyle="drawerConf.detail.employeeDepartment.drawerStyle"
                :bodyStyle="drawerConf.detail.employeeDepartment.bodyStyle"
                :maskClosable="drawerConf.detail.employeeDepartment.maskClosable"
                @close="handleEmployeeDepartmentDetailDrawerClose"
            >
                <simple-detail-drawer-comp
                    :dataObj="drawerConf.detail.employeeDepartment.dataObj"
                    :visible="drawerConf.detail.employeeDepartment.visible"
                    :drawerFieldConf="drawerConf.detail.employeeDepartment.drawerFieldConf"
                />
            </a-drawer>
        </div>
    </div>
</template>
<script>
    import {tableColumns,searchFormQueryConf} from './param_conf.js'
    import {EmployeeDepartmentDetailDrawerConf} from './drawer_conf.js'
    import AFormItem from "ant-design-vue/es/form/FormItem";
    import ACol from "ant-design-vue/es/grid/Col";

    import {DepartmentManagerApi} from './departmentManagerApi.js'

    import DefineDepartmentCreateFormComp from '~Components/index/user/employee/department/DefineDepartmentCreateFormComp';
    import SimpleDetailDrawerComp from '~Components/index/common/drawer/SimpleDetailDrawerComp';
    export default {
        name: "DepartmentManagerView",
        components: {DefineDepartmentCreateFormComp,SimpleDetailDrawerComp,ACol, AFormItem},
        data() {
            return {
                searchConf:{
                    showListFlag:false,
                    loadingFlag:false,
                    defaultColSpan: 8,
                    paramConf: {
                        pid: ["pid", {rules: []}],
                        name: ["name", {rules: []}],
                        code: ["code", {rules: []}],
                        level: ["level", {rules: []}],
                        description: ["description", {rules: []}],
                        type: ["type", {rules: []}],
                        remark:["remark",{rules: []}]
                    },
                    treeSelectConf:{
                        pid:{
                            treeDefaultExpandAll:false,
                            treeNodeFilterProp:"title",
                            treeData:[]
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
                    initFlag:false,
                    visible: false,
                    actionType: "create"
                },
                dialogFormObj: {
                    name: '',
                    code: '',
                    level:0,
                    orderNum:0,
                    description:'',
                    pid:'',
                    type: ''
                },
                drawerConf:{
                    detail:{
                        employeeDepartment:{
                            title:"部门定义详情",
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
                            drawerFieldConf:EmployeeDepartmentDetailDrawerConf
                        },
                    },
                },
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
        methods: {
            dealGetDialogRefFormObj() {    //返回 弹窗表单 的form对象
                return this.$refs.defineDepartmentCreateFormRef.defineDepartmentCreateForm;
            },
            dealGetPidTreeData(){  //取得 部门定义-树形数据
                var _this = this ;
                DepartmentManagerApi.getAllDefineDepartmentTree().then((res) => {
                    if(res && res.success){
                        if(res.gridList){
                            _this.searchConf.treeSelectConf.pid.treeData = res.gridList ;
                        }
                    }
                })
            },
            dealChangeTableSearchLoadingState(loadingFlag){   //修改[表格搜索]是否在 加载状态中
                if(typeof loadingFlag == "undefined" || loadingFlag == null){
                    loadingFlag = false ;
                }
                this.searchConf.loadingFlag = loadingFlag;
                this.tableConf.loading = loadingFlag;
            },
            dealGetAllDefineDepartment() {   //取得部门列表
                var _this = this ;
                _this.dealChangeTableSearchLoadingState(true);
                DepartmentManagerApi.getAllDefineDepartments().then((res) => {
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
            dealQueryDefineDepartments(queryFieldList,pagination,sorter) {    //带查询条件 检索部门列表
                var _this = this ;
                _this.dealChangeTableSearchLoadingState(true);
                DepartmentManagerApi.getAllDefineDepartments(queryFieldList,pagination,sorter).then((res) => {
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
            dealBatchDelDefineDepartment() {  //批量删除
                var _this = this;
                var delIds = _this.tableCheckIdList;
                DepartmentManagerApi.batchDelDefineDepartment(delIds).then((res) => {
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
                DepartmentManagerApi.delOneDefineDepartment(delId).then((res) => {
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
                        _this.dealQueryDefineDepartments(searchFieldArr,paginationTemp,sorterTemp);
                    }
                });
            },
            handleSearchFormReset() {    //重置 搜索列表 的值
                this.searchForm.resetFields();
            },
            handleAddDefineDepartmentBtnClick() {     //新增部门按钮-点击
                var _this = this;
                _this.dialogFormConf.initFlag = true ;  //弹窗初始化
                _this.dialogFormConf.visible = true;   //显示弹窗
                _this.dialogFormConf.actionType = "create";
                _this.dialogFormObj = {
                    level:0,
                    orderNum:0,
                };
            },
            handleUpdateDefineDepartmentBtnClick() {  //更新部门按钮-点击
                var _this = this;
                if (_this.tableCheckIdList.length < 1) {
                    this.$message.warning(this.$t('langMap.message.warning.pleaseSelectAtLeastOnePieceOfUpdateData'));
                } else if (_this.tableCheckIdList.length > 1) {
                    this.$message.warning(this.$t('langMap.message.warning.pleaseSelectAtMostOnePieceOfUpdateData'));
                } else {
                    var selectRowId = _this.tableCheckIdList[0];
                    if (selectRowId) {
                        DepartmentManagerApi.getDefineDepartmentById(selectRowId).then((res) => {
                            var selectUserBean = res.bean;
                            if (selectUserBean) {
                                _this.dialogFormConf.initFlag = true ;  //弹窗初始化
                                _this.dialogFormConf.visible = true;   //显示弹窗
                                _this.dialogFormConf.actionType = "update";
                                _this.dialogFormObj = selectUserBean;
                                //console.log(_this.dialogFormObj);
                            }
                        })
                    } else {
                        this.$message.warning(this.$t('langMap.message.warning.failedDueToNotGettingId'));
                    }
                }
            },
            handleDefineDepartmentBatchDeleteByIds(e) {     // 批量删除
                var _this = this;
                var selectDelIds = _this.tableCheckIdList;
                if (selectDelIds.length < 1) {
                    _this.$message.warning(this.$t('langMap.message.warning.pleaseSpecifyAtMostOnePieceOfDataToDelete'));
                } else {
                    _this.$confirm({
                        content: '是否确认删除所选的' + selectDelIds.length + "条数据？",
                        okText: '确认',
                        cancelText: '取消',
                        onOk() {
                            _this.dealBatchDelDefineDepartment();
                        },
                        onCancel() {
                            _this.$message.info(_this.$t('langMap.message.warning.actionOfCancelDelete'));
                        }
                    })
                }
            },
            handleDefineDepartmentCreateFormCancel(e) {  // 创建/更新 部门定义表单->取消
                var _this = this;
                _this.dialogFormConf.visible = false;
            },
            handleDefineDepartmentCreateFormSubmit(e) {   // 创建/更新 部门表单->提交
                var _this = this;
                const dialogFormObj = _this.dealGetDialogRefFormObj();
                dialogFormObj.validateFields((err, values) => {
                    if (err) {
                        return;
                    }
                    var closeDialogFlag = true;
                    if (_this.dialogFormConf.actionType == "create") {        //新建-提交
                        DepartmentManagerApi.addDefineDepartmentByForm(values).then((res) => {
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
                        DepartmentManagerApi.updateDefineDepartmentByForm(values).then((res) => {
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
            handleDeleteOneById(delId) {     //删除指定行
                var _this = this;
                if (delId) {
                    _this.$confirm({
                        content: this.$t('langMap.message.warning.isConfirmDeleteSelectedRow'),
                        okText: '确认',
                        cancelText: '取消',
                        onOk() {
                            _this.dealDelOneRowById(delId);
                        },
                        onCancel() {
                            _this.$message.info(_this.$t('langMap.message.warning.actionOfCancelDelete'));
                        }
                    })
                } else {
                    _this.$message.warning(_this.$t('langMap.message.warning.invalidDeleteOperation'));
                }
            },
            handleTableChange(pagination, filters, sorter) {    //表格变动-页码跳转/排序/筛选
                this.tableConf.pagination = pagination ;
                this.tableConf.filters = filters ;
                this.tableConf.sorter = sorter ;
                this.handleSearchFormQuery();
            },
            handleParentTreeOfSearchChange(value){  //[上级部门] SelectTree cchange事件
                console.log("handleParentTreeOfSearchChange",value);
            },
            handleEmployeeDepartmentDetailDrawerShow(e,record){   //Drawer-部门定义 详情展示
                if(typeof record != "undefined"){
                    this.drawerConf.detail.employeeDepartment.dataObj = record ;
                    this.drawerConf.detail.employeeDepartment.visible = true ;
                }   else {
                    this.$message.error(this.$t('langMap.message.warning.openInvalidRowDetails'));
                }
            },
            handleEmployeeDepartmentDetailDrawerClose(e){ //Drawer-部门定义 详情关闭
                this.drawerConf.detail.employeeDepartment.visible = false ;
            }
        },
        created(){
            this.dealGetAllDefineDepartment();
            this.dealGetPidTreeData();
        },
        destroyed(){
            console.log("部门管理-页面销毁 ...")
        }
    }
</script>

<style scoped>

</style>
