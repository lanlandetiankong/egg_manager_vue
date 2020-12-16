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
                                <a-form-item :label="$t('langMap.table.fields.common.name')">
                                    <a-input v-decorator="searchConf.paramConf.name"/>
                                </a-form-item>
                            </a-col>
                            <a-col :span="searchConf.defaultColSpan">
                                <a-form-item :label="$t('langMap.table.fields.common.code')">
                                    <a-input v-decorator="searchConf.paramConf.code"/>
                                </a-form-item>
                            </a-col>
                            <a-col :span="searchConf.defaultColSpan">
                                <a-form-item :label="$t('langMap.table.fields.common.remark')">
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
                                  @click="handleAddDefineTenantBtnClick">
                            {{$t('langMap.button.actions.addByForm')}}
                        </a-button>
                    </a-col>
                    <a-col>
                        <a-button type="primary" icon="edit"
                                  @click="handleUpdateDefineTenantBtnClick">
                            {{$t('langMap.button.actions.updateByForm')}}
                        </a-button>
                    </a-col>
                    <a-col>
                        <a-button type="danger" icon="delete"
                                  @click="handleDefineTenantBatchDeleteByIds">
                            {{$t('langMap.button.actions.batchDelByIds')}}
                        </a-button>
                    </a-col>
                    <a-col>
                        <a-button type="primary" icon="edit"
                                  @click="handleTenantSetupManagerBtnClick">
                            {{$t('langMap.button.actions.setAdminManager')}}
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
                            <a @click="handleDefineTenantDetailDrawerShow($event,record)">
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
            <define-tenant-create-form-comp
                ref="defineTenantCreateFormRef"
                :visible="dialog.form.conf.visible"
                :formObj="dialog.form.obj"
                :actionType="dialog.form.conf.actionType"
                @createFormCancel="handleDefineTenantCreateFormCancel"
                @createFormSubmit="handleDefineTenantCreateFormSubmit"
            >
            </define-tenant-create-form-comp>
            <a-drawer
                :title="drawerConf.detail.defineTenant.title"
                :closeable="drawerConf.detail.defineTenant.closable"
                :visible="drawerConf.detail.defineTenant.visible"
                :placement="drawerConf.detail.defineTenant.placement"
                :mask="drawerConf.detail.defineTenant.mask"
                :maskStyle="drawerConf.detail.defineTenant.maskStyle"
                :wrapStyle="drawerConf.detail.defineTenant.wrapStyle"
                :drawerStyle="drawerConf.detail.defineTenant.drawerStyle"
                :bodyStyle="drawerConf.detail.defineTenant.bodyStyle"
                :maskClosable="drawerConf.detail.defineTenant.maskClosable"
                @close="handleDefineTenantDetailDrawerClose"
            >
                <simple-detail-drawer-comp
                    :dataObj="drawerConf.detail.defineTenant.dataObj"
                    :visible="drawerConf.detail.defineTenant.visible"
                    :drawerFieldConf="drawerConf.detail.defineTenant.drawerFieldConf"
                />
            </a-drawer>
            <tenant-setup-manager-comp
                :visible="dialog.setupManager.conf.visible"
                :tenantId="dialog.setupManager.conf.tenantId"
                @setupManagerCancel="handleSetupManagerCancel"
                @setupManagerSubmit="handleSetupManagerSubmit"
            ></tenant-setup-manager-comp>
        </div>
    </div>
</template>
<script>
    import AFormItem from "ant-design-vue/es/form/FormItem";
    import ACol from "ant-design-vue/es/grid/Col";

    import {QueryMatchType} from '~Components/index/common/drawer/drawer_define.js'
    import {EggCommonMixin} from '~Layout/mixin/EggCommonMixin';
    import {TenantManagerApi} from './tenantManagerApi.js'

    import DefineTenantCreateFormComp from '~Components/index/organization/tenant/DefineTenantCreateFormComp'
    import TenantSetupManagerComp from '~Components/index/organization/tenant/TenantSetupManagerComp'
    import SimpleDetailDrawerComp from '~Components/index/common/drawer/SimpleDetailDrawerComp';

    export default {
        name: "TenantManagerView",
        components: { ACol, AFormItem,DefineTenantCreateFormComp,TenantSetupManagerComp,SimpleDetailDrawerComp},
        mixins:[EggCommonMixin],
        data() {
            const textAlignDefault = 'left' ;
            //字段配置(Query/Drawer)
            const fieldInfoConfObj = {
                name:{
                    fieldLabel:this.$t('langMap.table.fields.tenant.tenantName'),
                    fieldName:'name', matching:QueryMatchType.like,
                },
                code:{
                    fieldLabel:this.$t('langMap.table.fields.common.code'),
                    fieldName:'code', matching:QueryMatchType.like,
                },
                remark:{
                    fieldLabel:this.$t('langMap.table.fields.common.remark'),
                    fieldName:'remark', matching:QueryMatchType.like,
                }
            };
            return {
                fieldInfoConf:fieldInfoConfObj,
                searchConf:{
                    showListFlag:false,
                    loadingFlag:false,
                    defaultColSpan: 8,
                    paramConf: {
                        name: ["name", {rules: []}],
                        code: ["code", {rules: []}],
                        remark:["remark",{rules: []}]
                    }
                },
                searchForm:this.$form.createForm(this,{name:'search_form'}),
                tableConf: {
                    data: [],
                    columns: [{
                        title: this.$t('langMap.table.fields.tenant.tenantName'),
                        align:textAlignDefault,
                        dataIndex: 'name',
                        key: 'name'
                    }, {
                        title: this.$t('langMap.table.fields.common.code'),
                        align:textAlignDefault,
                        dataIndex: 'code',
                        key: 'code',
                    },  {
                        title:this.$t('langMap.table.header.operation'),
                        align:textAlignDefault,
                        dataIndex:"operation",
                        key:'operation',
                        fixed:'right',
                        width:220,
                        scopedSlots: { customRender: 'action' }
                    }],
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
                dialog:{
                    form:{
                        conf:{
                            visible: false,
                            actionType: "create"
                        },
                        obj:{
                            name: '',
                            code: '',
                        }
                    },
                    setupManager:{
                        conf:{
                            visible: false,
                            tenantId:''
                        }
                    }
                },
                drawerConf:{
                    detail:{
                        defineTenant:{
                            title:this.$t('langMap.drawer.title.detailForDefineTenant'),
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
                            drawerFieldConf:fieldInfoConfObj
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
                return this.$refs.defineTenantCreateFormRef.defineTenantCreateForm;
            },
            dealChangeTableSearchLoadingState(loadingFlag){   //修改[表格搜索]是否在 加载状态中
                if(typeof loadingFlag == "undefined" || loadingFlag == null){
                    loadingFlag = false ;
                }
                this.searchConf.loadingFlag = loadingFlag;
                this.tableConf.loading = loadingFlag;
            },
            dealGetAllDefineTenant() {   //取得租户列表
                var _this = this ;
                _this.dealChangeTableSearchLoadingState(true);
                TenantManagerApi.getAllDefineTenants().then((res) => {
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
            dealQueryDefineTenants(queryFieldList,pagination,sorter) {    //带查询条件 检索租户列表
                var _this = this ;
                _this.dealChangeTableSearchLoadingState(true);
                TenantManagerApi.getAllDefineTenants(queryFieldList,pagination,sorter).then((res) => {
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
            dealBatchDelDefineTenant() {  //批量删除
                var _this = this;
                var delIds = _this.tableCheckIdList;
                TenantManagerApi.batchDelDefineTenant(delIds).then((res) => {
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
                TenantManagerApi.delOneDefineTenant(delId).then((res) => {
                    if (res) {
                        if (res.success) {  //已经有对错误进行预处理
                            _this.$message.success(res.msg);
                            _this.handleSearchFormQuery(); //表格重新搜索
                        }
                    }
                })
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
                        var searchFieldArr = _this.mixin_dealGetSearchFormQueryConf(_this.fieldInfoConf,values);
                        _this.dealQueryDefineTenants(searchFieldArr,paginationTemp,sorterTemp);
                    }
                });
            },
            handleSearchFormReset() {    //重置 搜索列表 的值
                this.searchForm.resetFields();
            },
            handleAddDefineTenantBtnClick() {     //新增租户按钮-点击
                var _this = this;
                _this.dialog.form.conf.visible = true;   //显示弹窗
                _this.dialog.form.conf.actionType = "create";
                _this.dialog.form.obj = {};
            },
            handleUpdateDefineTenantBtnClick() {  //更新租户按钮-点击
                var _this = this;
                if (_this.tableCheckIdList.length < 1) {
                    this.$message.warning(this.$t('langMap.message.warning.pleaseSelectTheOnlyRowOfDataForUpdate'));
                } else if (_this.tableCheckIdList.length > 1) {
                    this.$message.warning(this.$t('langMap.message.warning.pleaseSelectTheOnlyRowOfDataForUpdate'));
                } else {
                    var selectRowId = _this.tableCheckIdList[0];
                    if (selectRowId) {
                        TenantManagerApi.getDefineTenantById(selectRowId).then((res) => {
                            var selectBean = res.bean;
                            if (selectBean) {
                                _this.dialog.form.conf.visible = true;   //显示弹窗
                                _this.dialog.form.conf.actionType = "update";
                                _this.dialog.form.obj = selectBean;
                                //console.log(_this.dialog.form.obj);
                            }
                        })
                    } else {
                        this.$message.warning(this.$t('langMap.message.error.failedDueToNotGettingId'));
                    }
                }
            },
            handleDefineTenantBatchDeleteByIds(e) {     // 批量删除
                var _this = this;
                var selectDelIds = _this.tableCheckIdList;
                if (selectDelIds.length < 1) {
                    _this.$message.warning(this.$t('langMap.message.warning.pleaseSelectTheOnlyRowOfDataForDelete'));
                } else {
                    _this.$confirm({
                        content: _this.$t('langMap.message.confirm.isConfirmDeleteWhatSelectedRow',[selectDelIds.length]),
                        okText: _this.$t('langMap.button.actions.confirm'),
                        cancelText: _this.$t('langMap.button.actions.cancel'),
                        onOk() {
                            _this.dealBatchDelDefineTenant();
                        },
                        onCancel() {
                            _this.$message.info(_this.$t('langMap.message.info.actionOfCancelDelete'));
                        }
                    })
                }
            },
            handleDefineTenantCreateFormCancel(e) {  // 创建/更新 租户定义表单->取消
                var _this = this;
                _this.dialog.form.conf.visible = false;
            },
            handleDefineTenantCreateFormSubmit(e) {   // 创建/更新 租户表单->提交
                var _this = this;
                const dialogRefFormObj = _this.dealGetDialogRefFormObj();
                dialogRefFormObj.validateFields((err, values) => {
                    if (err) {
                        return;
                    }
                    var closeDialogFlag = true;
                    if (_this.dialog.form.conf.actionType == "create") {        //新建-提交
                        TenantManagerApi.addDefineTenantByForm(values).then((res) => {
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
                        })
                    } else if (_this.dialog.form.conf.actionType == "update") {   //更新-提交
                        values['fid'] = _this.dialog.form.obj.fid;   //提交时，回填fid值
                        TenantManagerApi.updateDefineTenantByForm(values).then((res) => {
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
                        })
                    }
                    if (closeDialogFlag == true) {    //关闭弹窗
                        dialogRefFormObj.resetFields();
                        _this.dialog.form.conf.visible = false;
                    }
                });

            },
            handleDeleteOneById(delId) {     //删除指定行
                var _this = this;
                if (delId) {
                    _this.$confirm({
                        content: this.$t('langMap.message.confirm.isConfirmDeleteSelectedRow'),
                        okText: _this.$t('langMap.button.actions.confirm'),
                        cancelText: _this.$t('langMap.button.actions.cancel'),
                        onOk() {
                            _this.dealDelOneRowById(delId);
                        },
                        onCancel() {
                            _this.$message.info(_this.$t('langMap.message.info.actionOfCancelDelete'));
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
            handleDefineTenantDetailDrawerShow(e,record){   //Drawer-租户定义 详情展示
                if(typeof record != "undefined"){
                    this.drawerConf.detail.defineTenant.dataObj = record ;
                    this.drawerConf.detail.defineTenant.visible = true ;
                }   else {
                    this.$message.error(this.$t('langMap.message.warning.openInvalidRowDetails'));
                }
            },
            handleDefineTenantDetailDrawerClose(e){ //Drawer-租户定义 详情关闭
                this.drawerConf.detail.defineTenant.visible = false ;
            },
            handleTenantSetupManagerBtnClick() {  //更新租户按钮-点击
                var _this = this;
                if (_this.tableCheckIdList.length < 1) {
                    this.$message.warning(this.$t('langMap.message.warning.pleaseSelectTheOnlyRowOfDataForUpdate'));
                } else if (_this.tableCheckIdList.length > 1) {
                    this.$message.warning(this.$t('langMap.message.warning.pleaseSelectTheOnlyRowOfDataForUpdate'));
                } else {
                    var selectRowId = _this.tableCheckIdList[0];
                    if (selectRowId) {
                        _this.dialog.setupManager.conf.visible = true;   //显示弹窗
                        _this.dialog.setupManager.conf.tenantId = selectRowId;
                    } else {
                        this.$message.warning(this.$t('langMap.message.error.failedDueToNotGettingId'));
                    }
                }
            },
            handleSetupManagerCancel(e){ //[设置管理员]-取消
                var _this = this;
                _this.dialog.setupManager.conf.visible = false;
            },
            handleSetupManagerSubmit(){ //[设置管理员]-提交
                var _this = this;
                _this.dialog.setupManager.conf.visible = false;
            }
        },
        created(){
            this.dealGetAllDefineTenant();
        },
        destroyed(){
            console.log("租户管理-页面销毁 ...")
        }
    }
</script>

<style scoped>

</style>
